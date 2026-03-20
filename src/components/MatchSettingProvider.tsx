import { useState } from 'react';
import { MatchSettingContext } from '../contexts/MatchSettingContext';

export const MatchSettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playerCount, setPlayerCount] = useState<number>(8);
  const [courtSelection, setCourtSelection] = useState<string[]>(['C1']);

  return (
    <MatchSettingContext
      value={{ playerCount, setPlayerCount, courtSelection, setCourtSelection }}
    >
      {children}
    </MatchSettingContext>
  );
};
