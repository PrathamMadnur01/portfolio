import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/60 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="h-6 w-32 bg-purple-500/20 rounded animate-pulse"></div>
          <div className="flex gap-6">
            <div className="h-4 w-16 bg-purple-500/20 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-purple-500/20 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-purple-500/20 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl p-12 border border-purple-500/30">
            <div className="space-y-6">
              <div className="h-8 w-48 bg-purple-500/20 rounded animate-pulse"></div>
              <div className="h-16 w-full bg-purple-500/20 rounded animate-pulse"></div>
              <div className="h-24 w-3/4 bg-purple-500/20 rounded animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-10 w-32 bg-purple-500/20 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-purple-500/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 bg-purple-500/20 rounded animate-pulse mb-8"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 w-full bg-purple-500/10 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingSkeleton;
