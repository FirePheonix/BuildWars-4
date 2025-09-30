import { Heart, MapPin, GraduationCap, Briefcase, Star, Shield, Crown } from 'lucide-react';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  onViewProfile: (profileId: string) => void;
  onLike?: (profileId: string) => void;
  isLiked?: boolean;
}

export function ProfileCard({ profile, onViewProfile, onLike, isLiked }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Profile Image */}
      <div className="relative">
        <img
          src={profile.photos[0]}
          alt={profile.name}
          className="w-full h-64 object-cover"
        />
        
        {/* Premium Badge */}
        {profile.premium && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </div>
        )}

        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
            <Shield className="h-4 w-4" />
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => onLike?.(profile.id)}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isLiked
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
          } shadow-md hover:shadow-lg`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Online Status */}
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs text-gray-600">
          {profile.lastActive}
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.age} years, {profile.height}</p>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-xs text-gray-600 ml-1">4.8</span>
          </div>
        </div>

        {/* Key Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
            <span>{profile.education}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
            <span>{profile.occupation}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* About Preview */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {profile.about.length > 100 ? `${profile.about.substring(0, 100)}...` : profile.about}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1 mb-4">
          {profile.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
          {profile.interests.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{profile.interests.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onViewProfile(profile.id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            View Profile
          </button>
          <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
            Send Interest
          </button>
        </div>
      </div>
    </div>
  );
}