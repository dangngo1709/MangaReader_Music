import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MangaPage from "./components/MangaPage";
import { useEffect, useState } from "react";
import Profile from "./components/Profile.js";
import ChapterPage from "./components/ChapterPage";
import MusicPlaylist from "./components/MusicPlaylist";
function App() {
  const [manga, setManga] = useState(null);
  return (
    //<HotCategories />
    <BrowserRouter>
      <a href="/">Register</a>
      <br />
      <a href="/login">Login</a>
      <br />
      <a href="/homepage">Homepage</a>
      <br />
      <a href="/mangapage">MangaPage</a>
      <br />
      <a href="/profilepage">ProfilePage</a>
      <br />
      <a href="/musicplaylist">MusicPlaylist</a>
      <br />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/homepage"
          element={<Homepage manga={manga} setManga={setManga} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/chapterpage" element={<ChapterPage manga={manga} />} />
        <Route path="/mangapage" element={<MangaPage manga={manga} />} />
        <Route path="/profilepage" element={<Profile />} />
        <Route path="/musicplaylist" element={<MusicPlaylist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
