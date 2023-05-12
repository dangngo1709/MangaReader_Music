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
        <Route path="/" element={<Register />} />
        <Route
          path="/homepage"
          element={<Homepage manga={manga} setManga={setManga} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chapterpage"
          element={<ChapterPage manga={manga} setManga={setManga} />}
        />
        <Route
          path="/mangapage"
          element={<MangaPage manga={manga} setManga={setManga} />}
        />
        <Route path="/profilepage" element={<Profile setManga={setManga} />} />
        <Route
          path="/musicplaylist"
          element={<MusicPlaylist setManga={setManga} />}
        />
        <Route
          path="/FavoritesListPage"
          element={<FavoritesListPage manga={manga} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
