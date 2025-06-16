"use client";

import type { NoteCategory, Notes } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { BookOpen, FileQuestion, ScrollText } from "lucide-react";
import { useState } from "react";

import MarkdownPreview from "@/components/MarkdownPreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CausedObjects {
  courseId: string;
  classId: string;
}

const getNoteDetails = (category: NoteCategory, objectId: string, causedObjects: CausedObjects) => {
  const config = {
    ASSIGNMENT: {
      icon: ScrollText,
      href: `/assignments/${objectId}`,
      style: "text-yellow-500",
      label: "Assignment",
    },
    CLASS: {
      icon: BookOpen,
      href: `/courses/${causedObjects?.courseId}/classes/${objectId}`,
      style: "text-blue-500",
      label: "Class",
    },
    DOUBT: {
      icon: FileQuestion,
      href: `/doubts/${objectId}`,
      style: "text-green-500",
      label: "Doubt",
    },
  };

  return config[category];
};

export const NotesComponent = ({ notes }: { notes: Notes[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = ["ALL", ...new Set(notes.map((n) => n.category))];
  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => note.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="w-full p-2 sm:p-4 space-y-4">
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="flex flex-wrap gap-1 sm:gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="ALL" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="flex min-w-max">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="flex-1 whitespace-nowrap px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredNotes
                .filter((note) => category === "ALL" || note.category === category)
                .map((note) => {
                  const details = getNoteDetails(
                    note.category,
                    note.objectId,
                    note.causedObjects as unknown as CausedObjects
                  );
                  const Icon = details.icon;

                  return (
                    <Card key={note.id}>
                      <CardHeader className="flex flex-row items-center gap-2 sm:gap-4 py-2 sm:py-3">
                        <div className={`p-1.5 rounded-full bg-muted ${details.style}`}>
                          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                        <div className="flex flex-1 flex-wrap items-center gap-1 sm:gap-2">
                          <CardTitle className="text-xs sm:text-sm">{details.label}</CardTitle>
                          <CardDescription className="text-xs hidden xs:inline">
                            {formatDistanceToNow(note.createdAt, { addSuffix: true })}
                          </CardDescription>
                          <a
                            href={details.href}
                            className="text-xs text-muted-foreground hover:text-primary transition-colors ml-auto"
                          >
                            View
                          </a>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 py-2">
                        <div className="prose dark:prose-invert max-w-none">
                          <MarkdownPreview content={note.description || ""} className="text-xs sm:text-sm" />
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-secondary text-secondary-foreground px-1.5 sm:px-2 py-0.5 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};