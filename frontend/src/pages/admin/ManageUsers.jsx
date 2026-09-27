import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Users, Shield, Trash2, UserCheck, ShieldAlert } from 'lucide-react';

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentAdmin } = useAuth();
  const { showToast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (targetUser) => {
    if (targetUser._id === currentAdmin._id) {
      showToast('You cannot alter your own admin privileges', 'error');
      return;
    }
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    try {
      const res = await adminService.updateUser(targetUser._id, { role: newRole });
      if (res.success) {
        showToast(`Role updated for ${targetUser.name} to ${newRole}`, 'success');
        setUsers((prev) =>
          prev.map((u) => (u._id === targetUser._id ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user account?')) return;
    try {
      const res = await adminService.deleteUser(userId);
      if (res.success) {
        showToast('User account removed', 'info');
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Registered Users & Staff</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Manage member accounts, assign concierge permissions, and inspect registration timelines.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-slate-400 uppercase font-mono border-b border-white/10 bg-white/5">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">User</th>
                  <th className="py-3.5 px-4 font-semibold">Contact Phone</th>
                  <th className="py-3.5 px-4 font-semibold">Role Tier</th>
                  <th className="py-3.5 px-4 font-semibold">Joined Date</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center border border-white/10">
                        {u.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {u.phone || 'Not Specified'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                          u.role === 'admin'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                            : 'bg-white/5 text-slate-300 border-white/10'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(u)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                          title="Toggle Admin Privilege"
                        >
                          {u.role === 'admin' ? 'Make Client' : 'Make Admin'}
                        </button>
                        {u._id !== currentAdmin?._id && (
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
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
