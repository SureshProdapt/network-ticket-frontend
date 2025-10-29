import React from 'react';
import { Zap, Wifi, Shield, WifiOff } from 'lucide-react';
import { FeatureCard } from '../components';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Ticket Creation',
      desc: 'Report issues instantly with our streamlined ticket creation process',
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: 'Live Status Tracking',
      desc: 'Track your ticket status in real-time with detailed updates',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Priority-based Resolution',
      desc: 'High-priority issues are resolved faster with intelligent routing',
    },
    {
      icon: <WifiOff className="w-8 h-8" />,
      title: 'Customer Support Dashboard',
      desc: 'Manage all your tickets from one centralized dashboard',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Everything You Need to Manage Network Issues
        </h2>
        <p className="text-center text-gray-400 mb-16">
          Powerful features designed to streamline your support workflow
        </p>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}