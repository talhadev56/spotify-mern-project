import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Player from './Player';
import UploadModal from './UploadModal';
import CreateAlbumModal from './CreateAlbumModal';
import { Music, Disc, Upload, PlusSquare, LogOut } from 'lucide-react';

export default function Layout({ currentTrack, setCurrentTrack }) {
  const { user, logout } = useAuth();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">
    
      <aside className="w-64 h-screen sticky top-0 bg-zinc-950 p-6 flex flex-col justify-between border-r border-zinc-800 shrink-0">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-emerald-500 tracking-tight">Stopify</h1>
          
        
<div className="text-sm border-b border-zinc-800 pb-4">
  <div className="flex items-center gap-2 flex-wrap text-zinc-400">
    <span>Logged in as:</span>
    <span className="font-semibold text-zinc-100">
      {user?.username || user?.email || 'User'}
    </span>
    <span className="px-2 py-0.5 text-xs bg-zinc-800 text-emerald-400 rounded-full capitalize">
      {user?.role || 'user'}
    </span>
  </div>
</div>



          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              <Music size={18} /> Tracks
            </NavLink>

            <NavLink
              to="/albums"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              <Disc size={18} /> Albums
            </NavLink>
            
          </nav>
        </div>

        

       
        <div className="space-y-3 pt-4 border-t border-zinc-900">
          {user?.role === 'artist' && (
            <>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-black font-semibold py-2.5 rounded-lg hover:bg-emerald-400 transition text-sm cursor-pointer"
              >
                <Upload size={16} /> Upload Track
              </button>

              <button
                onClick={() => setIsAlbumOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold py-2.5 rounded-lg hover:bg-zinc-800 transition text-sm cursor-pointer"
              >
                <PlusSquare size={16} /> Create Album
              </button>
            </>
          )}

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900/80 text-zinc-300 hover:text-red-400 py-2.5 rounded-lg hover:bg-zinc-900 transition text-sm cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 p-8 pb-28 overflow-y-auto">
        <Outlet context={{ onPlayTrack: (track) => setCurrentTrack(track) }} />
      </main>

    
      <Player currentTrack={currentTrack} onClose={() => setCurrentTrack(null)} />

      
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onSuccess={() => window.location.reload()} />
      <CreateAlbumModal isOpen={isAlbumOpen} onClose={() => setIsAlbumOpen(false)} onSuccess={() => window.location.reload()} />
    </div>
  );
}