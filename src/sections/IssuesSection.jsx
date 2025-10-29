import React from 'react';
import { ProblemCard } from '../components';

export default function IssuesSection() {
  const issues = [
    {
      problem: 'Broadband Not Working',
      solution: 'Our experts perform comprehensive network diagnostics and hardware checks to identify and fix connectivity issues',
      color: 'from-red-500 to-red-600',
    },
    {
      problem: 'Slow Internet Speed',
      solution: 'We optimize your connection, check bandwidth allocation, and upgrade your plan if necessary',
      color: 'from-orange-500 to-orange-600',
    },
    {
      problem: 'Frequent Disconnections',
      solution: 'We identify signal interference and stability issues, then implement long-term solutions',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      problem: 'Connection Failures',
      solution: 'Our 24/7 support team quickly resolves connection failures with minimal downtime',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Common Issues & Our Solutions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {issues.map((issue, idx) => (
            <ProblemCard key={idx} {...issue} />
          ))}
        </div>
      </div>
    </section>
  );
}