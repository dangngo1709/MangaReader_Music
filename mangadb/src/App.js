import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Homepage from "./components/Homepage";
import HotCategories from "./components/HotCategories/HotCategories";
import MangaPage from "./components/MangaPage";


function App() {
  return (
    //<HotCategories />
      <BrowserRouter>
        <a href="/">Register</a><br/>
        <a href="/login">Login</a><br/>
        <a href="/homepage">Homepage</a><br/>
        <a href="/mangapage">MangaPage</a>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/homepage" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/mangapage" element={<MangaPage/>}/>

        </Routes>
      </BrowserRouter>

  );
}

export default App;
