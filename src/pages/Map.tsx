import MapIcon from '@mui/icons-material/Map';
import { Box } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Map as MapGL, NavigationControl, type MapRef } from 'react-map-gl/mapbox';
import MapLogin from '../components/MapLogin';
import LegendContent from '../components/map/LegendContent';
import MapControls from '../components/map/MapControls';
import MapPanel, { COLLAPSED_WIDTH, DRAWER_WIDTH } from '../components/map/MapPanel';
import type { PanelButtonConfig, PanelConfig } from '../components/map/types';
import { isAuthenticated, setAuthenticated } from '../utils/auth';

// Los Angeles coordinates
const LA_CENTER = {
  longitude: -118.2437,
  latitude: 34.0522,
};

const INITIAL_VIEW_STATE = {
  ...LA_CENTER,
  zoom: 10,
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MapPage: React.FC = () => {
  const [authenticated, setAuthenticatedState] = useState(isAuthenticated());
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [activePanelId, setActivePanelId] = useState<string | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const [currentZoom, setCurrentZoom] = useState(INITIAL_VIEW_STATE.zoom);

  // Screen reader announcements
  const [announcement, setAnnouncement] = useState('');

  // Define panel buttons - add more buttons here to add new panels!
  const panelButtons: PanelButtonConfig[] = useMemo(
    () => [
      {
        id: 'legend',
        label: 'Legend',
        icon: <MapIcon fontSize="small" />,
        ariaLabel: 'Toggle legend panel',
      },
      // Add more panel buttons here in the future!
      // Example:
      // {
      //   id: 'layers',
      //   label: 'Layers',
      //   icon: <LayersIcon fontSize="small" />,
      //   ariaLabel: 'Toggle layers panel',
      // },
    ],
    [],
  );

  // Define panel configurations - add more panels here!
  const panels: PanelConfig[] = useMemo(
    () => [
      {
        id: 'legend',
        title: 'Legend',
        content: <LegendContent />,
      },
      // Add more panels here in the future!
      // Example:
      // {
      //   id: 'layers',
      //   title: 'Map Layers',
      //   content: <LayersContent />,
      // },
    ],
    [],
  );

  // Handle authentication
  const handleAuthenticated = useCallback(() => {
    setAuthenticated(true);
    setAuthenticatedState(true);
    setAnnouncement('Map access granted');
  }, []);

  // Announce zoom changes to screen readers
  useEffect(() => {
    if (authenticated) {
      const zoomLevel = Math.round(currentZoom);
      setAnnouncement(`Zoom level ${zoomLevel}`);
    }
  }, [currentZoom, authenticated]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const currentZoom = map.getZoom();
      map.zoomTo(currentZoom + 1, { duration: 300 });
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const currentZoom = map.getZoom();
      map.zoomTo(currentZoom - 1, { duration: 300 });
    }
  }, []);

  // Panel toggle - clicking the same panel closes it, clicking a different panel switches to it
  const handlePanelToggle = useCallback(
    (panelId: string) => {
      setActivePanelId((prev) => {
        const newPanelId = prev === panelId ? null : panelId;
        const panel = panels.find((p) => p.id === panelId);
        if (newPanelId) {
          setAnnouncement(`${panel?.title || 'Panel'} opened`);
          setIsPanelCollapsed(false); // Reset collapsed state when opening new panel
        } else {
          setAnnouncement(`${panel?.title || 'Panel'} closed`);
          setIsPanelCollapsed(false);
        }
        return newPanelId;
      });
    },
    [panels],
  );

  // Handle panel collapsed state changes
  const handlePanelCollapsedChange = useCallback((collapsed: boolean) => {
    setIsPanelCollapsed(collapsed);
    setAnnouncement(collapsed ? 'Panel collapsed' : 'Panel expanded');
  }, []);

  // Track zoom changes
  const handleMove = useCallback((evt: any) => {
    setViewState(evt.viewState);
    setCurrentZoom(evt.viewState.zoom);
  }, []);

  // Show login if not authenticated
  if (!authenticated) {
    return <MapLogin onAuthenticated={handleAuthenticated} />;
  }

  // Show error if no Mapbox token
  if (!MAPBOX_TOKEN) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: 3,
        }}
      >
        <Box sx={{ textAlign: 'center', maxWidth: 600 }}>
          <h1>Configuration Error</h1>
          <p>
            Mapbox token is not configured. Please add your <code>REACT_APP_MAPBOX_TOKEN</code> to
            your <code>.env.local</code> file.
          </p>
          <p>
            Get your token from:{' '}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://account.mapbox.com/access-tokens/
            </a>
          </p>
        </Box>
      </Box>
    );
  }

  const isPanelOpen = activePanelId !== null;
  const panelWidth = isPanelCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* Screen reader announcements */}
      <Box
        role="status"
        aria-live="polite"
        aria-atomic="true"
        sx={{
          position: 'absolute',
          left: -10000,
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        {announcement}
      </Box>

      {/* Map container - adjusts width when panel is open or collapsed */}
      <Box
        sx={{
          position: 'relative',
          width: isPanelOpen ? `calc(100% - ${panelWidth}px)` : '100%',
          height: '100%',
          transition: 'width 0.3s ease-in-out',
        }}
      >
        {/* Map */}
        <MapGL
          ref={mapRef}
          {...viewState}
          onMove={handleMove}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
          attributionControl={true}
        >
          {/* Built-in navigation control (bottom right) */}
          <NavigationControl position="bottom-right" showCompass={true} showZoom={false} />
        </MapGL>

        {/* Custom controls */}
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          currentZoom={currentZoom}
          panelButtons={panelButtons}
          activePanelId={activePanelId}
          onPanelToggle={handlePanelToggle}
        />
      </Box>

      {/* Render all panels */}
      {panels.map((panel) => (
        <MapPanel
          key={panel.id}
          isOpen={activePanelId === panel.id}
          onClose={() => setActivePanelId(null)}
          title={panel.title}
          panelId={`panel-${panel.id}`}
          onCollapsedChange={handlePanelCollapsedChange}
        >
          {panel.content}
        </MapPanel>
      ))}
    </Box>
  );
};

export default MapPage;
