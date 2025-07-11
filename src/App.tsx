import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedVillages from './components/FeaturedVillages';
import Experiences from './components/Experiences';
import ImpactStats from './components/ImpactStats';
import DonationCard from './components/DonationCard';
import Footer from './components/Footer';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <Header 
          currentLanguage={currentLanguage} 
          onLanguageChange={setCurrentLanguage}
        />
        <Hero />
        <FeaturedVillages />
        <Experiences />
        <ImpactStats />
        <DonationCard />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;