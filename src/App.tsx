import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddPlace from './pages/AddPlace';
import AddPlaceInaccessible from './pages/AddPlaceInaccessible';
import Home from './pages/Home';
import Places from './pages/Places';
import PlacesInaccessible from './pages/PlacesInaccessible';
import { StorageContext, type StorageAPI } from './utils/storageApi';
import { deletePlace, getPlaces } from './utils/storage';

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

// Default storage API
const defaultStorageAPI: StorageAPI = {
  getPlaces,
  deletePlace,
};

function App() {
  // Check if there's a mock storage API set by tests (e.g., Playwright)
  const storageAPI = (window as any).mockStorageAPI || defaultStorageAPI;

  return (
    <StorageContext.Provider value={storageAPI}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
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
    </StorageContext.Provider>
  );
}

export default App;
