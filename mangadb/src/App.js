import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Homepage from "./components/Homepage";
import HotCategories from "./components/HotCategories/HotCategories";


function App() {
  //hi this is Joshua
  return (
    <HotCategories />
    /*
      <BrowserRouter>
        <a href="/">Home page</a><br/>
        <a href="/login">Login</a><br/>
        <a href="/register">Register</a>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      */
  );
}

export default App;
