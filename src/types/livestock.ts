import { z } from 'zod';

export const LivestockSchema = z.object({
  id: z.string().optional(),
  species: z.string().min(1, 'Species is required'),
  tagNumber: z.string().min(1, 'Tag number is required'),
  birthDate: z.date(),
  weight: z.number().min(0, 'Weight must be positive'),
  healthStatus: z.enum(['healthy', 'sick', 'quarantined', 'treatment']),
  breedingStatus: z.enum(['breeding', 'pregnant', 'not-breeding']),
  cost: z.number().min(0, 'Cost must be positive'),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type Livestock = z.infer<typeof LivestockSchema>;

export type LivestockSortField = keyof Omit<Livestock, 'id' | 'notes' | 'createdAt' | 'updatedAt'>;

export interface LivestockFilters {
  species?: string;
  healthStatus?: Livestock['healthStatus'];
  breedingStatus?: Livestock['breedingStatus'];
  dateFrom?: Date;
  dateTo?: Date;
}