import React from "react";

import NavBar from "./components/NavBar";
import Foot from "./components/Foot";

import Home from "./pages/Home";
import Resource from "./pages/Resource";
import Event from "./pages/Event";
import Teams from "./pages/Teams";
import Hackathon from "./pages/Hackathon";
import EventDetails from "./pages/EventDetails";
import Member from "./pages/Member";

import AlgoHome from "./algorithm8.0/pages/AlgoHome";
import SignIn from "./algorithm8.0/pages/SignIn";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';

import Register from "./algorithm8.0/pages/Registration";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Analytics />
        <Routes>
          <Route path="/algorithm" element={<AlgoHome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<DefaultContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const DefaultContainer = () => (
  <div className="w-[100vw]">
    <NavBar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/events" element={<Event />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/eventdetails" element={<EventDetails />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/member" element={<Member />} />
        <Route path="/hackathon" element={<Hackathon />} />
      </Routes>
    <Foot />
  </div>
)
