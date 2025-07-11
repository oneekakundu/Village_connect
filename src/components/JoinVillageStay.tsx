import React, { useState } from 'react';

const JoinVillageStay: React.FC = () => {
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-accent-700">Welcome! Join as a Host</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4">
          <label htmlFor="location" className="text-lg font-medium text-slate-700">Add your location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter your village or area name"
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-400"
            required
          />
          <button
            type="submit"
            className="bg-accent-500 text-white py-2 rounded-lg font-semibold hover:bg-accent-600 transition"
          >
            Join Now
          </button>
        </form>
      ) : (
        <div className="bg-emerald-100 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">Thank you for joining!</h2>
          <p className="text-slate-700">We received your location: <span className="font-semibold">{location}</span></p>
          <p className="mt-2">Our team will contact you soon to help you become a host.</p>
        </div>
      )}
    </div>
  );
};

export default JoinVillageStay; 