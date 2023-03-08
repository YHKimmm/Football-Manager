import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PremierLeague from "./pages/./leagues/PremierLeague";
import LaLiga from "./pages/./leagues/LaLiga";
import SerieA from "./pages/leagues/SerieA";
import Ligue1 from "./pages/leagues/Ligue1";
import Bundesliga from "./pages/leagues/Bundesliga";
import PlayerList from "./pages/PlayerList";
import Header from "./components/Header";
import About from "./pages/About";
import SignUp from "./pages/auth/SignUp";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* League Routes */}
        <Route path="/premier-league" element={<PremierLeague />} />
        <Route path="/la-liga" element={<LaLiga />} />
        <Route path="/serie-a" element={<SerieA />} />
        <Route path="/ligue-1" element={<Ligue1 />} />
        <Route path="/bundesliga" element={<Bundesliga />} />
        <Route path="/teams/:id" element={<PlayerList />} />

        {/* Auth Routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App
