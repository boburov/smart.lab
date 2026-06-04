import { useHashRoute } from "../shared/lib/router";
import { directionsById } from "../entities/direction";
import { LandingPage } from "../pages/landing";
import { LabDirectionsPage } from "../pages/lab";
import { ChemistryPage } from "../pages/chemistry";
import { ComingSoonPage } from "../pages/coming-soon";

export default function App() {
  const [route, navigate] = useHashRoute();

  // Live chemistry explorer — full-screen, its own layout.
  if (route === "/lab/chemistry") {
    return <ChemistryPage onNavigate={navigate} />;
  }

  // Planned directions get a "coming soon" placeholder.
  if (route === "/lab/physics") {
    return (
      <ComingSoonPage direction={directionsById.physics} route={route} onNavigate={navigate} />
    );
  }
  if (route === "/lab/electronics") {
    return (
      <ComingSoonPage
        direction={directionsById.electronics}
        route={route}
        onNavigate={navigate}
      />
    );
  }

  // The 3D laboratory: choose a direction.
  if (route === "/lab") {
    return <LabDirectionsPage route={route} onNavigate={navigate} />;
  }

  // Default: the landing page / main menu.
  return <LandingPage route={route} onNavigate={navigate} />;
}
