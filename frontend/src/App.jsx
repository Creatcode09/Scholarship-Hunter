import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProfileBuilder from './pages/ProfileBuilder';
import DiscoveryHub from './pages/DiscoveryHub';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<ProfileBuilder />} />
          <Route path="search" element={<DiscoveryHub />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
