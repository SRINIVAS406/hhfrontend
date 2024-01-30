import Home from './Home';
import Login from './Login';
import Register from './Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserProfile from './UserProfile';

function App() {

  return (
    <div >
      <h1>inside App file </h1>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
          <Route path="/profile" element ={<UserProfile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
