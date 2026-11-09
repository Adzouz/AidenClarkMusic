import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import RouteChangeEffects from './components/Elements/RouteChangeEffects';
import Header from './components/Elements/Header';
import About from './components/Pages/About';
import Home from './components/Pages/Home';
import Music from './components/Pages/Music';

const App = () => (
  <main>
    <BrowserRouter>
      <RouteChangeEffects />
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/music/*" element={<Music />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  </main>
);

export default App;
