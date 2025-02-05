'use client'
import React, { useState, useEffect } from "react";

const speakers = [
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738757344/WhatsApp_Image_2025-01-28_at_13.28.56_iwrry9.jpg",
    name: "Lt Gen Neeraj Varshney",
    description: "Lieutenant General Neeraj Varshney is the Commandant of the Military College of Electronics and Mechanical Engineering (MCEME) and the 75th Colonel Commandant of the Corps of EME. An NDA alumnus with 600K on insta, he has held key command positions, including leading a workshop in Srinagar during the Kargil War, commanding a battalion in Rajasthan, and overseeing weapon platform sustenance along the Line of Control in J&K. He also served as Brigadier for Space-based Technical Intelligence at the Defence Intelligence Agency and as Commandant of the EME School, Vadodara.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738759413/WhatsApp_Image_2025-02-05_at_16.59.06_xupvgf.jpg",
    name: "Asha Bhat",
    description: "Asha Bhat is a passionate singer and engineer who discovered her musical talent at the age of three. Trained in classical music for over 15 years, she later explored light and western music, which helped shape her versatility. Her journey into the Indian film industry began with Zee Kannada Sa Re Ga Ma Pa, where she gained recognition and collaborated with talented artists. While music remains her greatest passion, she chose to balance it with engineering to ensure it remains a source of joy rather than stress. Currently in her final year of engineering, Asha is set to work as an engineer while continuing her musical journey with unwavering dedication.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738759847/WhatsApp_Image_2025-02-05_at_18.20.13_cdrhhu.jpg",
    name: "Anil Chhikara",
    description: "Anil Chhikara is a spirited serial entrepreneur, emerging OTT actor, and a true testament to the power of following one's passion. Anil's journey has been a rich tapestry of diverse experiences, from founding EdTech startups to mentoring and consulting on a $100M+ startup portfolio, and now returning to entrepreneurship and guiding early-stage startups to success.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738757967/WhatsApp_Image_2025-02-05_at_17.48.55_uer2y7.jpg",
    name: "Radhika Rajpal",
    description: "Radhika is a visionary entrepreneur redefining the way we approach wellness. A second-time founder and an alumna of Lady Shri Ram College (LSR) and INSEAD, she has an impressive background, having worked at Barclays and Microsoft before taking the leap into the startup world. After building her first venture, a London-based fintech backed by Techstars, she turned her attention to a challenge much closer to home—revolutionizing the health supplement industry. As the founder of Patch Up, India’s pioneering transdermal supplement brand, Radhika is leading the charge toward additive-free, high-absorption vitamin delivery. Her passion for clean nutrition stems from personal experience—struggling with bloating and inefficacy from traditional oral supplements, she discovered the power of transdermal patches. What started as a personal pursuit soon turned into a brand that made its way onto Shark Tank India, where her conviction and clarity impressed investors and audiences alike.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738758199/WhatsApp_Image_2025-02-05_at_16.59.01_wsuvu5.jpg",
    name: "Lakshmi R Iyer",
    description: "Lakshmi R Iyer is the Director & Creative Head at Elios Films Pvt. Ltd., known for her exceptional storytelling and creative vision. She has helmed acclaimed projects like First Second Chance, Seasoned with Love, and Aloo Bhujia (premiered at MAMI 2024), along with her upcoming films The Game, What’s Up Buddy, and 2050. With over a decade in the film industry, she has consistently pushed creative boundaries, earning recognition for her impactful narratives. As the Founder and CEO of Streetsmart Productions, she has cultivated a reputation for innovative independent filmmaking. Her journey from an Assistant Director and Production Assistant to a celebrated director showcases her passion, perseverance, and unmatched storytelling ability. Her work not only entertains but also deeply connects with audiences, solidifying her place as a trailblazer in modern cinema.",
  },
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738758396/WhatsApp_Image_2025-02-05_at_17.01.18_qquvgd.jpg",
    name: "Raghav",
    description: "Raghav’s journey is a testament to embracing change, taking risks, and following passion. An endurance athlete and mountaineer at heart, he understands the role of nutrition in optimizing performance and well-being. While working at Meta and Google, he relied on traditional supplements, but bloating, poor absorption, and inefficacy made him question if there was a better way.That’s when he discovered Patch Up, a brand that introduced him to transdermal patches—an innovative solution that fit seamlessly into his routine. The more he used them, the more he believed in their potential to transform wellness. But believing wasn’t enough. Despite the security of a high-profile career at Google, he made the difficult decision to leave and take a leap of faith—co-founding Patch Up alongside Radhika to make wellness simple, effective, and accessible to everyone. Today, Raghav is on a mission to revolutionize the way we think about supplementation, proving that health doesn’t have to be complicated—just well-delivered.",
  },
  
  {
    image: "https://res.cloudinary.com/hritiksarraf/image/upload/v1738757789/WhatsApp_Image_2025-02-05_at_16.57.50_l2rpqo.jpg",
    name: "Thajmola",
    description: "Thaj, widely recognized by his Instagram handle @thajmola, is a distinguished Indian content creator celebrated for his distinctive and humorous perspectives on everyday life. His engaging content has garnered a substantial following, reflecting his deep connection with a diverse audience. Recently, Thaj expanded his creative pursuits into music with the release of the song \"Gomma\" in collaboration with ofRO, showcasing his versatility and passion for storytelling through this new medium. His unique approach and dedication have solidified his position as a leading figure in the digital content and creative landscape.",
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