import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Assessment from './components/assessment/Assessment';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        {showAssessment ? (
          <Assessment />
        ) : (
          <Hero />
        )}
      </div>
    </div>
  );
}

export default App;