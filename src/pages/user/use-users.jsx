import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { fetchUsers } from "../../redux/slices/userSlice";
import { api } from "../../api/client";

const useUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.user);

  // Use Redux state for users and loading
  const usersList = useSelector((state) => state.users.usersList);
  const loading = useSelector((state) => state.users.isLoading);

  const [search, setSearch] = useState("");
  const [selectedUserTasks, setSelectedUserTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = usersList.filter(
    (user) =>
      (currentUser?.role === "admin" || user.role === "user") &&
      (user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase()))
  );

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleViewTasks = async (userId, userName) => {
    if (currentUser?.role === "admin") {
      try {
        const response = await api.TASKS.getUserTasks({ userId });
        if (response.data) {
          setSelectedUserTasks(response.data);
          setSelectedUserName(userName);
          setIsTaskModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    } else if (userId === currentUser.id) {
      navigate("/tasks");
    }
  };

  const columns = [
    {
      id: "name",
      label: "Name",
      field_name: "name",
      sortable: true,
      render: ({ row }) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {row.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="ml-3 font-medium text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      id: "email",
      label: "Email",
      field_name: "email",
      sortable: true,
      render: ({ row }) => <span className="text-gray-600">{row.email}</span>,
    },
    {
      id: "role",
      label: "Role",
      field_name: "role",
      sortable: true,

      options: ["user", "admin"],
      filterPlaceholder: "Filter by role",
      filterType: "select",
      render: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.role === "user"
              ? "bg-green-100 text-green-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      id: "viewTasks",
      label: "Tasks",
      field_name: "viewTasks",
      sortable: false,
      render: ({ row }) => (
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
            currentUser?.role === "admin" || row.id === currentUser.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => handleViewTasks(row.id, row.name)}
          disabled={currentUser?.role !== "admin" && row.id !== currentUser.id}
        >
          {currentUser?.role === "admin"
            ? "View User Tasks"
            : row.id === currentUser.id
            ? "View My Tasks"
            : "Not Available"}
        </button>
      ),
    },
  ];

  const taskColumns = [
    {
      id: "title",
      label: "Title",
      field_name: "title",
      render: ({ row }) => <span className="font-medium">{row.title}</span>,
    },
    {
      id: "description",
      label: "Description",
      field_name: "description",
      render: ({ row }) => (
        <span className="text-gray-600">{row.description}</span>
      ),
    },
    {
      id: "dueDate",
      label: "Due Date",
      field_name: "dueDate",
      render: ({ row }) => (
        <span>{new Date(row.dueDate).toLocaleDateString()}</span>
      ),
    },
    {
      id: "status",
      label: "Status",
      field_name: "status",
      render: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.status === "Completed"
              ? "bg-green-100 text-green-800"
              : row.status === "In Progress"
              ? "bg-yellow-100 text-yellow-800"
              : row.status === "Approved"
              ? "bg-blue-100 text-blue-800"
              : row.status === "Rejected"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return {
    users: filteredUsers,
    loading,
    search,
    setSearch,
    sortConfig,
    handleSort,
    columns,
    taskColumns,
    isTaskModalOpen,
    selectedUserTasks,
    selectedUserName,
    setIsTaskModalOpen,
    currentUser,
    navigate,
  };
};

export default useUsers;
