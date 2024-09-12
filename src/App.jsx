import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VoxAIAssistant from './voxAIAssistant';
import PrivacyPolicy from './PrivacyPolicy';
import { ThemeProvider } from './ThemeContext';
import ScrollToTop from './ScrollToTop';
import './scrollbar.css';

function App() {

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<VoxAIAssistant />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
