import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Homepage from "./components/Homepage";
import MangaPage from "./components/MangaPage";
import FavoritesListPage from "./components/FavoritesListPage";
import {useState} from 'react';
import "./css/homepage.css";

function App() {
  const [manga, setManga] = useState(null);
  return (
    <>


    <BrowserRouter>
        <a href="/">Register</a><br/>
        <a href="/login">Login</a><br/>
        <a href="/homepage">Homepage</a><br/>
        <a href="/mangapage">MangaPage</a>
        <a href="/FavoritesListPage">FavoritesListPage</a>

        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/homepage" element={<Homepage manga={manga} setManga={setManga}/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="/mangapage" element={<MangaPage manga={manga} />}/>
          <Route path="/FavoritesListPage" element={<FavoritesListPage manga={manga} />}/>
        </Routes>
      </BrowserRouter>

              
              </>

  );
}

export default App;
