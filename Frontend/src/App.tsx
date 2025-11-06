import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Register } from './pages/RegisterPage';
import { Teams } from './pages/Teams';

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <>
      <Navbar />
      <div className="pt-16">
        {currentPage === 'home' && <Home />}
        {currentPage === 'register' && <Register />}
        {currentPage === 'teams' && <Teams />}
      </div>
    </>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
