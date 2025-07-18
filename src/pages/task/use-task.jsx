import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../api/client";
import useDebounce from "../../hooks/useDebounce";
import {
  addTask,
  setEditingTask,
  setError,
  updateTask,
  setLoading,
  deleteTask,
} from "../../redux/slices/taskSlice";

export const useTask = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);
  const editingTask = useSelector((state) => state.tasks.editingTask);
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading); 
  const users = useSelector((state) => state.users.usersList);

  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  // Fetch tasks for the current user
  const fetchTasks = async () => {
    try {
      dispatch(setLoading(true));
      const response = await api.TASKS.getUserTasks({ userId: currentUser.id });
      if (response.data) {
        dispatch({ type: "tasks/setTasks", payload: response.data });
      }
    } catch (error) {
      dispatch(setError("Error fetching tasks"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!isModalOpen && currentUser?.id) fetchTasks();
    // eslint-disable-next-line
  }, [isModalOpen, currentUser?.id]);

  // Search logic
  useEffect(() => {
    if (!debouncedSearch) {
      fetchTasks();
      return;
    }
    const searchTasks = async () => {
      try {
        dispatch(setLoading(true));
        const response = await api.TASKS.searchByTitle({
          data: debouncedSearch,
        });
        if (response.data) {
          dispatch({ type: "tasks/setTasks", payload: response.data });
        }
      } catch (err) {
        dispatch(setError("Search error"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    searchTasks();
    // eslint-disable-next-line
  }, [debouncedSearch]);

  // Filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const user = users.find((u) => u.id === task.userId);
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        task.title?.toLowerCase().includes(searchTerm) ||
        user?.name?.toLowerCase().includes(searchTerm);
      const matchesStatus = !statusFilter || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, users, search, statusFilter]);

  // Task actions
  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(setEditingTask(null));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setEditingTask(null));
  };

  const handleEdit = (task) => {
    dispatch(setEditingTask(task));
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (values) => {
    try {
      dispatch(setLoading(true));
      const taskData = {
        ...values,
        taskID: values.id,
        updatedAt: new Date().toISOString(),
      };
      const response = await api.TASKS.update({
        data: taskData,
        taskId: editingTask.id,
      });
      if (response.data) {
        dispatch(updateTask(response.data));
        setIsModalOpen(false);
        dispatch(setEditingTask(null));
        fetchTasks();
      }
    } catch (error) {
      dispatch(setError("Error updating task"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddTask = async (values) => {
    try {
      dispatch(setLoading(true));
      const newTask = {
        ...values,
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
        dueDate: new Date(values.dueDate).toISOString(),
      };
      const response = await api.TASKS.create({ data: newTask });
      if (response.data) {
        dispatch(addTask(response.data));
        setIsModalOpen(false);
        fetchTasks();
      }
    } catch (error) {
      dispatch(setError("Error adding task"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = (taskId) => setDeleteId(taskId);

  const handleConfirmDelete = async () => {
    try {
      dispatch(setLoading(true));
      await api.TASKS.delete({ id: deleteId });
      dispatch(deleteTask(deleteId)); // Remove from Redux state
      setDeleteId(null); // Close the dialog
    } catch (err) {
      dispatch(setError("Delete error"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Sorting logic (if needed)
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key, direction });
  };

  return {
    tasks,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredTasks,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    editingTask,
    handleEdit,
    handleUpdateTask,
    handleAddTask,
    deleteId,
    handleDelete,
setDeleteId,
    handleConfirmDelete,
    handleSort,
    sortConfig,
  };
};