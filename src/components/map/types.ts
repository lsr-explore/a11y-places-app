import type React from 'react';

/**
 * Configuration for a map panel button
 */
export interface PanelButtonConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

/**
 * Configuration for a map panel
 */
export interface PanelConfig {
  id: string;
  title: string;
  content: React.ReactNode;
}
