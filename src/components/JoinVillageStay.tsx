import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix marker icon issue in Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_POSITION = { lat: 20.5937, lng: 78.9629 }; // Center of India

const JoinVillageStay: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const mapRef = useRef<any>(null);

  // Search for locations using Nominatim with better search
  const handleLocationSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setPredictions([]);
      return;
    }
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query + ', India',
          format: 'json',
          addressdetails: 1,
          countrycodes: 'in',
          limit: 8,
          featuretype: 'city,village,hamlet',
        },
      });
      setPredictions(res.data);
    } catch (error) {
      setPredictions([]);
    }
  };

  // When user selects a prediction
  const handlePredictionSelect = (prediction: any) => {
    setSearchQuery(prediction.display_name);
    setPredictions([]);
    setSelectedLocation({
      lat: parseFloat(prediction.lat),
      lng: parseFloat(prediction.lon),
      address: prediction.display_name,
    });
    if (mapRef.current) {
      mapRef.current.setView([parseFloat(prediction.lat), parseFloat(prediction.lon)], 12);
    }
  };

  // Allow user to pick location by clicking map
  function LocationMarker() {
    useMapEvents({
      click(e: L.LeafletMouseEvent) {
        setSelectedLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          address: `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`,
        });
      },
    });
    return selectedLocation ? (
      <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
    ) : null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-accent-700">Welcome! Join as a Host</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4">
          <label htmlFor="location" className="text-lg font-medium text-slate-700">Add your location</label>
          <div className="relative">
            <input
              id="location"
              type="text"
              value={searchQuery}
              onChange={e => handleLocationSearch(e.target.value)}
              placeholder="Search for your village or area..."
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-400"
              autoComplete="off"
              required
            />
            {predictions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {predictions.map((prediction, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePredictionSelect(prediction)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 border-b border-slate-200 last:border-b-0"
                  >
                    {prediction.display_name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Map Preview */}
          <div className="h-64 border border-slate-300 rounded-lg overflow-hidden">
            <MapContainer
              center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [DEFAULT_POSITION.lat, DEFAULT_POSITION.lng]}
              zoom={selectedLocation ? 12 : 5}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>
          {/* Selected Location Display */}
          {selectedLocation && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <p className="text-sm text-emerald-700">
                <strong>Selected:</strong> {selectedLocation.address}
              </p>
              <p className="text-xs text-emerald-600">
                Coordinates: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
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
          <p className="text-slate-700">We received your location: <span className="font-semibold">{selectedLocation?.address || searchQuery}</span></p>
          <p className="mt-2">Our team will contact you soon to help you become a host.</p>
        </div>
      )}
    </div>
  );
};

export default JoinVillageStay; 