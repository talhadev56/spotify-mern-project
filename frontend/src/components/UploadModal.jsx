import { useState } from 'react';
import api from '../api/axios';

export default function UploadModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('music', file);

    try {
      setLoading(true);
      await api.post('/music/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Track uploaded successfully!');
      setTitle('');
      setFile(null);
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">Upload New Track</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Track Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="Enter song title"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-emerald-500 file:text-black file:font-semibold hover:file:bg-emerald-400 cursor-pointer"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
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
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}