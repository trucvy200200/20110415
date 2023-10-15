
import './App.css';
import { useEffect } from 'react'
import PostList from './pages'
import { Routes, Route } from "react-router-dom"
import Detail from "./pages/detail"

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll(".sect");
    sections.forEach((sec) => {
      const id = sec.getAttribute("id");
      if (id !== "home")
        document.querySelector("#header").classList.add("active");
    });
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<PostList />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
