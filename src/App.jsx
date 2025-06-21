import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import Tools from './pages/Tools';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="courses" element={<Courses />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="tools" element={<Tools />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 