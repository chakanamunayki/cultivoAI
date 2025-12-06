import React from 'react';

export enum AnimationStage {
  Hidden = 0,
  Seed = 1,      // 0s - 1s
  Sprout = 2,    // 1s - 2s
  Branches = 3,  // 2s - 3.5s
  SubBranches = 4, // 3.5s - 5s
  Success = 5,   // 5s - 6s
  Hold = 6       // 6s - 8s
}

export interface NodeConfig {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  color: string;
  stage: AnimationStage;
}