import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../api/axios';
import { Play, Search } from 'lucide-react';

export default function Home() {
  const { onPlayTrack } = useOutletContext();
  const [musics, setMusics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/music')
      .then((res) => setMusics(res.data.musics || []))
      .catch((err) => console.error('Failed to load music tracks', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredMusics = musics.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Explore Tracks</h2>
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search title or artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading music tracks...</p>
      ) : filteredMusics.length === 0 ? (
        <p className="text-zinc-500 text-sm">No tracks found matching your query.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMusics.map((track) => (
            <div
              key={track._id}
              onClick={() => onPlayTrack(track)}
              className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80 hover:bg-zinc-800/60 transition group cursor-pointer"
            >
              <div className="w-full aspect-square bg-zinc-800 rounded-lg mb-3 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 transition">
                <Play size={32} className="group-hover:scale-110 transition transform" />
              </div>
              <h3 className="font-semibold text-sm truncate">{track.title}</h3>
              <p className="text-xs text-zinc-400 truncate mt-1">
                {track.artist?.username || 'Unknown Artist'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
