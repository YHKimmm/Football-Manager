import { Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home";

// Header
import Header from "./components/Header";

// About
import About from "./pages/About";

// Terms and Condition
import TermsAndCondition from "./pages/TermsAndCondition";

// League Routes
import League from "./pages/football-api/League";
import PremierLeague from "./pages/football-api/leagues/PremierLeague";
import LaLiga from "./pages/football-api/leagues/LaLiga";
import SerieA from "./pages/football-api/leagues/SerieA";
import Ligue1 from "./pages/football-api/leagues/Ligue1";
import Bundesliga from "./pages/football-api/leagues/Bundesliga";
import Eredivisie from "./pages/football-api/leagues/Eredivisie";
import PlayerList from "./pages/football-api/PlayerList";
import TeamSquad from "./pages/football-api/TeamSquad";

// Auth Routes
import SignUp from "./pages/auth/SignUp";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/profile/Profile";

// Team Routes
import CreateTeam from "./pages/team/CreateTeam";
import LockerRoom from "./pages/team/LockerRoom";
import GetTeamInfo from "./pages/team/GetTeamInfo";

// Player Routes
import CreatePlayer from "./pages/player/CreatePlayer";

import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-and-condition" element={<TermsAndCondition />} />
        <Route path="/league" element={<League />} />

        {/* League Routes */}
        <Route path="/premier-league" element={<PremierLeague />} />
        <Route path="/la-liga" element={<LaLiga />} />
        <Route path="/serie-a" element={<SerieA />} />
        <Route path="/ligue-1" element={<Ligue1 />} />
        <Route path="/bundesliga" element={<Bundesliga />} />
        <Route path="/eredivisie" element={<Eredivisie />} />
        <Route path="/teams/:id" element={<PlayerList />} />
        <Route path="/teams/:id/current-squad" element={<TeamSquad />} />

        {/* Auth Routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Profile Routes */}
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <SignIn />} />

        {/* Team Routes */}
        <Route path="/create-team" element={isAuthenticated ? <CreateTeam /> : <SignIn />} />
        <Route path="/locker-room" element={isAuthenticated ? <LockerRoom /> : <SignIn />} />
        <Route path="/team/:id" element={isAuthenticated ? <GetTeamInfo /> : <SignIn />} />

        {/* Player Routes */}
        <Route path="/team/:id/create-player" element={isAuthenticated ? <CreatePlayer /> : <SignIn />} />
      </Routes>
    </div>
  );
}

export default App
