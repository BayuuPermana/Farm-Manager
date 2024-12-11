import express from 'express';
import { body } from 'express-validator';
import * as livestockController from '../controllers/livestock.controller.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticate);

// Get all livestock
router.get('/', livestockController.getAllLivestock);

// Get single livestock
router.get('/:id', livestockController.getLivestockById);

// Create new livestock (admin only)
router.post('/',
  authorize(['admin']),
  [
    body('type').trim().notEmpty().withMessage('Type is required'),
    body('count').isInt({ min: 0 }).withMessage('Count must be a positive number'),
    body('assignedStaff').isArray().withMessage('Assigned staff must be an array'),
    body('lastFed').isISO8601().withMessage('Last fed time must be a valid date'),
    body('nextFeeding').isISO8601().withMessage('Next feeding time must be a valid date'),
    body('status').isIn(['fed', 'unfed']).withMessage('Invalid status')
  ],
  livestockController.createLivestock
);

// Update livestock (admin only)
router.put('/:id',
  authorize(['admin']),
  [
    body('type').optional().trim().notEmpty().withMessage('Type is required'),
    body('count').optional().isInt({ min: 0 }).withMessage('Count must be a positive number'),
    body('assignedStaff').optional().isArray().withMessage('Assigned staff must be an array'),
    body('lastFed').optional().isISO8601().withMessage('Last fed time must be a valid date'),
    body('nextFeeding').optional().isISO8601().withMessage('Next feeding time must be a valid date'),
    body('status').optional().isIn(['fed', 'unfed']).withMessage('Invalid status')
  ],
  livestockController.updateLivestock
);

// Delete livestock (admin only)
router.delete('/:id',
  authorize(['admin']),
  livestockController.deleteLivestock
);

// Update feeding status (both admin and regular users)
router.patch('/:id/feeding-status',
  [
    body('status').isIn(['fed', 'unfed']).withMessage('Invalid status'),
    body('lastFed').isISO8601().withMessage('Last fed time must be a valid date'),
    body('nextFeeding').isISO8601().withMessage('Next feeding time must be a valid date')
  ],
  livestockController.updateFeedingStatus
);

export default router;