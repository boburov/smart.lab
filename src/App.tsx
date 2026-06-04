import { useHashRoute } from "./lib/router";
import { directionsById } from "./data/directions";
import LandingPage from "./components/LandingPage";
import LabDirections from "./components/LabDirections";
import ChemistryExplorer from "./components/ChemistryExplorer";
import ComingSoon from "./components/ComingSoon";

export default function App() {
  const [route, navigate] = useHashRoute();

  // Live chemistry explorer — full-screen, its own layout.
  if (route === "/lab/chemistry") {
    return <ChemistryExplorer onNavigate={navigate} />;
  }

  // Planned directions get a "coming soon" placeholder.
  if (route === "/lab/physics") {
    return (
      <ComingSoon direction={directionsById.physics} route={route} onNavigate={navigate} />
    );
  }
  if (route === "/lab/electronics") {
    return (
      <ComingSoon
        direction={directionsById.electronics}
        route={route}
        onNavigate={navigate}
      />
    );
  }

  // The 3D laboratory: choose a direction.
  if (route === "/lab") {
    return <LabDirections route={route} onNavigate={navigate} />;
  }

  // Default: the landing page / main menu.
  return <LandingPage route={route} onNavigate={navigate} />;
}
