import React from "react";
import { FaPlus, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import CustomButton from "../../shared/custombutton";
import CustomModal from "../../shared/custommodal";
import SearchBox from "../../shared/SearchText";
import CustomMenuButton from "../../shared/custommenu-button";
import TaskForm from "../../components/TaskForm";
import Table from "../../shared/table";
import { useTask } from "./use-task";

const Task = () => {
  const {
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
    loading,
    handleSort,
    sortConfig,
  } = useTask();

  const getTaskMenuItems = (row) => [
    {
      label: "Edit",
      icon: <FaEdit className="text-blue-500" />,
      onClick: () => handleEdit(row),
    },
    {
      label: "Delete",
      icon: <FaTrash className="text-red-500" />,
      onClick: () => handleDelete(row.id),
    },
  ];

  const columns = [
    {
      id: "title",
      label: "Title",
      field_name: "title",
      sortable: true,
      render: ({ row }) => <span className="font-semibold">{row.title}</span>,
    },
    {
      id: "description",
      label: "Description",
      field_name: "description",
    },
    {
      id: "dueDate",
      label: "Due Date",
      field_name: "dueDate",
      sortable: true,
      render: ({ row }) => new Date(row.dueDate).toLocaleDateString(),
    },
    {
      id: "status",
      label: "Status",
      field_name: "status",
      sortable: true,
      render: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
    {
      id: "actions",
      label: "Actions",
      render: ({ row }) => (
        <div className="flex justify-right mr-4">
          <CustomMenuButton
            icon={<FaEllipsisV />}
            items={getTaskMenuItems(row)}
            placement="bottom-left"
            className="text-gray-600"
            buttonClassName="hover:bg-gray-100"
            menuClassName="min-w-[120px]"
            onSelect={(item) => item.onClick()}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className={isModalOpen ? "blur-sm pointer-events-none" : ""}>
        <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
          <CustomButton
            label="Add Task"
            onClick={handleOpenModal}
            className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center space-x-1 shadow-sm"
            icon={<FaPlus className="w-3 h-3" />}
          />
        </div>

        <div className="mb-4 flex gap-4">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table
            columns={columns}
            data={filteredTasks}
            emptyMessage="No tasks found"
            onSort={handleSort}
            sortConfig={sortConfig}
            itemsPerPage={10}
          />
        )}
      </div>

      {/* Delete Modal */}
<CustomModal
  isOpen={Boolean(deleteId)}
  onClose={() => setDeleteId(null)}
  title="Confirm Delete"
  actions={
    <>
      <button
        onClick={() => setDeleteId(null)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
      >
        Cancel
      </button>
      <button
        onClick={handleConfirmDelete}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete
      </button>
    </>
  }
>
  <p className="mt-2 text-black">Are you sure you want to delete this task?</p>
</CustomModal>
      

      {/* Add/Edit Task Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add Task"}
      >
        <TaskForm
          initialValues={
            editingTask || {
              title: "",
              description: "",
              status: "",
              dueDate: new Date().toISOString().split("T")[0],
            }
          }
          onSubmit={async (values) => {
            editingTask
              ? await handleUpdateTask(values)
              : await handleAddTask(values);
            handleCloseModal();
          }}
        />
      </CustomModal>
    </div>
  );
};

export default Task;