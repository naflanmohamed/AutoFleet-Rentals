import express from 'express';
import { body, validationResult } from 'express-validator';
import Vehicle from '../models/Vehicle.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload, processImages } from '../config/cloudinary.js';

const router = express.Router();

// @route   GET /api/vehicles
// @desc    Get all vehicles with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, brand, model, minPrice, maxPrice, search, availability, featured } = req.query;

    let query = {};

    if (category) query.category = category;
    if (brand) query.brand = new RegExp(brand, 'i');
    if (model) query.model = new RegExp(model, 'i');
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    if (availability !== undefined) query.availability = availability === 'true';
    if (featured !== undefined) query.isFeatured = featured === 'true';

    const vehicles = await Vehicle.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/vehicles/:id
// @desc    Get single vehicle
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('category', 'name');

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/vehicles
// @desc    Create a new vehicle
// @access  Private/Admin
router.post('/', protect, admin, upload, processImages, [
  body('title').notEmpty().withMessage('Title is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1900 }).withMessage('Valid year is required'),
  body('pricePerDay').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const images = req.body.images || [];

    const vehicle = await Vehicle.create({
      ...req.body,
      images
    });

    const populatedVehicle = await Vehicle.findById(vehicle._id)
      .populate('category', 'name');

    res.status(201).json(populatedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/vehicles/:id
// @desc    Update a vehicle
// @access  Private/Admin
router.put('/:id', protect, admin, upload, processImages, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // If new images are uploaded, add them to existing images
    if (req.body.images && req.body.images.length > 0) {
      vehicle.images = [...vehicle.images, ...req.body.images];
    }

    // Update other fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'images') {
        vehicle[key] = req.body[key];
      }
    });

    await vehicle.save();

    const updatedVehicle = await Vehicle.findById(vehicle._id)
      .populate('category', 'name');

    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/vehicles/:id
// @desc    Delete a vehicle
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    await vehicle.deleteOne();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

