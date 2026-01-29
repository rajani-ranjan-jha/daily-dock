'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Cloud, Sun, CloudRain, Menu, X, Plus, Play, Pause, RotateCcw, Trash2 } from 'lucide-react';
import Quote from './Quote';
import Weather from './Weather';

// Hero Component (for non-logged in users)
const Hero = () => {
  return (
    <div className='flex justify-between items-center border-2 rounded-md min-h-200'>
      <div className="flex flex-col justify-center items-start gap-5 border-2">
        <h2 className='text-left font-semibold font-mono text-4xl'>Hey, User</h2>
        {/* Quote section */}
        <Quote/>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center gap-5 border-2">
        {/* Weather section */}
        <Weather/>
      </div>



    </div>
  );
};

export default Hero