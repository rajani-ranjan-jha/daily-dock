'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Cloud, Sun, CloudRain, Menu, X, Plus, Play, Pause, RotateCcw, Trash2 } from 'lucide-react';

// Quote Component
const Quote = () => {
    const quotes = process.env.NEXT_PUBLIC_QUOTES
    const [quotesData, setQuotesData] = useState()

    async function fetchData() {
        try {
            const res = await fetch(`https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom`, {
                headers: { 'X-Api-Key': `${quotes}`},
                // contentType: 'application/json',
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error(error)
            
        }
    }
    useEffect(() => {
        // fetchData()
    }, [])
  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white">
      <CardHeader>
        <CardTitle>Quote of the Day</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col'>
        <blockquote className="text-lg italic text-white/90 mb-2">
          "The only way to do great work is to love what you do."
        </blockquote>
        <div className="text-sm text-white/60 text-right">— Steve Jobs</div>
      </CardContent>
    </Card>
  );
};

export default Quote