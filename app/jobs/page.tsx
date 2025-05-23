'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '@/utils/supabase';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
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
  }, []);

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
      <div className="flex flex-col sm:flex-row justify-center mb-10 gap-3 sm:gap-2">
        <input
          type="text"
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          placeholder="🔍 Job title, keywords, or company"
          className="border border-[#CAA864] rounded px-4 py-2 w-full sm:w-80 bg-white text-[#303418] placeholder-[#766646]"
        />
        <input
          type="text"
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          placeholder="📍 Location or remote"
          className="border border-[#CAA864] rounded px-4 py-2 w-full sm:w-64 bg-white text-[#303418] placeholder-[#766646]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#CAA864] hover:bg-[#b09256] text-[#1B1C1B] px-4 py-2 rounded font-semibold w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Job Listings */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#5A2217]">All Jobs</h2>
            <p className="text-sm text-[#6C5C4C]">Showing {jobs.length} jobs</p>
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
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#E0D7B2] bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#5A2217] mb-1">{job.job_title}</h3>
                  <div className="flex flex-wrap items-center text-sm text-[#766646] gap-x-3">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.job_type ? job.job_type.replace('-', ' ') : 'N/A'}</span>
                    <span>•</span>
                    <span>{new Date(job.created_at).toDateString()}</span>
                    {job.salary && (
                      <>
                        <span>•</span>
                        <span>{job.salary}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-[#6C5C4C] mt-2 line-clamp-2">
                    {job.description?.slice(0, 120)}...
                  </p>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="mt-4 sm:mt-0 bg-[#CAA864] hover:bg-[#b09256] text-[#1B1C1B] px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
