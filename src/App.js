import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import SearchPage from "./components/SearchPage";
import SignIn from "./components/SignIn";
import WatchLater from "./components/WatchLater";
import SingleMovie from "./components/SingleMovie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/:name" element={<SearchPage />} />
        <Route path="/:name/:id" element={<SingleMovie />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/account/watchlater" element={<WatchLater />} />
        <ToastContainer />
      </Routes>
    </>
  );
}

export default App;
