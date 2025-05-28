import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUrls, getMe } from '../API/user.api';
import { useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Store/slice/authReducer';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  // Check authentication
  const { 
    data: userData, 
    isLoading: authLoading, 
    isError: authError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    retry: 1,
    onError: (error) => {
      console.error("Auth error in Dashboard:", error);
      navigate({ to: '/auth' });
    }
  });

  // Update auth state if needed
  useEffect(() => {
    if (userData && userData.user) {
      dispatch(login(userData.user));
    }
  }, [userData, dispatch]);

  // Fetch user URLs only after authentication is confirmed
  const { 
    data: urlsData, 
    isLoading: urlsLoading, 
    isError: urlsError,
    refetch 
  } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUrls,
    enabled: !!userData?.user, // Only run if user is authenticated
  });

  // Loading state
  if (authLoading || urlsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state for authentication
  if (authError) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">Authentication Error</div>
        <p className="text-gray-400 mb-4">Please log in again</p>
        <button 
          onClick={() => navigate({ to: '/auth' })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Error state for URLs
  if (urlsError) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">Error loading your URLs</div>
        <button 
          onClick={() => refetch()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  const urls = urlsData?.urls || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Your URLs</h1>
        <button 
          onClick={() => refetch()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {urls.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl text-gray-300 mb-4">You haven't created any short URLs yet</h2>
          <p className="text-gray-400 mb-6">Create your first short URL to see it here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {urls.map((url) => (
            <div key={url._id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Original URL:</span>
                  <a 
                    href={url.full_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 truncate max-w-[250px]"
                  >
                    {url.full_url}
                  </a>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Short URL:</span>
                  <a 
                    href={`http://localhost:3000/${url.short_url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300"
                  >
                    {`http://localhost:3000/${url.short_url}`}
                  </a>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Clicks:</span>
                  <span className="text-white">{url.clicks || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
