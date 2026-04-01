"use client";
import React, { useState, useEffect } from "react";
import { IDiary } from "../diary/page";
import DiaryDatePicker from "./DiaryDatePicker";


interface DiaryEditorProps {
  diary: IDiary;
  onUpdate: (updated: IDiary) => void;
}

const DiaryEditor: React.FC<DiaryEditorProps> = ({ diary, onUpdate }) => {
  const [title, setTitle] = useState(diary.title);
  const [content, setContent] = useState(diary.content);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state when selected diary changes
  useEffect(() => {
    setTitle(diary.title);
    setContent(diary.content);
  }, [diary._id]);


  // Simple debounce for auto-save effect or just save on blur/change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== diary.title || content !== diary.content) {
        // setIsSaving(true)
        onUpdate({ ...diary, title, content });
        // setIsSaving(false)
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, content]);

  return (
    <div className="handle-scroll flex-1 h-full flex flex-col p-6 border border-muted m-4 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-4 border-b border-muted pb-2">
        
        <DiaryDatePicker diary={diary} onUpdate={onUpdate} />
        <input
          type="text"
          value={title}
          title="Diary Title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry Title..."
          className="ml-5 text-3xl font-bold bg-transparent border-none outline-none w-full placeholder-muted"
        />
        <div className="text-sm font-semibold opacity-50 whitespace-nowrap">
          {isSaving ? "Saving..." : "Saved"}
        </div>
      </div>

      <textarea
        //   title="Diary Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Dear Diary..."
        className="flex-1 w-full bg-transparent border-none outline-none resize-none text-lg leading-relaxed placeholder-muted p-2"
        spellCheck={true}
      />

      <div className="mt-2 text-left opacity-80 text-sm">
        {content.length} characters
      </div>
    </div>
  );
};

export default DiaryEditor;
