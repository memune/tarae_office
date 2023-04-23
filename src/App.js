import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemoList from './components/MemoList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemoList />} />
      </Routes>
    </Router>
  );
}

export default App;
