import { AppBar, Box, Grid2, Stack, Toolbar, Typography } from '@mui/material';

import { useAppToolbar } from '@/components/AppToolbar/useAppToolbar';
import CustomButton from '@/components/UI/Button/CustomButton';

const AppToolbar = () => {
  const { handleLogout, name, navigate } = useAppToolbar();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid2 container style={{ width: '100%' }} justifyContent="space-between" alignItems="center">
            <Grid2 size="auto">
              <Typography variant="h5">Мой блог</Typography>
            </Grid2>
            <Stack direction={'row'} gap={2}>
              {name ? (
                <>
                  <Typography variant="h5">{name}</Typography>
                  <CustomButton theme="secondary" onClick={handleLogout}>
                    Выйти
                  </CustomButton>
                </>
              ) : (
                <CustomButton theme="secondary" onClick={() => navigate({ pathname: '/login' })}>
                  Войти
                </CustomButton>
              )}
            </Stack>
          </Grid2>
        </Toolbar>
      </AppBar>
      <Box component={Toolbar} marginBottom={2} />
    </>
  );
};

export default AppToolbar;
