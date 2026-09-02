import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CreateAlbumModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [musics, setMusics] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.get('/music')
        .then((res) => {
          const fetchedTracks = res.data.musics || res.data || [];
          
          const artistTracks = fetchedTracks.filter((track) => {
            const artistId = track.artist?._id || track.artist?.id || track.artist;
            return artistId === user?._id || artistId === user?.id;
          });
          setMusics(artistTracks.length > 0 ? artistTracks : fetchedTracks);
        })
        .catch((err) => {
          console.error('Failed to fetch tracks for album creation:', err);
          setMusics([]);
        });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const toggleTrackSelection = (id) => {
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || selectedTracks.length === 0) {
      alert('Please enter an album title and select at least one track.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/music/album', {
        title,
        musics: selectedTracks,
      });
      alert('Album created successfully!');
      setTitle('');
      setSelectedTracks([]);
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create album');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md text-white max-h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">Create New Album</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Album Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g., Summer Vibes 2026"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Select Tracks</label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-zinc-800 rounded-lg p-2">
              {musics.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-4">
                  No tracks found. Upload a track first!
                </p>
              ) : (
                musics.map((track) => (
                  <label
                    key={track._id || track.id}
                    className="flex items-center gap-3 p-2 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTracks.includes(track._id || track.id)}
                      onChange={() => toggleTrackSelection(track._id || track.id)}
                      className="accent-emerald-500 rounded"
                    />
                    <span className="truncate">{track.title}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Album'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}