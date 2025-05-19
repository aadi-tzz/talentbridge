'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '@/utils/supabase';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([]);
  const [experienceLevelFilters, setExperienceLevelFilters] = useState<string[]>([]);

  const fetchJobs = async () => {
    setLoading(true);
    let query = supabase.from('jobs').select('*');

    // Apply filters
    if (jobTypeFilters.length > 0) {
      query = query.in('job_type', jobTypeFilters);
    }
    if (experienceLevelFilters.length > 0) {
      query = query.in('experience_level', experienceLevelFilters);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (!error && data) {
      // Apply search filter client-side
      const filtered = data.filter(job =>
        job.job_title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setJobs(filtered);
    } else {
      setJobs([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [jobTypeFilters, experienceLevelFilters]);

  const toggleFilter = (value: string, setFilter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFilter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleSearch = () => {
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-[#f5efe3] px-4 py-10 sm:px-10">
      <h1 className="text-4xl font-bold text-center text-[#5A2217] mb-2">
        Find Your Dream Job
      </h1>
      <p className="text-center text-[#6C5C4C] mb-10">
        Browse through our extensive list of job opportunities
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mb-10 gap-2">
        <input
          type="text"
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          placeholder="🔍 Job title, keywords, or company"
          className="border border-[#CAA864] rounded px-4 py-2 w-80 bg-white text-[#303418] placeholder-[#766646]"
        />
        <input
          type="text"
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          placeholder="📍 Location or remote"
          className="border border-[#CAA864] rounded px-4 py-2 w-64 bg-white text-[#303418] placeholder-[#766646]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#CAA864] hover:bg-[#b09256] text-[#1B1C1B] px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </div>

      <div className="flex gap-10">
        {/* Sidebar Filters */}
        <aside className="w-64 shrink-0 hidden md:block bg-[#f7f3e9] p-6 rounded-lg border border-[#E0D7B2] text-[#6C5C4C] font-medium text-sm">
          <div>
            <h3 className="font-semibold mb-3 text-[#766646]">Job Type</h3>
            {['full-time', 'part-time'].map(type => (
              <div key={type} className="mb-2">
                <input
                  id={type}
                  type="checkbox"
                  className="mr-2 accent-[#CAA864]"
                  checked={jobTypeFilters.includes(type)}
                  onChange={() => toggleFilter(type, setJobTypeFilters)}
                />
                <label htmlFor={type}>{type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-[#766646]">Experience Level</h3>
            {['entry', 'mid', 'senior'].map(level => (
              <div key={level} className="mb-2">
                <input
                  id={level}
                  type="checkbox"
                  className="mr-2 accent-[#CAA864]"
                  checked={experienceLevelFilters.includes(level)}
                  onChange={() => toggleFilter(level, setExperienceLevelFilters)}
                />
                <label htmlFor={level}>{level.charAt(0).toUpperCase() + level.slice(1)} Level</label>
              </div>
            ))}
          </div>
        </aside>

        {/* Job Cards */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#5A2217]">All Jobs</h2>
              <p className="text-sm text-[#6C5C4C]">Showing {jobs.length} jobs</p>
            </div>
            <div className="flex items-center text-sm text-[#6C5C4C]">
              <span className="mr-2">Sort by:</span>
              <select className="border border-[#CAA864] px-2 py-1 rounded text-[#5A2217] bg-white">
                <option>Relevance</option>
                <option>Date</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-[#766646]">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-[#766646]">No jobs found.</p>
          ) : (
            <div className="space-y-5">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between border border-[#E0D7B2] bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#5A2217] mb-1">{job.job_title}</h3>
                    <div className="flex flex-wrap items-center text-sm text-[#766646] gap-x-3">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.job_type}</span>
                      <span>•</span>
                      <span>{new Date(job.created_at).toDateString()}</span>
                      {job.salary_min && job.salary_max && (
                        <>
                          <span>•</span>
                          <span>₹{job.salary_min} - ₹{job.salary_max}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-[#6C5C4C] mt-2 line-clamp-2">
                      {job.description?.slice(0, 120)}...
                    </p>
                  </div>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="bg-[#CAA864] hover:bg-[#b09256] text-[#1B1C1B] px-4 py-2 rounded-md text-sm font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-2 text-sm text-[#766646]">
            <button className="border border-[#CAA864] px-3 py-1 rounded hover:bg-[#f0e8cc]">Previous</button>
            <button className="border border-[#CAA864] px-3 py-1 rounded bg-[#CAA864] text-[#1B1C1B]">1</button>
            <button className="border border-[#CAA864] px-3 py-1 rounded hover:bg-[#f0e8cc]">2</button>
            <button className="border border-[#CAA864] px-3 py-1 rounded hover:bg-[#f0e8cc]">3</button>
            <button className="border border-[#CAA864] px-3 py-1 rounded hover:bg-[#f0e8cc]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
