import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { carService } from '../../services/carService';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft, Save, Car, Upload, Plus, Trash2 } from 'lucide-react';

export const AddEditCar = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: 'BMW',
    category: 'Sports',
    description: '',
    pricePerDay: 15000,
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'],
    model3D: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 4,
    year: 2024,
    mileage: '11.0 kmpl',
    horsepower: 450,
    features: ['GPS Navigation', 'Bluetooth Audio', 'Air Conditioning', 'Parking Sensors', 'Cruise Control', 'Panoramic Sunroof'],
    location: 'Mumbai Central Showroom Hub',
    isFeatured: false,
    isAvailable: true,
  });

  const [newFeature, setNewFeature] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchCar = async () => {
        try {
          setLoading(true);
          const data = await carService.getCarById(id);
          if (data.success) {
            setFormData(data.car);
          }
        } catch (err) {
          showToast(err.message, 'error');
        } finally {
          setLoading(false);
        }
      };
      fetchCar();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditing) {
        await carService.updateCar(id, formData);
        showToast('Vehicle updated successfully', 'success');
      } else {
        await carService.createCar(formData);
        showToast('New vehicle added to fleet', 'success');
      }
      navigate('/admin/cars');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
    setNewFeature('');
  };

  const handleRemoveFeature = (idx) => {
    setFormData((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
  };

  const handleAddImage = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({ ...prev, images: [...prev.images, imageUrlInput.trim()] }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (idx) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/cars"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Inventory
        </Link>
        <h1 className="text-xl font-bold text-white">
          {isEditing ? `Edit Vehicle: ${formData.name}` : 'Add New Luxury Vehicle'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
        {/* Core Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Vehicle Model Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. BMW M4 Competition"
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Brand / Manufacturer</label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="e.g. BMW"
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Category & Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Sports">Sports</option>
              <option value="Supercar">Supercar</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Price Per Day (₹)</label>
            <input
              type="number"
              required
              min={1000}
              value={formData.pricePerDay}
              onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Horsepower (HP)</label>
            <input
              type="number"
              value={formData.horsepower}
              onChange={(e) => setFormData({ ...formData, horsepower: Number(e.target.value) })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Technical Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Fuel Type</label>
            <select
              value={formData.fuelType}
              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Transmission</label>
            <select
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Automatic">Automatic</option>
              <option value="Dual-Clutch">Dual-Clutch</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Seats</label>
            <input
              type="number"
              min={2}
              max={8}
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Model Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Location & Model3D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Location Hub</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              3D Model Key / GLB Identifier (in /public/models/)
            </label>
            <input
              type="text"
              value={formData.model3D}
              onChange={(e) => setFormData({ ...formData, model3D: e.target.value })}
              placeholder="e.g. m4 or amg_gt"
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Description Overview</label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Installed Features */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Installed Features & Amenities</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add feature (e.g. Carbon Fiber Brakes)..."
              className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {formData.features.map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300"
              >
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Image URLs */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">High-Resolution Image URLs</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
            >
              Attach
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {formData.images.map((url, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden h-24 border border-white/10">
                <img src={url} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 p-1 rounded-lg bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-8 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-400 bg-dark-900 border-white/10 focus:ring-0"
            />
            <span>Feature on Landing Page</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-400 bg-dark-900 border-white/10 focus:ring-0"
            />
            <span>Available for Rent</span>
          </label>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-cyan-500 text-dark-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Vehicle Updates' : 'Deploy Vehicle to Fleet'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
