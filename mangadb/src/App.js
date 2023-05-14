import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MangaPage from "./components/MangaPage";
import FavoritesListPage from "./components/FavoritesListPage";
import { useEffect, useState } from "react";
import Profile from "./components/Profile.js";
import ChapterPage from "./components/ChapterPage";
import MusicPlaylist from "./components/MusicPlaylist";
function App() {
  const [manga, setManga] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        // default path to our project is the register page
        <Route path="/" element={<Register />} />
        // path to homepage
        <Route
          path="/homepage"
          element={<Homepage manga={manga} setManga={setManga} />}
        />
        // path to login page
        <Route path="/login" element={<Login />} />
        // path to chapter page
        <Route
          path="/chapterpage"
          element={<ChapterPage manga={manga} setManga={setManga} />}
        />
        // path to manga page
        <Route
          path="/mangapage"
          element={<MangaPage manga={manga} setManga={setManga} />}
        />
        // path to profile page
        <Route path="/profilepage" element={<Profile setManga={setManga} />} />
        // path to music playlist page
        <Route
          path="/musicplaylist"
          element={<MusicPlaylist setManga={setManga} />}
        />
        // path to favorites list page
        <Route
          path="/FavoritesListPage"
          element={<FavoritesListPage manga={manga} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
