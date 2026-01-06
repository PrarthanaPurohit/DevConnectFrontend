import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
    {/* Routing */}
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body />} >
        {/* children routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
