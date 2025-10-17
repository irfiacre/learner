import React, { useState, useEffect, useCallback, useMemo, FC } from 'react';

// --- Type Definitions ---

interface Video {
  id: number;
  videoId: string;
  title: string;
  author: string;
  transcript: string;
  color: string;
  likes: string;
  comments: string;
}

interface SummaryModalProps {
  summary: string | null;
  onClose: () => void;
  videoTitle: string;
  isOpen: boolean;
}

// --- Icon Components ---

// Use lucide-react icons (assuming they are available in the runtime environment)
const ChevronDown: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
const Zap: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const User: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

// Mock data for the video feed
const mockVideos: Video[] = [
  {
    id: 1,
    videoId: 'qL3c89E73x0', // Placeholder ID for a space-related short (Black Holes)
    title: "Why Black Holes Aren't Vacuums",
    author: "AstroExpert",
    transcript: "Everyone thinks black holes are giant cosmic vacuums, but that's a misconception! They only suck things in if you cross the event horizon. Gravity works the same way around a black hole as it does around any star of the same mass. If the Sun suddenly became a black hole, Earth's orbit wouldn't change. We'd just get cold. So, relax, you're not getting pulled in unless you get too close!",
    color: 'bg-indigo-900',
    likes: '1.2M',
    comments: '45K'
  },
  {
    id: 2,
    videoId: 'W0g0y_G-35Q', // Placeholder ID for a space-related short (Dark Matter)
    title: "The Mystery of Dark Matter (In 60 Seconds)",
    author: "CosmicGaze",
    transcript: "Dark matter is the invisible glue holding galaxies together. We can't see it, but we know it's there because of its gravitational effect on visible matter. It makes up about 85% of the total matter in the universe. We don't know what it is yet, but experiments underground are trying to catch a dark matter particle. It's one of the biggest unsolved mysteries in physics!",
    color: 'bg-red-900',
    likes: '800K',
    comments: '12K'
  },
  {
    id: 3,
    videoId: 'tWw91hC2f6k', // Placeholder ID for a space-related short (Pluto)
    title: "Is Pluto a Planet? (The Great Debate)",
    author: "PlanetPundit",
    transcript: "Pluto lost its planet status in 2006. The IAU redefined 'planet' to require three things: orbit the Sun, be round, and 'clear its orbital path.' Pluto fails the third rule, as it shares its orbital neighborhood with other large objects in the Kuiper Belt. It's now classified as a dwarf planet, but many astronomers still call it the King of the Kuiper Belt. It's really just a semantic argument!",
    color: 'bg-teal-900',
    likes: '2.5M',
    comments: '150K'
  }
];

