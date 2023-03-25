import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Homepage from "./components/Homepage";
import HotCategories from "./components/HotCategories/HotCategories";


function App() {
  return (
    //<HotCategories />
      <BrowserRouter>
        <a href="/">Register</a><br/>
        <a href="/login">Login</a><br/>
        <a href="/homepage">Homepage</a><br/>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/homepage" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
