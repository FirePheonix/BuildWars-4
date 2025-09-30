import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Share2, Heart, Star } from 'lucide-react';
import { Event } from '../App';
import TicketSelector from './TicketSelector';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

export default function EventDetail({ event, onBack }: EventDetailProps) {
  const [showTickets, setShowTickets] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Events</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              {event.featured && (
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">{event.date} at {event.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{event.venue}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className="font-semibold">{event.capacity - event.sold} of {event.capacity} remaining</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">3 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">About This Event</h3>
                <p className="text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Reviews & Ratings</h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold">4.8</div>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on 124 reviews</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Sarah J.", rating: 5, comment: "Amazing event! The venue was perfect and the organization was top-notch." },
                  { name: "Mike D.", rating: 5, comment: "Exceeded all expectations. Will definitely attend more events like this." },
                  { name: "Lisa K.", rating: 4, comment: "Great experience overall. The only downside was parking, but the event itself was fantastic." }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-purple-600">${event.price}</p>
              </div>
              
              <button
                onClick={() => setShowTickets(true)}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4"
              >
                Get Tickets
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Free cancellation up to 24 hours before the event
                </p>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">Event Organizer</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">EventPro Productions</p>
                    <p className="text-sm text-gray-600">Professional event organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Selector Modal */}
      {showTickets && (
        <TicketSelector
          event={event}
          onClose={() => setShowTickets(false)}
        />
      )}
    </div>
  );
}