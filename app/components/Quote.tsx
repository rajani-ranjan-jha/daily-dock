"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetQuote } from "./logics/quote";

// Quote Component
const Quote = () => {
  const [quoteText, setQuoteText] = useState<string>(
    "The only way to do great work is to love what you do.",
  );
  const [quoteAuthor, setQuoteAuthor] = useState<string>("Steve Jobs");
  const [quoteCategory, setQuoteCategory] = useState<string[]>();

  async function fetchData() {
    const data = await GetQuote();
    if (data && data[0].length !== 0) {
      // console.log(data[0]);
      setQuoteText(data[0].quote);
      setQuoteAuthor(data[0].author);
      setQuoteCategory(data[0].category);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card className="text-primary dark:text-foreground w-full backdrop-blur-xl bg-linear-to-br from-muted-foreground via-muted to-muted-foreground dark:from-primary-foreground dark:via-primary-foreground dark:to-secondary-foreground border-white/30 shadow-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="w-full text-3xl">Quote of the Day</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col">
        <span className="text-lg italic mb-2">"{quoteText}"</span>
        <div className="text-sm text-right">— {quoteAuthor}</div>
      </CardContent>
    </Card>
  );
};

export default Quote;
