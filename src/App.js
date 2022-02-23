import Home from './pages/Home';
import Cities from './pages/Cities';
import NavbarMain from './components/NavBar'
import FooterMain from './components/Footer'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Error404 from './components/Error404'


function App() {
  return (
    <BrowserRouter>
    
    <NavbarMain/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cities' element={<Cities/>}/>
      <Route path='*' element={<Error404/>}/>

    </Routes>
    <FooterMain/>
    </BrowserRouter>
  );
}

export default App;
