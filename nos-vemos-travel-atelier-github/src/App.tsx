import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingTravelAssistant from './components/FloatingTravelAssistant';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import Destinos from './pages/Destinos';
import DestinationDetail from './pages/DestinationDetail';
import Experiencias from './pages/Experiencias';

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/destinos/:id" element={<DestinationDetail />} />
        <Route path="/experiencias" element={<Experiencias />} />
      </Routes>
      <FloatingTravelAssistant />
      <Footer />
    </>
  );
};

export default App;
