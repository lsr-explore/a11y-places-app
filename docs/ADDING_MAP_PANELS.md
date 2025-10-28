# Adding New Map Panels

The map now uses a flexible panel system that makes it easy to add new side panels. This guide shows you how to add your own panels.

## 📋 Overview

The panel system consists of:
- **Panel buttons** in the top-right corner (next to zoom controls)
- **Panel drawers** that slide in from the right, pushing the map content left
- **Collapse/Expand arrow button** on the left edge of each panel (like WatchDuty!)
- **Automatic management** of which panel is open (only one at a time)

### ✨ Built-in Panel Features

Each panel automatically includes:
- ✅ **Arrow button** on the left edge to collapse/expand (styled as a rounded tab facing outward)
- ✅ **Full-height drawer** that pushes map content
- ✅ **Smooth animations** when opening/closing/collapsing
- ✅ **Keyboard accessible** (Tab, Enter, Escape)
- ✅ **Screen reader support** with ARIA labels and announcements
- ✅ **Focus management** (auto-focus close button on open)

**Collapse/Expand Behavior:**
- **Expanded**: Full 320px width showing all content
- **Collapsed**: Narrow 40px strip showing just the arrow button
- Click the arrow anytime to toggle between states
- Arrow button is styled as a tab with rounded left edges that protrudes from the panel
- Map automatically adjusts its width with smooth animation
- Opening a panel via the panel button always starts in expanded state

## 🎯 How to Add a New Panel

### Step 1: Create Your Panel Content Component

Create a new component for your panel's content in `src/components/map/`:

```tsx
// src/components/map/YourPanelContent.tsx
import { Box, Typography } from '@mui/material';
import type React from 'react';

const YourPanelContent: React.FC = () => {
  return (
    <Box>
      <Typography variant="body1">
        Your panel content goes here!
      </Typography>
      {/* Add your custom content */}
    </Box>
  );
};

export default YourPanelContent;
```

**Tips for panel content:**
- Keep it simple and focused
- Use Material-UI components for consistency
- Make sure it's keyboard accessible
- Consider mobile screen sizes

### Step 2: Import an Icon

Choose an icon from Material-UI Icons for your button:

```tsx
// At the top of src/pages/Map.tsx
import YourIcon from '@mui/icons-material/YourIconName';
```

