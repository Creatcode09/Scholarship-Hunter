import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProfileBuilder from './pages/ProfileBuilder';
import DiscoveryHub from './pages/DiscoveryHub';
import ScholarshipDetails from './pages/ScholarshipDetails';
import MentorSession from './pages/MentorSession';
import CommunityHub from './pages/CommunityHub';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<ProfileBuilder />} />
          <Route path="search" element={<DiscoveryHub />} />
          <Route path="details/:id" element={<ScholarshipDetails />} />
          <Route path="mentor/:id" element={<MentorSession />} />
          <Route path="community" element={<CommunityHub />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
