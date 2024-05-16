import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { GameCategory } from './Pages/GameCategory';
import { Games } from './Pages/Games';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import pc_banner from './Components/Assets/Banners/pc_banner.png'
import ps_banner from './Components/Assets/Banners/ps_banner.png'
import xbox_banner from './Components/Assets/Banners/xbox_banner.png'
import nintendo_banner from './Components/Assets/Banners/nintendo_banner.png'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/pc' element={<GameCategory  category="Pc" />}/>
        <Route path='/ps' element={<GameCategory  category="Ps"/>}/>
        <Route path='/xbox' element={<GameCategory  category="Xbox"/>}/>
        <Route path='/nintendo' element={<GameCategory  category="Nintendo"/>}/>
        <Route path='/game' element={<Games/>}>
          <Route path=':gameId' element={<Games/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
