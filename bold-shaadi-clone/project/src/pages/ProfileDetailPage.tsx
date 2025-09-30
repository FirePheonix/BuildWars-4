import { ArrowLeft, Heart, MessageCircle, Share2, MapPin, GraduationCap, Briefcase, User, Users, Star, Shield, Crown, Camera } from 'lucide-react';
import { profiles } from '../data/profiles';
import { useState } from 'react';

interface ProfileDetailPageProps {
  profileId: string;
  onBack: () => void;
}

export function ProfileDetailPage({ profileId, onBack }: ProfileDetailPageProps) {
  const profile = profiles.find(p => p.id === profileId);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Browse
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-colors ${
              isLiked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Photos */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
            {/* Main Photo */}
            <div className="relative">
              <img
                src={profile.photos[currentPhotoIndex]}
                alt={profile.name}
                className="w-full h-96 object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                {profile.premium && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Crown className="h-4 w-4 mr-1" />
                    Premium
                  </div>
                )}
                {profile.verified && (
                  <div className="bg-green-500 text-white p-2 rounded-full">
                    <Shield className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Photo Navigation */}
              {profile.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {profile.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentPhotoIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Photo Count */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                <Camera className="h-3 w-3 mr-1" />
                {currentPhotoIndex + 1}/{profile.photos.length}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 space-y-3">
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Send Interest
              </button>
              <button className="w-full flex items-center justify-center border-2 border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                <MessageCircle className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                <p className="text-lg text-gray-600">{profile.age} years • {profile.height}</p>
              </div>
              <div className="flex items-center text-yellow-500">
                <Star className="h-6 w-6 fill-current" />
                <span className="text-lg font-semibold ml-1">4.8</span>
                <span className="text-sm text-gray-500 ml-1">(142 reviews)</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <GraduationCap className="h-5 w-5 mr-3 text-blue-600" />
                <div>
                  <p className="font-semibold">Education</p>
                  <p className="text-sm text-gray-600">{profile.education}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <Briefcase className="h-5 w-5 mr-3 text-green-600" />
                <div>
                  <p className="font-semibold">Occupation</p>
                  <p className="text-sm text-gray-600">{profile.occupation}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-3 text-red-600" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-sm text-gray-600">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <User className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-semibold">Religion</p>
                  <p className="text-sm text-gray-600">{profile.religion}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-700 leading-relaxed">{profile.about}</p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{profile.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{profile.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marital Status:</span>
                    <span className="font-medium">{profile.maritalStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mother Tongue:</span>
                    <span className="font-medium">{profile.motherTongue}</span>
                  </div>
                  {profile.income && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Income:</span>
                      <span className="font-medium">{profile.income}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Religious Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Religion:</span>
                    <span className="font-medium">{profile.religion}</span>
                  </div>
                  {profile.caste && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Caste:</span>
                      <span className="font-medium">{profile.caste}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Active:</span>
                    <span className="font-medium text-green-600">{profile.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Family Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Family Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Father's Occupation:</span>
                  <span className="font-medium">{profile.familyDetails.fatherOccupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mother's Occupation:</span>
                  <span className="font-medium">{profile.familyDetails.motherOccupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Siblings:</span>
                  <span className="font-medium">{profile.familyDetails.siblings}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Interests & Hobbies</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Partner Preferences */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Partner Preferences</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Age Range</p>
                <p className="text-gray-700">{profile.preferences.ageRange.min} - {profile.preferences.ageRange.max} years</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Education</p>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.education.map((edu) => (
                    <span key={edu} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {edu}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Preferred Locations</p>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.location.map((loc) => (
                    <span key={loc} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}