"use client";
import { useEffect, useRef, useState } from "react";
import { INote } from "@/app/note/page";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";

interface NoteEditorProps {
  note: INote;
  onUpdate: (note: INote) => void;
  onDelete: (_id: string) => void;
  onClose: () => void;
}

export default function NoteEditor({
  note,
  onUpdate,
  onDelete,
  onClose,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);
  const [allowedCategories, setAllowedCategories] = useState<string[]>([
    "travel",
    "productivity",
    "study",
    "fun",
  ]);
  const titleRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false)

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note._id]);

  useEffect(() => {
    titleRef.current?.focus();
  }, [note._id]);

  const handleSave = () => {
    onUpdate({ ...note, title, content, modifiedAt: new Date() });
  };

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== note.title || content !== note.content || category !== note.category) {
        setIsSaving(true)
        onUpdate({ ...note, title, content, category });
        setIsSaving(false)  
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, content, category, onClose]);

  return (
    <div
      className="w-200 h-full flex flex-col bg-primary-foregroud border-2 text-pimary dark:text-foreground"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <span className="text-xs font-mono tracking-widest uppercase">
          {note.modifiedAt
            ? new Date(note.modifiedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "New note"}
        </span>
        <div className="flex items-center gap-2">
          <select className="p-2 border outline-none rounded-md" name="category" id="category" 
          onChange={(e) => onUpdate({...note, category: e.target.value})}
          >
            <option className="bg-secondary text-primary-foreground dark:bg-primary dark:text-white hover:bg-red-100" value={`${category || "default"}`}>
              {category || "select category"}
            </option>
            {allowedCategories.map((cat, idx) => {
              if (cat != category) return <option className="bg-secondary text-primary-foreground dark:bg-primary dark:text-white hover:bg-red-100" key={idx} value={cat}>{cat}</option>;
            })}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="capitalize mr-2">{isSaving ? 'saving...' : 'saved'}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(note._id!)}
            className="text-red-600 hover:bg-red-200"
          >
            <Trash2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className=""
          >
            <X size={18} />
          </Button>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-y-auto px-5 py-0 md:px-16 md:py-12">
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full bg-transparent text-3xl font-bold leading-snug outline-none mb-6 resize-none"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your thoughts..."
          className="w-full bg-transparent text-base leading-relaxed outline-none resize-none border-t pt-6"
        />
      </div>
    </div>
  );
}
