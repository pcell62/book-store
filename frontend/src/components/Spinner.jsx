import React from 'react'

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
        </div>
        
        {/* Middle pulsing ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-600 animate-pulse"></div>
        </div>
        
        {/* Inner spinning ring (opposite direction) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-t-4 border-b-4 border-pink-600 animate-reverse"></div>
        </div>
        
        {/* Center gradient dot */}
        <div className="h-24 w-24 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading text with gradient */}
      <div className="mt-6 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
        Loading...
      </div>
    </div>
  )
}

export default Spinner