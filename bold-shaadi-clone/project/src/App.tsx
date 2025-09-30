import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { ProfileDetailPage } from './pages/ProfileDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (page !== 'profile-detail') {
      setSelectedProfileId(null);
    }
  };

  const handleViewProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setCurrentPage('profile-detail');
  };

  const handleBackFromProfile = () => {
    setCurrentPage('browse');
    setSelectedProfileId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main>
        {currentPage === 'home' && (
          <HomePage onPageChange={handlePageChange} />
        )}
        
        {currentPage === 'browse' && (
          <BrowsePage onViewProfile={handleViewProfile} />
        )}
        
        {currentPage === 'profile-detail' && selectedProfileId && (
          <ProfileDetailPage 
            profileId={selectedProfileId} 
            onBack={handleBackFromProfile}
          />
        )}
        
        {(currentPage === 'matches' || currentPage === 'messages' || currentPage === 'profile') && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentPage === 'matches' && 'My Matches'}
              {currentPage === 'messages' && 'Messages'}
              {currentPage === 'profile' && 'My Profile'}
            </h2>
            <p className="text-gray-600 mb-8">
              This section is coming soon. Please explore our browse profiles feature for now.
            </p>
            <button
              onClick={() => handlePageChange('browse')}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Browse Profiles
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;