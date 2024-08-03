import { IconName } from '@/components/SvgIcon';

// Enums to represent MetricType and LiveStatus
export enum MetricType {
  SingleValue = 'singleValue',
  Tabular = 'tabular',
}

export enum LiveStatus {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
}

// Interfaces for MetricLap, MetricRep, MetricSet, and MetricPresentView
export interface MetricLap {
  id: string;
  name: string;
  value: string;
  status: LiveStatus;
}

export interface MetricRep {
  id: string;
  name: string;
  value: string;
  laps: MetricLap[];
  recovery?: string;
  status: LiveStatus;
}

export interface MetricSet {
  id: string;
  name: string;
  reps: MetricRep[];
  recovery?: string;
  status: LiveStatus;
}

export interface MetricPresentView {
  id: string;
  label: string;
  value: string;
  key: string;
  type: MetricType;
  icon?: IconName;
  sets?: MetricSet[];
  reps?: MetricRep[];
  laps?: MetricLap[];
}

export enum LayoutType {
  Layout1 = 'layout1',
  Layout2 = 'layout2',
  Layout3 = 'layout3',
}

// MetricLayout Interface
export interface MetricLayout {
  id: LayoutType;
  layout: LayoutType;
  metrics: MetricPresentView[];
}
