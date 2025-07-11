import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedVillages from './components/FeaturedVillages';
import Experiences from './components/Experiences';
import ImpactStats from './components/ImpactStats';
import DonationCard from './components/DonationCard';
import Footer from './components/Footer';
import JoinVillageStay from './components/JoinVillageStay';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Header 
            currentLanguage={currentLanguage} 
            onLanguageChange={setCurrentLanguage}
          />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <FeaturedVillages />
                <Experiences />
                <ImpactStats />
                <DonationCard />
              </>
            } />
            <Route path="/join-village-stay" element={<JoinVillageStay />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;