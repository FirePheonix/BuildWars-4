import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Events
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            From concerts to conferences, find and book tickets for the events that matter to you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-300" />
              <span className="text-purple-200">1000+ Events Monthly</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-300" />
              <span className="text-purple-200">50+ Cities</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-300" />
              <span className="text-purple-200">2M+ Happy Customers</span>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
            Browse Events
          </button>
        </div>
      </div>
    </section>
  );
}