import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VoxAIAssistant from './voxAIAssistant';
import PrivacyPolicy from './PrivacyPolicy';
import { useAppStyles } from "./useAppStyles";
import FontDemo from './FontDemo';
import { ThemeProvider } from '../context/ThemeContext'
import { MemoryProvider } from '../context/MemoryContext';
import LandingPage from './LandingPage';

function App() {
  useAppStyles();

  return (
    <ThemeProvider>
      <MemoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<VoxAIAssistant />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/font-demo" element={<FontDemo />} />
          </Routes>
        </Router>
      </MemoryProvider>
    </ThemeProvider>
  );
}

export default App;
