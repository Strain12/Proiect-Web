import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './Navbar';
import NotFound from './pages/NotFound';
import About from './pages/About';
import TodoList from './TodoList';
import DataForApi from './DataForApi';
function App() {
 return (
  <div>
    <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/about" element={<About />} />
  </Routes>
 </BrowserRouter>
    
  </div>
 
 );
}
export default App;
