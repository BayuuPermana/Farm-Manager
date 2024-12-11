import type { Staff, Livestock, FeedInventory } from '../types';

export const validateStaff = (staff: Partial<Staff>): string[] => {
  const errors: string[] = [];

  if (!staff.name?.trim()) {
    errors.push('Name is required');
  }

  if (!staff.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staff.email)) {
    errors.push('Invalid email format');
  }

  if (!staff.phone?.trim()) {
    errors.push('Phone number is required');
  } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(staff.phone)) {
    errors.push('Phone number must be in format (XXX) XXX-XXXX');
  }

  if (!staff.role) {
    errors.push('Role is required');
  }

  if (!staff.assignedAreas?.length) {
    errors.push('At least one assigned area is required');
  }

  return errors;
};

export const validateLivestock = (livestock: Partial<Livestock>): string[] => {
  const errors: string[] = [];

  if (!livestock.type?.trim()) {
    errors.push('Type is required');
  }

  if (!livestock.count || livestock.count < 0) {
    errors.push('Count must be a positive number');
  }

  if (!livestock.assignedStaff?.length) {
    errors.push('At least one staff member must be assigned');
  }

  if (!livestock.lastFed) {
    errors.push('Last feeding time is required');
  }

  if (!livestock.nextFeeding) {
    errors.push('Next feeding time is required');
  } else if (livestock.lastFed && livestock.nextFeeding <= livestock.lastFed) {
    errors.push('Next feeding time must be after last feeding time');
  }

  return errors;
};

export const validateFeedInventory = (feed: Partial<FeedInventory>): string[] => {
  const errors: string[] = [];

  if (!feed.name?.trim()) {
    errors.push('Feed name is required');
  }

  if (!feed.currentStock || feed.currentStock < 0) {
    errors.push('Current stock must be a positive number');
  }

  if (!feed.unit?.trim()) {
    errors.push('Unit is required');
  }

  if (!feed.minimumStock || feed.minimumStock < 0) {
    errors.push('Minimum stock must be a positive number');
  }

  if (!feed.costPerUnit || feed.costPerUnit < 0) {
    errors.push('Cost per unit must be a positive number');
  }

  if (!feed.expirationDate) {
    errors.push('Expiration date is required');
  } else if (new Date(feed.expirationDate) <= new Date()) {
    errors.push('Expiration date must be in the future');
  }

  return errors;
};