"use client";
import React, { useState, useEffect } from "react";

const speakers = [
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 1",
    description: "Experience the future with augmented reality!",
  },
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 2",
    description: "Innovating the next generation of tech.",
  },
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 3",
    description: "Redefining creativity with AI.",
  },
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 4",
    description: "The art of storytelling in the digital age.",
  },
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 5",
    description: "Breaking barriers in sustainable tech.",
  },
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 6",
    description: "How blockchain is shaping the future.",
  },
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 7",
    description: "The power of community-driven innovations.",
  },
  {
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    name: "Speaker 8",
    description: "Next-gen robotics and automation.",
  },
];

function StoryView({ currentStoryIndex, setCurrentStoryIndex, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      nextStory();
    }, 15000); // 15 seconds per story
    return () => clearTimeout(timer);
  }, [currentStoryIndex]);

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % speakers.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? speakers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center p-4">
      <div
        className="absolute top-0 left-0 h-full w-1/2 cursor-pointer"
        onClick={prevStory}
      />
      <div
        className="absolute top-0 right-0 h-full w-1/2 cursor-pointer"
        onClick={nextStory}
      />
      <img
        src={speakers[currentStoryIndex].image}
        alt="Story"
        className="w-[90%] max-w-[400px] h-[60vh] object-cover rounded-lg"
      />
      <h2 className="text-white text-xl font-bold mt-3">
        {speakers[currentStoryIndex].name}
      </h2>
      <p className="text-white text-sm text-center mt-1">
        {speakers[currentStoryIndex].description}
      </p>
      
    </div>
  );
}

function Page() {
  const [showStory, setShowStory] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showStory && (
        <StoryView
          currentStoryIndex={currentStoryIndex}
          setCurrentStoryIndex={setCurrentStoryIndex}
          onClose={() => setShowStory(false)}
        />
      )}
    </div>
  );
}

export default Page;
