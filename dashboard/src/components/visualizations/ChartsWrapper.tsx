"use client";

import dynamic from 'next/dynamic';

export const TimelineChart = dynamic(
  () => import('./Charts').then(mod => mod.TimelineChart),
  { ssr: false }
);

export const CategoryRadarChart = dynamic(
  () => import('./Charts').then(mod => mod.CategoryRadarChart),
  { ssr: false }
);

export const TrendLineChart = dynamic(
  () => import('./Charts').then(mod => mod.TrendLineChart),
  { ssr: false }
);
