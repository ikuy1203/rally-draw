import { useLocation, useNavigate } from 'react-router-dom';
import {
  Leaderboard as LeaderboardIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

export const NavigationBar = () => {
  const location = useLocation();

  const navValue = location.pathname === '/match' ? 'leaderboard' : 'settings';
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(_, newValue) =>
          void navigate(newValue === 'leaderboard' ? '/match' : '/settings')
        }
      >
        <BottomNavigationAction
          label="対戦表"
          value="leaderboard"
          icon={<LeaderboardIcon />}
          onClick={() => void navigate('/match')}
        />
        <BottomNavigationAction
          label="設定"
          value="settings"
          icon={<SettingsIcon />}
          onClick={() => void navigate('/settings')}
        />
      </BottomNavigation>
    </Paper>
  );
};
