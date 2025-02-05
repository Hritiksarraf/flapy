'use client'
import React, { useState, useEffect } from "react";

const speakers = [
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738757344/WhatsApp_Image_2025-01-28_at_13.28.56_iwrry9.jpg",
    name: "Lt Gen Neeraj Varshney",
    description: "Lt Gen Neeraj Varshney, Commandant of MCEME and 75th Colonel Commandant of the Corps of EME, is an NDA alumnus. He led key commands, including a Srinagar workshop during Kargil, a battalion in Rajasthan, and weapon platform sustenance along the LoC. He also served as Brigadier for Space-based Technical Intelligence at the DIA and Commandant of EME School, Vadodara.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738757789/WhatsApp_Image_2025-02-05_at_16.57.50_l2rpqo.jpg",
    name: "Thajmola",
    description: "Thaj, known as @thajmola on Instagram, is a popular Indian content creator famed for his humorous take on everyday life. His engaging content has built a strong following, and he recently ventured into music with Gomma, collaborating with ofRO, showcasing his creative versatility.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738759413/WhatsApp_Image_2025-02-05_at_16.59.06_xupvgf.jpg",
    name: "Asha Bhat",
    description: "Asha Bhat, a passionate singer and engineer, discovered her talent at three and trained in classical music for 15+ years. Gaining recognition on Zee Kannada Sa Re Ga Ma Pa, she balances engineering with music, ensuring it remains a source of joy.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738759847/WhatsApp_Image_2025-02-05_at_18.20.13_cdrhhu.jpg",
    name: "Anil Chhikara",
    description: "Anil Chhikara is a spirited serial entrepreneur, emerging OTT actor, and a true testament to the power of following one's passion. Anil's journey has been a rich tapestry of diverse experiences, from founding EdTech startups to mentoring and consulting on a $100M+ startup portfolio, and now returning to entrepreneurship and guiding early-stage startups to success.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738757967/WhatsApp_Image_2025-02-05_at_17.48.55_uer2y7.jpg",
    name: "Radhika Rajpal",
    description: "Radhika, an LSR and INSEAD alumna, founded Patch Up, India’s first transdermal supplement brand, after a career at Barclays, Microsoft, and a Techstars-backed fintech. Her innovation, inspired by personal health struggles, gained recognition on Shark Tank India.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738758199/WhatsApp_Image_2025-02-05_at_16.59.01_wsuvu5.jpg",
    name: "Lakshmi R Iyer",
    description: "Lakshmi R Iyer, Director & Creative Head at Elios Films, is a visionary filmmaker behind First Second Chance, Seasoned with Love, and Aloo Bhujia (MAMI 2024). Founder of Streetsmart Productions, she has over a decade in the industry, evolving from AD to a celebrated director known for impactful storytelling and innovative filmmaking.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738758396/WhatsApp_Image_2025-02-05_at_17.01.18_qquvgd.jpg",
    name: "Raghav",
    description: "Raghav, an endurance athlete and ex-Meta & Google professional, co-founded Patch Up after discovering the benefits of transdermal supplements. Inspired by his own struggles with traditional supplements, he left his high-profile career to make wellness simple, effective, and accessible.",
  },
];

function StoryView({ currentStoryIndex, setCurrentStoryIndex, onClose }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0); // Reset progress when the story changes

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / 100, 100)); // Fill in 15 seconds
    }, 100);

    const timer = setTimeout(() => {
      nextStory();
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
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
      {/* Progress Bar */}
      <div className="absolute top-3 left-4 right-4 h-2 bg-gray-700 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Click Areas for Navigation */}
      <div className="absolute top-0 left-0 h-full w-1/2 cursor-pointer" onClick={prevStory} />
      <div className="absolute top-0 right-0 h-full w-1/2 cursor-pointer" onClick={nextStory} />

      <h1 className="text-blue-600 mb-5 text-xl">Tap to see next speaker</h1>
      <img
        src={speakers[currentStoryIndex].image}
        alt="Story"
        className="w-[100%] max-w-[480px] h-[60vh] object-cover rounded-lg"
      />
      <h2 className="text-red-500 text-2xl font-bold mt-3">
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