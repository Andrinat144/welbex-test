import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import AppToolbar from '@/components/AppToolbar/AppToolbar';
import HomePage from '@/containers/HomePage/HomePage';
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
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default App;
