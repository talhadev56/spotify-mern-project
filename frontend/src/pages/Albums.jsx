import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Disc } from 'lucide-react';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/music/albums')
      .then((res) => setAlbums(res.data.albums || []))
      .catch((err) => console.error('Failed to load albums', err));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Albums</h2>

      {albums.length === 0 ? (
        <p className="text-zinc-500 text-sm">No albums available yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <div
              key={album._id}
              onClick={() => navigate(`/albums/${album._id}`)}
              className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80 hover:bg-zinc-800/60 transition group cursor-pointer"
            >
              <div className="w-full aspect-square bg-zinc-800 rounded-lg mb-3 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 transition">
                <Disc size={40} className="group-hover:rotate-45 transition transform duration-300" />
              </div>
              <h3 className="font-semibold text-sm text-white truncate">{album.title}</h3>
              <p className="text-xs text-zinc-400 truncate mt-1">
                {album.artist?.username || 'Artist'} 
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}