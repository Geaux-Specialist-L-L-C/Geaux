import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { session, signOut } = useAuth();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignOutClick = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Assessment', path: '/assessment', protected: true },
    { name: 'Resources', path: '/resources', protected: false },
  ];

  const renderNavLink = (item: { name: string; path: string; protected: boolean }) => {
    if (item.protected && !session) return null;
    
    return (
      <Link
        key={item.name}
        to={item.path}
        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LearnStyle AI</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map(renderNavLink)}
            <button
              onClick={session ? handleSignOutClick : handleSignInClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {session ? 'Sign Out' : 'Sign In'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map(item => (
              item.protected && !session ? null : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              )
            ))}
            <button
              onClick={session ? handleSignOutClick : handleSignInClick}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {session ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}