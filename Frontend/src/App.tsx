import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavigationProvider, useNavigation } from "./context/NavigationContext";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Teams } from "./pages/Teams";
import { Soporte } from "./pages/Soporte";
import { Register } from "./pages/RegisterPage";
import TournamentBracket from "./pages/TournamentBracket";

import { AdminLivePanel } from "./pages/AdminLivePanel.tsx";
import { UserLiveViewerBigScreen } from "./pages/UserLiveViewerBigScreen.tsx";

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <>
      <Navbar />

      <div className="pt-16">
        {currentPage === "home" && <Home />}
        {currentPage === "teams" && <Teams />}
        {currentPage === "soporte" && <Soporte />}
        {currentPage === "torneo" && <TournamentBracket />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />

          {/* INSCRIPCIÓN */}
          <Route path="/register" element={<Register />} />

          {/* TORNEO POR URL */}
          <Route path="/torneo" element={<TournamentBracket />} />

          {/* ADMIN LIVE PANEL */}
          <Route path="/adminlive" element={<AdminLivePanel />} />

          {/* PANTALLA GIGANTE */}
          <Route path="/live" element={<UserLiveViewerBigScreen />} />
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
}
