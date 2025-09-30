import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';
import { Event } from '../App';

interface TicketSelectorProps {
  event: Event;
  onClose: () => void;
}

interface SelectedTickets {
  [key: string]: number;
}

export default function TicketSelector({ event, onClose }: TicketSelectorProps) {
  const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>({});
  const [showCheckout, setShowCheckout] = useState(false);

  const updateTicketCount = (ticketType: string, change: number) => {
    setSelectedTickets(prev => {
      const current = prev[ticketType] || 0;
      const newCount = Math.max(0, current + change);
      if (newCount === 0) {
        const { [ticketType]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [ticketType]: newCount };
    });
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return event.tickets.reduce((total, ticket) => {
      const count = selectedTickets[ticket.type] || 0;
      return total + (ticket.price * count);
    }, 0);
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  if (showCheckout) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{event.date} at {event.time}</p>
              {Object.entries(selectedTickets).map(([type, count]) => {
                const ticket = event.tickets.find(t => t.type === type);
                return ticket ? (
                  <div key={type} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{count}x {ticket.type}</span>
                    <span className="font-medium">${ticket.price * count}</span>
                  </div>
                ) : null;
              })}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>Complete Purchase - ${getTotalPrice()}</span>
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Select Tickets</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600">{event.date} at {event.time}</p>
            <p className="text-gray-600">{event.venue}, {event.location}</p>
          </div>

          <div className="space-y-4 mb-6">
            {event.tickets.map((ticket) => (
              <div key={ticket.type} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{ticket.type}</h4>
                    <p className="text-2xl font-bold text-purple-600">${ticket.price}</p>
                    <p className="text-sm text-gray-600">{ticket.available} available</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateTicketCount(ticket.type, -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      disabled={!selectedTickets[ticket.type]}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {selectedTickets[ticket.type] || 0}
                    </span>
                    <button
                      onClick={() => updateTicketCount(ticket.type, 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      disabled={(selectedTickets[ticket.type] || 0) >= ticket.available}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Includes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {ticket.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {getTotalTickets() > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Total Tickets:</span>
                <span className="font-semibold">{getTotalTickets()}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Price:</span>
                <span className="text-purple-600">${getTotalPrice()}</span>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedToCheckout}
              disabled={getTotalTickets() === 0}
              className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Continue to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}