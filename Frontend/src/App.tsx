import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import AppToolbar from '@/components/AppToolbar/AppToolbar';
import Login from '@/containers/Login/Login';
import { theme } from '@/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<>Home page</>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default App;
