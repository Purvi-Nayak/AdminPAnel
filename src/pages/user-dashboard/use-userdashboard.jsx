import { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/client";

export const useUserDashboard = () => {
  const chartRef = useRef(null);
  const currentUser = useSelector((state) => state.users.user);
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
    inProgress: 0,
  });

  //   useEffect(() => {
  //     return () => {
  //       if (chartRef.current) chartRef.current.destroy();
  //     };
  //   }, []);

  useEffect(() => {
    if (currentUser?.id) {
      fetchUserTasks();
    }
  }, [currentUser]);

  const fetchUserTasks = async () => {
    try {
      const response = await api.TASKS.getUserTasks({
        userId: currentUser?.id,
      });
      if (response.data) {
        setTasks(response.data);

        const stats = response.data.reduce(
          (acc, task) => {
            switch (task.status) {
              case "Approved":
                acc.approved += 1;
                break;
              case "Rejected":
                acc.rejected += 1;
                break;
              case "In Progress":
                acc.inProgress += 1;
                break;
              default:
                acc.pending += 1;
                break;
            }
            return acc;
          },
          { approved: 0, rejected: 0, pending: 0, inProgress: 0 }
        );

        setTaskStats(stats);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const barChartData = useMemo(
    () => ({
      labels: ["Approved", "Rejected", "Pending", "In Progress"],
      datasets: [
        {
          label: "Task Status Distribution",
          data: [
            taskStats.approved,
            taskStats.rejected,
            taskStats.pending,
            taskStats.inProgress,
          ],
          backgroundColor: [
            "rgba(55, 93, 219, 0.6)",
            "rgba(255, 99, 109, 0.6)",
            "rgba(26, 16, 208, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    }),
    [taskStats]
  );

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Task Status Distribution" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return {
    chartRef,
    currentUser,
    tasks,
    taskStats,
    barChartData,
    barChartOptions,
  };
};
