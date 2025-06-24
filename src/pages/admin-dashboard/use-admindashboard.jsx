// // src/pages/AdminDashboard/useAdminDashboard.jsx
// import { useEffect, useState, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { api } from "../../api/client";
// import { updateTask } from "../../redux/slices/taskSlice";
// import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";


// export const useAdminDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [open, setOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { fetchUsers } = useSelector((state) => state.users);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const userId = params.get("userId");
//     setSelectedUserId(userId);
//   }, [location]);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);





//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [usersResponse, tasksResponse] = await Promise.all([
//         dispatch(fetchUsers()),
//         selectedUserId
//           ? api.TASKS.getUserTasks({ userId: selectedUserId })
//           : api.TASKS.getAllTasks(),
//       ]);
//       if (usersResponse.data) setUsers(usersResponse.data);
//       if (tasksResponse.data) setTasks(tasksResponse.data);
//     } catch (err) {
//       console.error("Error fetching:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (task) => {
//     try {
//       const response = await api.TASKS.updateStatus({
//         taskId: task.id,
//         data: { ...task, status: "Approved", updatedAt: new Date().toISOString() },
//       });
//       if (response.data) {
//         setSuccessMessage("Task has been approved successfully!");
//         setErrorMessage("");
//         setOpen(true);
//         dispatch(updateTask(response.data));
//         setTasks((prev) => prev.map((t) => (t.id === task.id ? response.data : t)));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleReject = async (task) => {
//     try {
//       const response = await api.TASKS.updateStatus({
//         taskId: task.id,
//         data: { ...task, status: "Rejected", updatedAt: new Date().toISOString() },
//       });
//       if (response.data) {
//         setErrorMessage("Task has been rejected");
//         setSuccessMessage("");
//         setOpen(true);
//         dispatch(updateTask(response.data));
//         setTasks((prev) => prev.map((t) => (t.id === task.id ? response.data : t)));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = (id) => setDeleteId(id);

//   const handleConfirmDelete = async () => {
//     try {
//       await api.TASKS.delete({ id: deleteId });
//       setTasks((prev) => prev.filter((t) => t.id !== deleteId));
//       setDeleteId(null);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const handleSort = () => {
//     const newSortConfig = {
//       key: "title",
//       direction: sortConfig.direction === "asc" ? "desc" : "asc",
//     };
//     setSortConfig(newSortConfig);
//     setTasks((prevTasks) =>
//       [...prevTasks].sort((a, b) => {
//         if (newSortConfig.direction === "asc") {
//           return a.title.localeCompare(b.title);
//         } else {
//           return b.title.localeCompare(a.title);
//         }
//       })
//     );
//   };
//   const filteredTasks = useMemo(() => {
//     return tasks.filter((task) => {
//       const user = users.find((u) => u.id === task.userId);
//       const searchTerm = search.toLowerCase().trim();
//       return (
//         (!searchTerm ||
//           task.title?.toLowerCase().includes(searchTerm) ||
//           user?.name?.toLowerCase().includes(searchTerm)) &&
//         (!statusFilter || task.status === statusFilter)
//       );
//     });
//   }, [tasks, users, search, statusFilter]);

//   const getTaskMenuItems = (task) => [
//     { label: "Approve", icon: <FaCheck className="text-green-500"/>, onClick: () => handleApprove(task) },
//     { label: "Reject", icon: <FaTimes className="text-red-500"/>, onClick: () => handleReject(task) },
//     { label: "Delete", icon: <FaTrash className="text-red-500"/>, onClick: () => handleDelete(task.id) },
//   ];

//   useEffect(() => {
//     fetchData();
//   }, [selectedUserId]);

//   return {
//     users,
//     tasks: filteredTasks,
//     loading,
//     search,
//     setSearch,
//     statusFilter,
//     setStatusFilter,
//     selectedUserId,
//     navigate,
//     getTaskMenuItems,
//     successMessage,
//     errorMessage,
//     open,
//     setOpen,
//     deleteId,
//     sortConfig,
//     setDeleteId,
//     handleConfirmDelete,
//     handleSort
//   };
// };
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { updateTask } from "../../redux/slices/taskSlice";
import { fetchUsers } from "../../redux/slices/userSlice";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

export const useAdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Get users from Redux
  const users = useSelector((state) => state.users.usersList);
  const loading = useSelector((state) => state.users.isLoading);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    setSelectedUserId(userId);
  }, [location]);

  // Fetch users from Redux store
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Fetch tasks
  const fetchData = async () => {
    try {
      const tasksResponse = selectedUserId
        ? await api.TASKS.getUserTasks({ userId: selectedUserId })
        : await api.TASKS.getAllTasks();
      if (tasksResponse.data) setTasks(tasksResponse.data);
    } catch (err) {
      setErrorMessage("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchData();
 
  }, [selectedUserId]);

  const handleApprove = async (task) => {
    try {
      const response = await api.TASKS.updateStatus({
        taskId: task.id,
        data: { ...task, status: "Approved", updatedAt: new Date().toISOString() },
      });
      if (response.data) {
        setSuccessMessage("Task has been approved successfully!");
        setErrorMessage("");
        setOpen(true);
        dispatch(updateTask(response.data));
        setTasks((prev) => prev.map((t) => (t.id === task.id ? response.data : t)));
      }
    } catch (err) {
      setErrorMessage("Error approving task");
      setOpen(true);
    }
  };

  const handleReject = async (task) => {
    try {
      const response = await api.TASKS.updateStatus({
        taskId: task.id,
        data: { ...task, status: "Rejected", updatedAt: new Date().toISOString() },
      });
      if (response.data) {
        setErrorMessage("Task has been rejected");
        setSuccessMessage("");
        setOpen(true);
        dispatch(updateTask(response.data));
        setTasks((prev) => prev.map((t) => (t.id === task.id ? response.data : t)));
      }
    } catch (err) {
      setErrorMessage("Error rejecting task");
      setOpen(true);
    }
  };

  const handleDelete = (id) => setDeleteId(id);

  const handleConfirmDelete = async () => {
    try {
      await api.TASKS.delete({ id: deleteId });
      setTasks((prev) => prev.filter((t) => t.id !== deleteId));
      setDeleteId(null);
      fetchData();
    } catch (err) {
      setErrorMessage("Error deleting task");
      setOpen(true);
    }
  };

  const handleSort = () => {
    const newSortConfig = {
      key: "title",
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    };
    setSortConfig(newSortConfig);
    setTasks((prevTasks) =>
      [...prevTasks].sort((a, b) => {
        if (newSortConfig.direction === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      })
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const user = users.find((u) => u.id === task.userId);
      const searchTerm = search.toLowerCase().trim();
      return (
        (!searchTerm ||
          task.title?.toLowerCase().includes(searchTerm) ||
          user?.name?.toLowerCase().includes(searchTerm)) &&
        (!statusFilter || task.status === statusFilter)
      );
    });
  }, [tasks, users, search, statusFilter]);

  const getTaskMenuItems = (task) => [
    { label: "Approve", icon: <FaCheck className="text-green-500"/>, onClick: () => handleApprove(task) },
    { label: "Reject", icon: <FaTimes className="text-red-500"/>, onClick: () => handleReject(task) },
    { label: "Delete", icon: <FaTrash className="text-red-500"/>, onClick: () => handleDelete(task.id) },
  ];

  return {
    users,
    tasks: filteredTasks,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedUserId,
    navigate,
    getTaskMenuItems,
    successMessage,
    errorMessage,
    open,
    setOpen,
    deleteId,
    sortConfig,
    setDeleteId,
    handleConfirmDelete,
    handleSort
  };
};