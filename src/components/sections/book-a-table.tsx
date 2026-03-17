'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const TABLES = [
  { id: 'T1', seats: 2, x: 1, y: 1 },
  { id: 'T2', seats: 2, x: 2, y: 1 },
  { id: 'T3', seats: 2, x: 4, y: 1 },
  { id: 'T4', seats: 2, x: 5, y: 1 },
  { id: 'T5', seats: 4, x: 1, y: 3 },
  { id: 'T6', seats: 4, x: 5, y: 3 },
  { id: 'T7', seats: 4, x: 3, y: 5 },
  { id: 'T8', seats: 6, x: 1, y: 5 },
  { id: 'T9', seats: 6, x: 5, y: 5 },
];

const TIME_SLOTS = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
];

export default function BookATable() {
  const [selectedTable, setSelectedTable] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('2');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async () => {
    if (!name || !email || !guests || !time || !date || !selectedTable) {
      showToast('Please fill in all fields and select a table.', 'error');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('reservations').insert([{
      name,
      email,
      guests: Number(guests),
      date,
      time,
      table_id: selectedTable,
    }]);

    setLoading(false);

    if (error) {
      console.error('Supabase error:', error.message);
      showToast('Something went wrong. Please try again.', 'error');
    } else {
      showToast('Table booked successfully! See you soon 🎉', 'success');
      setName('');
      setEmail('');
      setGuests('2');
      setTime('');
      setDate('');
      setSelectedTable('');
    }
  };

  return (
    <section id="book-a-table" className="py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Book a Table</h2>
          <p className="text-muted-foreground mt-2">
            Select your table and book your spot for an unforgettable dining experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Restaurant Layout */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Restaurant Layout</h3>
            <div className="border rounded-lg p-6 bg-muted/30 relative min-h-[320px]">
              <div className="grid grid-cols-6 grid-rows-6 gap-3">
                {TABLES.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-full border-2 transition-all w-16 h-16
                      ${selectedTable === table.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background border-border hover:border-primary'
                      }`}
                    style={{ gridColumn: table.x, gridRow: table.y }}
                  >
                    <span className="text-xs font-bold">{table.id}</span>
                    <span className="text-xs">({table.seats} seats)</span>
                  </button>
                ))}
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground border-t border-border pt-1 px-4">
                Entrance
              </div>
            </div>
            {selectedTable && (
              <p className="mt-3 text-sm text-muted-foreground">
                Selected: <span className="font-semibold text-foreground">{selectedTable}</span>
              </p>
            )}
          </div>

          {/* Reservation Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Reservation Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a time slot</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {selectedTable && (
                <div className="text-sm text-muted-foreground">
                  Selected Table: <span className="font-semibold text-foreground">{selectedTable}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {loading ? 'Booking...' : 'Book Your Table'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white max-w-sm
            ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          <p className="font-semibold">{toast.type === 'success' ? '🎉 Booking Confirmed!' : 'Uh oh! Something went wrong.'}</p>
          <p className="text-sm mt-1">{toast.message}</p>
        </div>
      )}
    </section>
  );
}