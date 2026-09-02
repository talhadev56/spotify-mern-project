import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Play, Trash2 } from 'lucide-react';

export default function MyTracks() {
  const { user } = useAuth();
  const { onPlayTrack } = useOutletContext();
  const [myTracks, setMyTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/music')
      .then((res) => {
        const allTracks = res.data.musics || [];
        // Filter songs created by this artist
        const filtered = allTracks.filter(
          (t) => t.artist?._id === user?._id || t.artist?.email === user?.email
        );
        setMyTracks(filtered);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this track?')) return;
    try {
      await api.delete(`/music/${id}`);
      setMyTracks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert('Failed to delete track');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Uploaded Tracks</h2>

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading your tracks...</p>
      ) : myTracks.length === 0 ? (
        <p className="text-zinc-500 text-sm">You haven't uploaded any tracks yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {myTracks.map((track) => (
            <div
              key={track._id}
              onClick={() => onPlayTrack(track)}
              className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80 hover:bg-zinc-800/60 transition group cursor-pointer relative"
            >
              <div className="w-full aspect-square bg-zinc-800 rounded-lg mb-3 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 transition">
                <Play size={32} />
              </div>
              <h3 className="font-semibold text-sm truncate">{track.title}</h3>
              
              <button
                onClick={(e) => handleDelete(track._id, e)}
                className="mt-3 flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition"
              >
                <Trash2 size={14} /> Delete Track
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}