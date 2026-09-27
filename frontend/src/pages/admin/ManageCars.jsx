import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carService } from '../../services/carService';
import { useToast } from '../../context/ToastContext';
import {
  Car,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  Sparkles,
} from 'lucide-react';

export const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await carService.getCars({ search });
      if (data.success) {
        setCars(data.cars || []);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [search]);

  const handleToggleAvailability = async (car) => {
    try {
      const updated = await carService.updateCar(car._id, {
        isAvailable: !car.isAvailable,
      });
      if (updated.success) {
        showToast(`Availability updated for ${car.name}`, 'success');
        setCars((prev) =>
          prev.map((c) => (c._id === car._id ? { ...c, isAvailable: !c.isAvailable } : c))
        );
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this vehicle from the fleet?')) return;
    try {
      const res = await carService.deleteCar(id);
      if (res.success) {
        showToast('Vehicle deleted successfully', 'info');
        setCars((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const formatPrice = (val) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Fleet Inventory</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Control vehicle availability, pricing tariffs, and 3D configuration profiles.
          </p>
        </div>

        <Link
          to="/admin/cars/new"
          className="px-4 py-2.5 rounded-xl bg-cyan-500 text-dark-950 font-bold text-xs shadow-glow-cyan hover:brightness-110 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter fleet by model or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Fleet Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-slate-400 uppercase font-mono border-b border-white/10 bg-white/5">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Vehicle</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Daily Rate</th>
                  <th className="py-3.5 px-4 font-semibold">Rating</th>
                  <th className="py-3.5 px-4 font-semibold">Featured</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cars.map((car) => (
                  <tr key={car._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={car.images?.[0] || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80'}
                        alt={car.name}
                        className="w-12 h-9 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white text-sm">{car.name}</p>
                        <p className="text-[11px] text-slate-400">{car.brand} • {car.year}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[11px]">
                        {car.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {formatPrice(car.pricePerDay)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{car.rating?.toFixed(1) || '5.0'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {car.isFeatured ? (
                        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          FEATURED
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleAvailability(car)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                          car.isAvailable
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {car.isAvailable ? 'Available' : 'Reserved/Off'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/cars/edit/${car._id}`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          title="Edit Vehicle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
