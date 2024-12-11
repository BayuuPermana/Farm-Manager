import React, { createContext, useContext, useReducer } from 'react';
import type { Staff, Livestock, FeedInventory, FeedingRecord } from '../types';

interface AppState {
  staff: Staff[];
  livestock: Livestock[];
  feedInventory: FeedInventory[];
  feedingRecords: FeedingRecord[];
  loading: boolean;
  error: string | null;
}

type Action = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_STAFF'; payload: Staff }
  | { type: 'UPDATE_STAFF'; payload: Staff }
  | { type: 'DELETE_STAFF'; payload: string }
  | { type: 'ADD_LIVESTOCK'; payload: Livestock }
  | { type: 'UPDATE_LIVESTOCK'; payload: Livestock }
  | { type: 'DELETE_LIVESTOCK'; payload: string }
  | { type: 'ADD_FEED'; payload: FeedInventory }
  | { type: 'UPDATE_FEED'; payload: FeedInventory }
  | { type: 'DELETE_FEED'; payload: string }
  | { type: 'ADD_FEEDING_RECORD'; payload: FeedingRecord }
  | { type: 'UPDATE_FEEDING_RECORD'; payload: FeedingRecord }
  | { type: 'DELETE_FEEDING_RECORD'; payload: string };

const initialState: AppState = {
  staff: [
    {
      id: '1',
      name: 'John Doe',
      role: 'manager',
      email: 'john@farm.com',
      phone: '(555) 123-4567',
      assignedAreas: ['North Pasture', 'Feed Storage'],
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      startDate: new Date('2023-01-15'),
      schedule: [],
      performance: []
    },
    {
      id: '2',
      name: 'Sarah Smith',
      role: 'staff',
      email: 'sarah@farm.com',
      phone: '(555) 234-5678',
      assignedAreas: ['Poultry Coop', 'East Field'],
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      startDate: new Date('2023-03-01'),
      schedule: [],
      performance: []
    }
  ],
  livestock: [
    {
      id: 'l1',
      type: 'Cattle',
      count: 150,
      lastFed: new Date('2024-03-20T08:00:00'),
      nextFeeding: new Date('2024-03-20T16:00:00'),
      status: 'fed',
      assignedStaff: ['1', '2']
    },
    {
      id: 'l2',
      type: 'Sheep',
      count: 300,
      lastFed: new Date('2024-03-20T07:30:00'),
      nextFeeding: new Date('2024-03-20T15:30:00'),
      status: 'unfed',
      assignedStaff: ['2']
    }
  ],
  feedInventory: [],
  feedingRecords: [],
  loading: false,
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_STAFF':
      return { ...state, staff: [...state.staff, action.payload] };
    case 'UPDATE_STAFF':
      return {
        ...state,
        staff: state.staff.map(s => 
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case 'DELETE_STAFF':
      return {
        ...state,
        staff: state.staff.filter(s => s.id !== action.payload),
      };
    case 'ADD_LIVESTOCK':
      return { ...state, livestock: [...state.livestock, action.payload] };
    case 'UPDATE_LIVESTOCK':
      return {
        ...state,
        livestock: state.livestock.map(l => 
          l.id === action.payload.id ? action.payload : l
        ),
      };
    case 'DELETE_LIVESTOCK':
      return {
        ...state,
        livestock: state.livestock.filter(l => l.id !== action.payload),
      };
    case 'ADD_FEED':
      return { ...state, feedInventory: [...state.feedInventory, action.payload] };
    case 'UPDATE_FEED':
      return {
        ...state,
        feedInventory: state.feedInventory.map(f => 
          f.id === action.payload.id ? action.payload : f
        ),
      };
    case 'DELETE_FEED':
      return {
        ...state,
        feedInventory: state.feedInventory.filter(f => f.id !== action.payload),
      };
    case 'ADD_FEEDING_RECORD':
      return { ...state, feedingRecords: [...state.feedingRecords, action.payload] };
    case 'UPDATE_FEEDING_RECORD':
      return {
        ...state,
        feedingRecords: state.feedingRecords.map(r => 
          r.id === action.payload.id ? action.payload : r
        ),
      };
    case 'DELETE_FEEDING_RECORD':
      return {
        ...state,
        feedingRecords: state.feedingRecords.filter(r => r.id !== action.payload),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}