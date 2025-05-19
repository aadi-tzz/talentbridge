'use client';

import Link from 'next/link';
import { Briefcase, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: {
    id: string;
    title?: string;
    location?: string;
    type?: string;
    experience?: string;
    salaryMin?: number;
    salaryMax?: number;
    created_at?: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  const jobTitle = job.title?.trim() || 'Untitled Job';
  const jobLocation = job.location || 'Location Not Specified';
  const jobType = job.type || 'Type Not Specified';
  const jobExperience = job.experience || 'Experience Not Specified';
  const salaryRange = `₹${job.salaryMin || 0} - ₹${job.salaryMax || 0}`;
  const postedTime = job.created_at
    ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true })
    : 'Recently posted';

  return (
    <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-start justify-between gap-4 hover:shadow-md transition">
      {/* Left - Job Info */}
      <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
        {/* Logo */}
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600">
          {jobTitle[0].toUpperCase()}
        </div>

        {/* Job details */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900">{jobTitle}</h2>

          <div className="flex items-center text-sm text-gray-600 mt-1 gap-2">
            <MapPin className="w-4 h-4" />
            <span>{jobLocation}</span>
          </div>

          <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>{salaryRange}</span>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{jobType}</span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{jobExperience}</span>
          </div>
        </div>
      </div>

      {/* Right - Posted time and button */}
      <div className="flex flex-col items-start sm:items-end gap-2 min-w-[140px]">
        <span className="text-sm text-gray-400">{`Posted ${postedTime}`}</span>
        <Link href={`/jobs/${job.id}`} className="w-full">
          <button className="w-full bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
