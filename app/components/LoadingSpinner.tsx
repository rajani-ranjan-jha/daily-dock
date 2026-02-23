'use client'
import React, { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
    text?: string;
}

const LoadingSpinner = ({text}:LoadingSpinnerProps) => {
    const [dot, setDot] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setDot(prev => prev.length < 3 ? prev + '.' : '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-full h-full flex flex-col justify-center items-center text-3xl gap-4'>
            <div className="animate-spin rounded-full h-10 w-10 border-b-5 mx-auto mb-2"></div>
            <p className="text-2xl">Loading {text || 'None'} {dot}</p>
        </div>
    )
}

export default LoadingSpinner
