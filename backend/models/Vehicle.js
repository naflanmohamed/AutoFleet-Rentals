import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a vehicle title'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Please provide a brand'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please provide a model'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide a year'],
    min: [1900, 'Year must be valid'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please provide a price per day'],
    min: [0, 'Price must be positive']
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category']
  },
  images: [{
    type: String,
    required: true
  }],
  availability: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;

