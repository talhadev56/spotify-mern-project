import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Albums from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="albums" element={<Albums />} />
        <Route
          path="albums/:albumId"
          element={<AlbumDetail onPlayTrack={(track) => setCurrentTrack(track)} />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}