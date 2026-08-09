import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpenCheck, 
  Camera, 
  Landmark, 
  Award, 
  BellRing, 
  LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { role } = useAuth();

  const navItems = [
    { to: '/', label: 'Trang Chủ', icon: Home },
    { to: '/subjects', label: 'Các Môn Học', icon: BookOpenCheck },
    { to: '/activities', label: 'Hoạt Động Lớp', icon: Camera },
    { to: '/hcm-space', label: 'Không Gian HCM', icon: Landmark },
    { to: '/honor-roll', label: 'Vinh Danh', icon: Award },
    { to: '/reminders', label: 'Dặn Dò', icon: BellRing },
  ];

  if (role === 'teacher' || role === 'admin') {
    navItems.push({ to: '/dashboard', label: 'Quản Lý & Báo Cáo', icon: LayoutDashboard });
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-105'
                        : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
