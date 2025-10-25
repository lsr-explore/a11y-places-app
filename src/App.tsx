import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddPlace from './pages/AddPlace';
import AddPlaceInaccessible from './pages/AddPlaceInaccessible';
import Home from './pages/Home';
import Places from './pages/Places';
import PlacesInaccessible from './pages/PlacesInaccessible';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/add" element={<AddPlace />} />
            <Route path="/places/edit/:id" element={<AddPlace />} />
            <Route path="/places-inaccessible" element={<PlacesInaccessible />} />
            <Route path="/places-inaccessible/add" element={<AddPlaceInaccessible />} />
            <Route path="/places-inaccessible/edit/:id" element={<AddPlaceInaccessible />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
