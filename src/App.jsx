import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects/:slug" element={<ProjectDetail />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Layout>;
}