Browse available icons: [Material Icons](https://mui.com/material-ui/material-icons/)

### Step 3: Add Your Panel Button

In `src/pages/Map.tsx`, add a new button to the `panelButtons` array:

```tsx
const panelButtons: PanelButtonConfig[] = useMemo(
  () => [
    {
      id: 'legend',
      label: 'Legend',
      icon: <MapIcon fontSize="small" />,
      ariaLabel: 'Toggle legend panel',
    },
    // 👇 Add your new button here
    {
      id: 'your-panel',  // Unique ID for your panel
      label: 'Your Panel',  // Label shown under icon (keep it short!)
      icon: <YourIcon fontSize="small" />,
      ariaLabel: 'Toggle your panel',  // Screen reader description
    },
  ],
  [],
);
```

### Step 4: Add Your Panel Configuration

Still in `src/pages/Map.tsx`, add your panel to the `panels` array:

```tsx
const panels: PanelConfig[] = useMemo(
  () => [
    {
      id: 'legend',
      title: 'Legend',
      content: <LegendContent />,
    },
    // 👇 Add your new panel here
    {
      id: 'your-panel',  // Must match the button ID!
      title: 'Your Panel Title',  // Title shown in panel header
      content: <YourPanelContent />,  // Your content component
    },
  ],
  [],
);
```

**Important:** The `id` in both the button and panel configs must match!

### Step 5: Done! 🎉

That's it! Your new panel will:
- ✅ Appear as a button in the top-right corner
- ✅ Open as a drawer when clicked
- ✅ Push the map content left when open
- ✅ Close when clicking the X or clicking the button again
- ✅ Work with keyboard navigation (Tab, Enter, Escape)
- ✅ Announce to screen readers

## 📝 Complete Example

Here's a complete example adding a "Layers" panel:

### 1. Create the content component:

```tsx
// src/components/map/LayersContent.tsx
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

const LayersContent: React.FC = () => {
  const [layers, setLayers] = useState({
    traffic: true,
    transit: false,
    satellite: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLayers({
      ...layers,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <Typography variant="body2" gutterBottom>
        Toggle map layers on or off
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={layers.traffic} onChange={handleChange} name="traffic" />}
          label="Traffic"
        />
        <FormControlLabel
          control={<Checkbox checked={layers.transit} onChange={handleChange} name="transit" />}
          label="Public Transit"
        />
        <FormControlLabel
          control={<Checkbox checked={layers.satellite} onChange={handleChange} name="satellite" />}
          label="Satellite View"
        />
      </FormGroup>
    </>
  );
};

export default LayersContent;
```

### 2. Update Map.tsx:

```tsx
// Add imports at the top
import LayersIcon from '@mui/icons-material/Layers';
import LayersContent from '../components/map/LayersContent';

// Add to panelButtons array
const panelButtons: PanelButtonConfig[] = useMemo(
  () => [
    {
      id: 'legend',
      label: 'Legend',
      icon: <MapIcon fontSize="small" />,
      ariaLabel: 'Toggle legend panel',
    },
    {
      id: 'layers',
      label: 'Layers',
      icon: <LayersIcon fontSize="small" />,
      ariaLabel: 'Toggle layers panel',
    },
  ],
  [],
);

// Add to panels array
const panels: PanelConfig[] = useMemo(
  () => [
    {
      id: 'legend',
      title: 'Legend',
      content: <LegendContent />,
    },
    {
      id: 'layers',
      title: 'Map Layers',
      content: <LayersContent />,
    },
  ],
  [],
);
```

## 🎨 Styling Tips

### Panel Width
The drawer width is `320px` by default. To change it, edit `DRAWER_WIDTH` in `src/components/map/MapPanel.tsx`.

### Panel Content Scrolling
The panel content area automatically scrolls if it's too long. The header stays fixed at the top.

### Spacing
Use Material-UI's `Box` component with `sx` props for consistent spacing:

```tsx
<Box sx={{ mb: 3 }}>  {/* margin-bottom: 24px */}
  <Typography>Content</Typography>
</Box>
```

## ♿ Accessibility Best Practices

All panels are automatically accessible, but follow these guidelines for your content:

### ✅ Do:
- Use semantic HTML elements
- Provide descriptive labels for interactive elements
- Test with keyboard only (Tab, Enter, Escape)
- Test with a screen reader
- Ensure sufficient color contrast
- Use ARIA labels where appropriate

### ❌ Don't:
- Disable keyboard navigation
- Use `div` with `onClick` (use `button` instead)
- Forget alt text on images
- Use color alone to convey information

## 🔧 Advanced: Passing Data to Panels

If your panel needs data from the map (like current zoom level), you can pass props:

```tsx
const panels: PanelConfig[] = useMemo(
  () => [
    {
      id: 'info',
      title: 'Map Info',
      content: <MapInfoContent currentZoom={currentZoom} center={viewState} />,
    },
  ],
  [currentZoom, viewState],  // Add dependencies here!
);
```

## 🐛 Troubleshooting

### Panel button doesn't appear
- Check that you added it to the `panelButtons` array
- Verify there are no syntax errors

### Panel doesn't open
- Make sure the button `id` matches the panel `id`
- Check browser console for errors

### Content doesn't show
- Verify your content component exports correctly
- Check that you imported it in Map.tsx

### Panel looks weird on mobile
- The panel automatically becomes full-screen on mobile
- Test your content at narrow widths

## 📚 Related Files

- `src/pages/Map.tsx` - Main map page (add buttons and panels here)
- `src/components/map/MapPanel.tsx` - Generic panel container
- `src/components/map/MapControls.tsx` - Controls container
- `src/components/map/PanelButton.tsx` - Panel button component
- `src/components/map/types.ts` - TypeScript types

---

Happy panel building! 🎉
