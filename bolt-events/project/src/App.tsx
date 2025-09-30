import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedEvents from './components/FeaturedEvents';
import EventsGrid from './components/EventsGrid';
import EventDetail from './components/EventDetail';
import Footer from './components/Footer';
import { events } from './data/events';

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: number;
  image: string;
  category: string;
  description: string;
  capacity: number;
  sold: number;
  featured: boolean;
  tickets: {
    type: string;
    price: number;
    available: number;
    benefits: string[];
  }[];
};

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'event'>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('event');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (currentView === 'event' && selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Hero />
      <FeaturedEvents events={events.filter(e => e.featured)} onEventClick={handleEventClick} />
      <EventsGrid events={filteredEvents} onEventClick={handleEventClick} />
      <Footer />
    </div>
  );
}

export default App;