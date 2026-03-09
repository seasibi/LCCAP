import React from 'react';
import { FiCalendar, FiCheckCircle, FiUsers, FiActivity } from 'react-icons/fi';
import DashboardLayout from '../layout/DashboardLayout';
import StatCard from '../StatCard';
import UpcomingEvents from '../UpcomingEvents';
import Calendar from '../Calendar';
import RecentActivity from '../RecentActivity';
import ProgressChart from '../ProgressChart';
import { statsData } from '../../data/mockData';

const ModernDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Local Climate Change Action Plan Management System
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FiCalendar}
            title="Total Events"
            value={statsData.totalEvents}
            subtitle="All recorded activities"
            color="#2E7D32"
          />
          <StatCard
            icon={FiCheckCircle}
            title="Completed Events"
            value={statsData.completedEvents}
            subtitle="Successfully finished"
            color="#66BB6A"
          />
          <StatCard
            icon={FiUsers}
            title="Active Offices"
            value={statsData.activeOffices}
            subtitle="Participating departments"
            color="#1E88E5"
          />
          <StatCard
            icon={FiActivity}
            title="Ongoing Events"
            value={statsData.ongoingEvents}
            subtitle="Currently in progress"
            color="#2E7D32"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <UpcomingEvents />
            
            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar */}
            <Calendar />
            
            {/* LCCAP Progress */}
            <ProgressChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ModernDashboard;
