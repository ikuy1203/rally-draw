import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bolt as BoltIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { MAX_PLAYERS, MIN_PLAYERS } from '@/consts/players.const';
import { useMatchSetting } from '@/contexts/MatchSettingContext';
import { useTouchMouseGuard } from '@/hooks/useTouchMouseGuard';

interface CourtConfig {
  id: string;
  label: string;
  enabled: boolean;
}

const COURTS_CONFIG: CourtConfig[] = [
  { id: 'C1', label: 'C1', enabled: true },
  { id: 'C2', label: 'C2', enabled: true },
  { id: 'C3', label: 'C3', enabled: false },
  { id: 'C4', label: 'C4', enabled: false },
  { id: 'C5', label: 'C5', enabled: false },
  { id: 'C6', label: 'C6', enabled: false },
];

const ALL_ENABLED_COURTS = COURTS_CONFIG.filter((court) => court.enabled).map(
  (court) => court.id,
);

export const SettingPage = () => {
  const {
    playerCount,
    setPlayerCount,
    courtSelection,
    setCourtSelection,
    setRound,
  } = useMatchSetting();
  const [formPlayerCount, setFormPlayerCount] = useState(playerCount);
  const [formCourtSelection, setFormCourtSelection] = useState(courtSelection);

  const navigate = useNavigate();
  const { shouldIgnore } = useTouchMouseGuard();

  const isAllCourtsSelected = ALL_ENABLED_COURTS.every((courtId) =>
    formCourtSelection.includes(courtId),
  );

  const handlePlayerCountChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value) || shouldIgnore(event)) return;
    setFormPlayerCount(value);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Stack spacing={4}>
          {/* Player Count Section */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6">参加人数設定</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="h4"
                  color="primary"
                  component="span"
                  sx={{ fontWeight: 800 }}
                >
                  {formPlayerCount}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ ml: 1, verticalAlign: 'middle' }}
                >
                  PLAYERS
                </Typography>
              </Box>
            </Box>
            <Box sx={{ py: 0, px: 1 }}>
              <Slider
                value={formPlayerCount}
                onChange={handlePlayerCountChange}
                min={MIN_PLAYERS}
                max={MAX_PLAYERS}
                valueLabelDisplay="auto"
              />
            </Box>
          </Box>

          {/* Court Selection Section */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography variant="overline" sx={{ fontWeight: 700 }}>
                使用コート選択
              </Typography>
              {isAllCourtsSelected ? (
                <Button
                  size="small"
                  onClick={() => {
                    setFormCourtSelection([]);
                  }}
                >
                  全解除
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() => {
                    setFormCourtSelection([...ALL_ENABLED_COURTS]);
                  }}
                >
                  全選択
                </Button>
              )}
            </Box>
            <Grid container spacing={2}>
              {COURTS_CONFIG.map((court) => (
                <Grid size={4} key={`settings-court-${court.id}`}>
                  <Button
                    fullWidth
                    variant={
                      formCourtSelection.includes(court.id)
                        ? 'contained'
                        : 'outlined'
                    }
                    color={
                      formCourtSelection.includes(court.id)
                        ? 'primary'
                        : 'inherit'
                    }
                    sx={{
                      aspectRatio: '1/1',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                    }}
                    onClick={() =>
                      setFormCourtSelection((prev) =>
                        prev.includes(court.id)
                          ? prev.filter((c) => c !== court.id)
                          : [...prev, court.id],
                      )
                    }
                    disabled={!court.enabled}
                    aria-pressed={formCourtSelection.includes(court.id)}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      {court.label}
                    </Typography>
                    <Typography variant="caption">
                      {!court.enabled
                        ? 'Unavailable'
                        : formCourtSelection.includes(court.id)
                          ? 'Active'
                          : 'Disabled'}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>

      {/* Generate Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 100,
          left: 0,
          right: 0,
          px: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          sx={{ width: '100%', maxWidth: 400, height: 56 }}
          disabled={formCourtSelection.length === 0}
          onClick={() => {
            setPlayerCount(formPlayerCount);
            setCourtSelection(formCourtSelection);
            setRound(0);
            void navigate('/match');
          }}
        >
          試合開始
          <BoltIcon sx={{ ml: 1, color: 'secondary.main' }} />
        </Fab>
      </Box>
    </>
  );
};
