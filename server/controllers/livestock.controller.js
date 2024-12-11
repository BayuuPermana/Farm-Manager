import { validationResult } from 'express-validator';
import Livestock from '../models/Livestock.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllLivestock = async (req, res, next) => {
  try {
    const livestock = await Livestock.find()
      .populate('assignedStaff', 'name role')
      .populate('createdBy', 'username');
    res.json(livestock);
  } catch (error) {
    next(error);
  }
};

export const getLivestockById = async (req, res, next) => {
  try {
    const livestock = await Livestock.findById(req.params.id)
      .populate('assignedStaff', 'name role')
      .populate('createdBy', 'username');

    if (!livestock) {
      throw new ApiError(404, 'Livestock not found');
    }

    res.json(livestock);
  } catch (error) {
    next(error);
  }
};

export const createLivestock = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Validation Error', errors.array());
    }

    const livestock = new Livestock({
      ...req.body,
      createdBy: req.user.id
    });

    await livestock.save();
    
    const populatedLivestock = await Livestock.findById(livestock._id)
      .populate('assignedStaff', 'name role')
      .populate('createdBy', 'username');

    res.status(201).json(populatedLivestock);
  } catch (error) {
    next(error);
  }
};

export const updateLivestock = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Validation Error', errors.array());
    }

    const livestock = await Livestock.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    .populate('assignedStaff', 'name role')
    .populate('createdBy', 'username');

    if (!livestock) {
      throw new ApiError(404, 'Livestock not found');
    }

    res.json(livestock);
  } catch (error) {
    next(error);
  }
};

export const deleteLivestock = async (req, res, next) => {
  try {
    const livestock = await Livestock.findByIdAndDelete(req.params.id);

    if (!livestock) {
      throw new ApiError(404, 'Livestock not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateFeedingStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Validation Error', errors.array());
    }

    const { status, lastFed, nextFeeding } = req.body;

    const livestock = await Livestock.findByIdAndUpdate(
      req.params.id,
      {
        status,
        lastFed,
        nextFeeding,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    )
    .populate('assignedStaff', 'name role')
    .populate('createdBy', 'username');

    if (!livestock) {
      throw new ApiError(404, 'Livestock not found');
    }

    res.json(livestock);
  } catch (error) {
    next(error);
  }
};