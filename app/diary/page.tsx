"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DiarySidebar from "@/app/components/DiarySidebar";
import DiaryEditor from "@/app/components/DiaryEditor";

export type IDiary = {
  _id?: string;
  title: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
};

const DiaryApp = () => {
  const [diaries, setDiaries] = useState<IDiary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Diaries
  const fetchDiaries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/dock/diary?user_email=bittujha9142@gmail.com`,
      );
      const data = await res.json();
      if (res.ok) {
        setDiaries(data.data);
        // console.log(data.data)
      }
    } catch (error) {
      console.error(error);
      //   window.alert(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  // Create New Diary
  const handleNewDiary = async () => {
    try {
      const res = await fetch("/api/dock/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: "bittujha9142@gmail.com",
          title: "",
          content: "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDiaries([data.diary, ...diaries]);
        setSelectedId(data.diary._id);
      }
    } catch (error) {
      console.error("Failed to create diary", error);
    }
  };

  // Update Diary
  const handleUpdateDiary = async (updatedDiary: IDiary) => {
    // Optimistic update in list: finding the diary and setting the new value in it
    setDiaries((prev) =>
      prev.map((d) => (d._id === updatedDiary._id ? updatedDiary : d)),
    );

    try {
      await fetch(`/api/dock/diary`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDiary),
      });
    } catch (error) {
      console.error("Failed to update diary", error);
    }
  };

  // Delete Diary
  const handleDeleteDiary = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    try {
      await fetch(`/api/dock/diary?id=${id}`, { method: "DELETE" });
      setDiaries((prev) => prev.filter((d) => d._id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (error) {
      console.error("Failed to delete diary", error);
    }
  };

  const selectedDiary = diaries.find((d) => d._id === selectedId);

  return (
    <div className="page-layout">
      <Header />
      <div className="flex items-start w-screen h-full">
        <DiarySidebar
          isLoading={isLoading}
          diaries={diaries}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onNew={handleNewDiary}
          onDelete={handleDeleteDiary}
        />

        <main className="flex-1 relative flex flex-col h-full overflow-hidden">
          {selectedDiary ? (
            <DiaryEditor diary={selectedDiary} onUpdate={handleUpdateDiary} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4">My Diary</h1>
              <p>Select a diary from the sidebar or create a new one.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DiaryApp;
