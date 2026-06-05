import { useHashRoute } from "../shared/lib/router";
import { directionsById } from "../entities/direction";
import { LandingPage } from "../pages/landing";
import { LabDirectionsPage } from "../pages/lab";
import { ChemistryPage } from "../pages/chemistry";
import { ComingSoonPage } from "../pages/coming-soon";
import { ChemistryLab } from "../pages/chemistry-lab";
import { ElectronicsLabPage } from "../pages/electronics-lab";
import { BiologyPage } from "../pages/biology";
import { AnatomyPage } from "../pages/anatomy";

export default function App() {
  const [route, navigate] = useHashRoute();

  // Interactive 3D bench: pour substances into a vessel and watch reactions.
  if (route === "/lab/chemistry/3d") {
    return <ChemistryLab onNavigate={navigate} />;
  }

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
  // Biology: anatomy explorer is primary; the plant garden lives at /garden.
  if (route === "/lab/biology/garden") {
    return <BiologyPage onNavigate={navigate} />;
  }
  if (route === "/lab/biology") {
    return <AnatomyPage onNavigate={navigate} />;
  }
  if (route === "/lab/electronics") {
    return <ElectronicsLabPage onNavigate={navigate} />;
  }

  // The 3D laboratory: choose a direction.
  if (route === "/lab") {
    return <LabDirectionsPage route={route} onNavigate={navigate} />;
  }

  // Default: the landing page / main menu.
  return <LandingPage route={route} onNavigate={navigate} />;
}
