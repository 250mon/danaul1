"use client";

import { useRef } from "react";
import { trackEvent } from "@/app/lib/analytics";

interface ExerciseClipProps {
  title: string;
  src: string;
  section: string;
}

export default function ExerciseClip({ title, src, section }: ExerciseClipProps) {
  // Only the first play counts; resuming after a pause is not a new view.
  const reported = useRef(false);

  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      aria-label={title}
      onPlay={() => {
        if (reported.current) return;
        reported.current = true;
        trackEvent("video_play", { video_title: title, section });
      }}
      className="w-full h-full border-0 rounded-t-xl"
    />
  );
}
