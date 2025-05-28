import React from 'react'
import LoginForm from '../Components/Loginform'

const AuthPage = () => {
  return (
    <div>
       
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">URL Shortener</h1>
        </div>
        <div className="rounded-lg shadow-md p-6 bg-gray-900">
          <LoginForm />
        </div>
      </div>
    </div>
    </div>
  )
}

export default AuthPage
