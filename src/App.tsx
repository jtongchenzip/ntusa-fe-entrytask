import './App.css';

import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import PostContent from './pages/PostContent';
import PostList from './pages/PostList';

function App() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-200 h-screen pt-3 flex flex-col">
      <nav className="bg-cyan-700 p-6 pt-5 mx-3 mb-6 rounded-md shadow-md">
        <button
          className="text-center text-3xl font-black text-gray-100"
          onClick={() => navigate('/')}>
          Blug
        </button>
      </nav>
      <main className="px-6 w-4/5 self-center">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<PostContent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