// Main VideoPlayer component
const VideoPlayer: FC = () => {
  // We don't strictly need to type appId, but for completeness:
  // const appId: string = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; 

  // State initialization with explicit types
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // The currently displayed video object, guaranteed to be a Video type
  const currentVideo: Video = useMemo(() => mockVideos[currentVideoIndex], [currentVideoIndex]);

  // Function to move to the next video (typed arguments/return)
  const nextVideo = useCallback((): void => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % mockVideos.length);
    setSummary(null);
    setIsModalOpen(false);
    setError(null);
  }, []);

  // Function to move to the previous video (typed arguments/return)
  const prevVideo = useCallback((): void => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + mockVideos.length) % mockVideos.length);
    setSummary(null);
    setIsModalOpen(false);
    setError(null);
  }, []);

  // Simulate AI text generation using the Gemini API payload structure
  const fetchSummary = async (transcript: string, title: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    const userQuery: string = `Analyze the following video transcript for a short-form video titled '${title}'. Provide a single, concise paragraph that summarizes the main idea and key takeaway of the content. Transcript: "${transcript}"`;
    const systemPrompt: string = "You are a specialized content analysis AI. Your task is to quickly distill the essence of a given video transcript into a concise summary suitable for a busy user. The summary must be a single paragraph.";

    const apiKey: string = ""; // Canvas will provide the key at runtime
    const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    const maxRetries: number = 3;
    for (let attempt: number = 0; attempt < maxRetries; attempt++) {
      try {
        const response: Response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const generatedText: string | undefined = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
          setSummary(generatedText);
          setIsModalOpen(true);
          return;
        } else {
          throw new Error("No text generated or unexpected API response structure.");
        }
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
        console.error(`Attempt ${attempt + 1} failed:`, errorMessage);

        if (attempt === maxRetries - 1) {
          setError(`Failed to generate summary after ${maxRetries} attempts.`);
        } else {
          // Exponential backoff: 1s, 2s, 4s delay
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle the 'Summarize' button click
  const handleSummarizeClick = (): void => {
    fetchSummary(currentVideo.transcript, currentVideo.title);
  };

  // Setup keyboard controls (Up/Down arrow for navigation)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowDown') {
        nextVideo();
      } else if (event.key === 'ArrowUp') {
        prevVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextVideo, prevVideo]);

  // --- UI Components ---

  const SummaryModal: FC<SummaryModalProps> = ({ summary, onClose, videoTitle, isOpen }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}>
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 transform scale-100" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-yellow-400 flex items-center">
              <Zap />
              <span className="ml-2">AI Summary: &quot;{videoTitle}&quot;</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-3xl"
              aria-label="Close Summary"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-300 leading-relaxed">
            {summary}
          </p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    );
  };

  const VideoPlayer: FC<{ currentVideo: Video }> = ({ currentVideo }) => {
    // YouTube embed URL configuration:
    const embedUrl: string = `https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${currentVideo.videoId}`;

    return (
      <div className={`relative flex items-end justify-center w-full h-full rounded-xl shadow-2xl overflow-hidden`}>
        {/* The video container is absolute and takes up 100% of the parent's space */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* YouTube Embed Frame - Styled to cover the vertical container */}
          <iframe
            title={currentVideo.title}
            src={embedUrl}
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            // Tailwind classes to center the iframe and ensure it covers the vertical space
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: 'transparent' }}
          ></iframe>
        </div>

        {/* Content Overlay - Positioned absolutely above the video */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white pointer-events-none z-30">
          <h1 className="text-3xl font-extrabold mb-2 leading-tight drop-shadow-lg">
            {currentVideo.title}
          </h1>
          <div className="flex items-center text-sm font-medium opacity-80 drop-shadow">
            <User className="w-4 h-4 mr-2" />
            @{currentVideo.author}
          </div>
        </div>

        {/* Side Interactions - Positioned absolutely above the video */}
        <div className="absolute right-4 bottom-40 flex flex-col space-y-4 text-white z-30">
          <div className="text-center drop-shadow-lg">
            <Zap className="w-8 h-8 mx-auto" />
            <span className="block text-xs mt-1 font-semibold">{currentVideo.likes}</span>
          </div>
          <div className="text-center drop-shadow-lg">
            <span className="text-2xl">💬</span>
            <span className="block text-xs mt-1 font-semibold">{currentVideo.comments}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white p-4 flex items-center justify-center md:p-8">
      {/* The main app container now uses Tailwind JIT syntax for custom values */}
      <div 
        className="
          h-[80vh] max-h-[800px] w-full max-w-[450px] 
          bg-gray-900 
          border-[12px] border-gray-700 
          rounded-2xl 
          shadow-2xl 
          flex flex-col 
          justify-center items-center 
          relative
        "
      >
        {/* Header/Controls */}
        <div className="absolute top-4 left-0 right-0 px-4 z-40 flex justify-center">
            <h1 className="text-2xl font-black text-yellow-400">AI SHORTY ⚡</h1>
        </div>

        {/* Video Feed Area */}
        <div className="relative w-full h-full p-2">
            {/* Pass currentVideo as a prop with the defined Video type */}
            <VideoPlayer currentVideo={currentVideo} />
        </div>

        {/* Navigation Indicators */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-2 z-40">
          <button onClick={prevVideo} className="p-3 bg-white/10 rounded-full transition-opacity hover:opacity-80 shadow-lg" aria-label="Previous Video">
            <ChevronDown className="transform rotate-90" />
          </button>
          <button onClick={nextVideo} className="p-3 bg-white/10 rounded-full transition-opacity hover:opacity-80 shadow-lg" aria-label="Next Video">
            <ChevronDown className="transform -rotate-90" />
          </button>
        </div>

        {/* Bottom Bar/Action */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 rounded-b-xl z-40">
          <div className="text-center mb-3 text-sm text-gray-400">
             {currentVideoIndex + 1} / {mockVideos.length} - Use Up/Down Arrows to scroll!
          </div>
          <button
            onClick={handleSummarizeClick}
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
              isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Analyzing Transcript...
              </span>
            ) : (
              'Summarize Video Content'
            )}
          </button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>

        {/* Summary Modal */}
        <SummaryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          summary={summary}
          videoTitle={currentVideo.title}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
