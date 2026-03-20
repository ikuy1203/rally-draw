import React, { type Dispatch, useContext } from 'react';

interface MatchSettingContextType {
  playerCount: number;
  setPlayerCount: Dispatch<React.SetStateAction<number>>;
  courtSelection: string[];
  setCourtSelection: Dispatch<React.SetStateAction<string[]>>;
  round: number;
  setRound: Dispatch<React.SetStateAction<number>>;
}

export const MatchSettingContext = React.createContext<
  MatchSettingContextType | undefined
>(undefined);

export const useMatchSetting = () => {
  const context = useContext(MatchSettingContext);

  if (!context) {
    throw new Error(
      'useMatchSetting must be used within a MatchSettingProvider',
    );
  }

  return context;
};
