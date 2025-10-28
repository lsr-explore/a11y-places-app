// PanelButton.tsx (or wherever the edge button is)

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';

export function PanelPullTab({
  open,
  onClick,
  label = 'Toggle legend panel',
}: {
  open: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <IconButton
      aria-label={label}
      aria-expanded={open}
      onClick={onClick}
      // place inside the Drawer; this styles it to look like your screenshot
      sx={(theme) => ({
        position: 'absolute',
        top: 'calc(50% - 30px)', // 60px tall -> center
        left: -24, // hang 24px outside the panel
        height: 60,
        width: 25,
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        boxShadow: '0 2px 24px 2px rgba(0,0,0,0.10)',
        // make the outer edge a rounded “bulge”
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        clipPath: 'inset(-32px 0px -32px -32px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',

        // good touch target + focus
        minWidth: 44,
        minHeight: 44,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      })}
    >
      {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  );
}
