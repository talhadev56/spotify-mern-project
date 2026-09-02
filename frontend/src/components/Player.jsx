import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, X } from 'lucide-react';

export default function Player({ currentTrack, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    if (onClose) onClose();
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-950 border-t border-zinc-800 px-6 flex items-center justify-between text-white z-50">
      
      <div className="flex items-center gap-4 w-1/4">
        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center font-bold text-emerald-500 shrink-0">
          🎵
        </div>
        <div className="truncate">
          <p className="font-semibold text-sm truncate">{currentTrack.title}</p>
          <p className="text-xs text-zinc-400 truncate">{currentTrack.artist?.username || 'Artist'}</p>
        </div>
      </div>

      
      <div className="flex flex-col items-center gap-1 w-2/4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-105 transition cursor-pointer"
        >
          {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-0.5" />}
        </button>
        <audio ref={audioRef} src={currentTrack.uri} onEnded={() => setIsPlaying(false)} />
      </div>

      
      <div className="flex items-center justify-end gap-4 w-1/4 text-zinc-400">
        <Volume2 size={20} />
        <button
          onClick={handleClose}
          className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition cursor-pointer"
          title="Close player"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}