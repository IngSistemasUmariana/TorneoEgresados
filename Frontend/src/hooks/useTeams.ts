import { useState, useEffect } from 'react';
import { Team } from '../types';

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>(() => {
    const stored = localStorage.getItem('teams');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  const addTeam = (team: Omit<Team, 'id' | 'registrationDate'>) => {
    const newTeam: Team = {
      ...team,
      id: crypto.randomUUID(),
      registrationDate: new Date().toISOString(),
    };
    setTeams((prev) => [...prev, newTeam]);
    return newTeam;
  };

  const getTeamsBySport = (sport: string) => {
    return teams.filter((team) => team.sport === sport);
  };

  return { teams, addTeam, getTeamsBySport };
};
