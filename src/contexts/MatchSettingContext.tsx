import React from 'react';

interface MatchSettingContextType {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  courtSelection: string[];
  setCourtSelection: (courts: string[]) => void;
}

export const MatchSettingContext = React.createContext<MatchSettingContextType>(
  {} as MatchSettingContextType,
);
