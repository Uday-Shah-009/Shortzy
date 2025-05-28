import React, { useEffect } from 'react'
import UrlHome from '../Components/UrlHome'
import { useDispatch } from 'react-redux'
import { login } from '../Store/slice/authReducer'
import { getMe } from '../API/user.api'

const Homepage = () => {
  const dispatch = useDispatch()
  
  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getMe()
        if (userData && userData.user) {
          dispatch(login(userData.user))
        }
      } catch (error) {
        // Silent fail on homepage - no need to show errors
        console.log('Not authenticated on homepage')
      }
    }
    
    checkAuth()
  }, [dispatch])
  
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">URL Shortener</h1>
        </div>
        <div className="rounded-lg shadow-md p-6 bg-gray-800">
          <UrlHome />
        </div>
      </div>
    </div>
  )
}

export default Homepage


