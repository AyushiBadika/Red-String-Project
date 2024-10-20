import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateEvent from "./pages/CreateEvent";
import Event from "./pages/Event";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
