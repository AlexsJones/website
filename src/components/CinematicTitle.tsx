"use client";

import { useEffect, useState } from "react";

const TITLES = [
  { text: "in the open.", size: "short" },
  { text: "the infrastructure\nof AI.", size: "long" },
  { text: "the future of\nopen source.", size: "medium" },
  { text: "systems at\nthe frontier.", size: "medium" },
  { text: "agents that\ncoordinate.", size: "medium" },
] as const;

const STORAGE_KEY = "hero-title-index";

export default function CinematicTitle() {
  const [titleIndex, setTitleIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedIndex = Number.parseInt(
      window.localStorage.getItem(STORAGE_KEY) ?? "0",
      10
    );
    const nextIndex = Number.isFinite(storedIndex)
      ? storedIndex % TITLES.length
      : 0;

    setTitleIndex(nextIndex);
    window.localStorage.setItem(
      STORAGE_KEY,
      String((nextIndex + 1) % TITLES.length)
    );

    const rotation = window.setInterval(() => {
      setTitleIndex((currentIndex) => {
        const followingIndex = ((currentIndex ?? nextIndex) + 1) % TITLES.length;
        window.localStorage.setItem(
          STORAGE_KEY,
          String((followingIndex + 1) % TITLES.length)
        );
        return followingIndex;
      });
    }, 5000);

    return () => window.clearInterval(rotation);
  }, []);

  const title = TITLES[titleIndex ?? 0];

  return (
    <span className="cinematic-title-slot">
      <span
        key={titleIndex ?? "pending"}
        className={`cinematic-title cinematic-title--${title.size} italic ${
          titleIndex === null ? "" : "cinematic-title--ready"
        }`}
        data-title={title.text}
      >
        <span className="cinematic-title__text">{title.text}</span>
      </span>
    </span>
  );
}
