import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
import { useUserDashboard } from "./use-userdashboard";

const UserDashboard = () => {
  const {
    chartRef,
    currentUser,
    tasks,
    taskStats,
    barChartData,
    barChartOptions,
  } = useUserDashboard();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to {currentUser?.name}'s Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-300 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
        </div>
        <div className="bg-blue-100 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Approved Tasks</h3>
          <p className="text-3xl font-bold text-green-600">
            {taskStats.approved}
          </p>
        </div>
        <div className="bg-red-100 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Rejected Tasks</h3>
          <p className="text-3xl font-bold text-red-600">
            {taskStats.rejected}
          </p>
        </div>
        <div className="bg-blue-100 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-blue-500">
            {taskStats.inProgress}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <Bar
            ref={chartRef}
            data={barChartData}
            options={barChartOptions}
            key={JSON.stringify(taskStats)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
