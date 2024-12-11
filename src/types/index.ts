export interface Staff {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  email: string;
  phone: string;
  assignedAreas: string[];
  imageUrl: string;
  startDate: Date;
  schedule: WorkSchedule[];
  performance: PerformanceMetric[];
}

export interface WorkSchedule {
  id: string;
  date: Date;
  shift: 'morning' | 'afternoon' | 'night';
  area: string;
  status: 'scheduled' | 'completed' | 'absent';
}

export interface PerformanceMetric {
  id: string;
  date: Date;
  category: 'attendance' | 'task_completion' | 'efficiency';
  score: number;
  notes: string;
}

export interface FeedingRecord {
  id: string;
  livestockId: string;
  timestamp: Date;
  feedType: string;
  quantity: number;
  staffId: string;
  status: 'completed' | 'pending' | 'missed';
}

export interface FeedInventory {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  minimumStock: number;
  expirationDate: Date;
  costPerUnit: number;
}

export interface Livestock {
  id: string;
  species: string;
  tagNumber: string;
  birthDate: Date;
  weight: number;
  healthStatus: 'healthy' | 'sick' | 'quarantined' | 'treatment';
  breedingStatus: 'breeding' | 'pregnant' | 'not-breeding';
  assignedStaff: string[];
  notes?: string;
  location: string;
  lastCheckup: Date;
  updatedAt?: Date;
  cost: number;
  createdAt?: Date;
}