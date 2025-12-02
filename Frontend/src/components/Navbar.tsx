import { Home, Users, MessageSquare, Trophy, Radio } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { currentPage, navigateTo } = useNavigation();
  const [isLive, setIsLive] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'teams', label: 'Equipos', icon: Users },
    { id: 'torneo', label: 'Torneo', icon: Trophy },
    { id: 'soporte', label: 'Soporte', icon: MessageSquare },
  ];

  useEffect(() => {
    const checkLive = () => {
      const m = JSON.parse(localStorage.getItem("live_match"));
      setIsLive(m && m.live === true);
    };

    checkLive();
    window.addEventListener("storage", checkLive);

    return () => window.removeEventListener("storage", checkLive);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="flex items-center space-x-2 cursor-pointer"
               onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="./logo2.jpg" alt="Logo"
                   className="object-cover w-full h-full rounded-lg" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              Egresados Leyendas
            </span>
          </div>

          {/* BOTONES */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium hidden sm:inline">
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* 🔴 BOTÓN EN VIVO SOLO SI HAY PARTIDO */}
            {isLive && (
              <button
                onClick={() => window.location.href = "/live"}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 text-white shadow-lg animate-pulse"
              >
                <Radio className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">
                  EN VIVO
                </span>
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
