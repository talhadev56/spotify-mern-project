import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Play, Disc, Music } from 'lucide-react';

export default function AlbumDetail({ onPlayTrack }) {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    api.get(`/music/albums/${albumId}`)
      .then((res) => setAlbum(res.data.album))
      .catch((err) => console.error('Failed to load album details', err));
  }, [albumId]);

  if (!album) {
    return <div className="text-zinc-400 text-sm p-4">Loading album details...</div>;
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-end gap-6 bg-linear-to-b from-zinc-800 to-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
        <div className="w-32 h-32 bg-zinc-800 rounded-xl flex items-center justify-center text-emerald-500 shadow-lg">
          <Disc size={64} />
        </div>
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Album</span>
          <h1 className="text-3xl font-extrabold mt-1">{album.title}</h1>
          <p className="text-sm text-zinc-400 mt-2">
            By <span className="text-white font-medium">{album.artist?.username || 'Unknown Artist'}</span> • {album.musics?.length} tracks
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold mb-4">Tracklist</h3>
        {album.musics?.map((track, index) => (
          <div
            key={track._id || index}
            onClick={() => onPlayTrack(track)}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500 w-6 text-center group-hover:hidden">
                {index + 1}
              </span>
              <Play size={16} className="hidden group-hover:block text-emerald-500" />
              <div className="flex items-center gap-3">
                <Music size={18} className="text-zinc-500" />
                <span className="text-sm font-medium text-zinc-200 group-hover:text-white">
                  {track.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}