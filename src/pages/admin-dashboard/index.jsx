import React from "react";
import CustomButton from "../../shared/custombutton";
import CustomModal from "../../shared/custommodal";
import Table from "../../shared/table";
import CustomMenuButton from "../../shared/custommenu-button";
import SearchBox from "../../shared/SearchText";
import { FaEllipsisV } from "react-icons/fa";
import { useAdminDashboard } from "./use-admindashboard";

const AdminDashboard = () => {
  const {
    users,
    tasks,
    loading,
    search,
    handleSort,
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
  } = useAdminDashboard();

  const columns = [
    {
      id: "title",
      label: "Task",
      sortable: true,
      render: ({ row }) => <div className="px-6 py-4">{row.title}</div>,
    },
    {
      id: "user",
      label: "User",
      sortable: true,
      render: ({ row }) => {
        const user = users?.find((u) => u.id === row.userId);
        return <div className="px-6 py-4">{user?.name || "Unknown"}</div>;
      },
    },
    {
      id: "status",
      label: "Status",
      sortable: true,
      render: ({ row }) => (
        <div className="px-6 py-4">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            {row.status}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      render: ({ row }) => (
        <div className="px-6 py-4 flex justify-end">
          <CustomMenuButton
            icon={<FaEllipsisV />}
            items={getTaskMenuItems(row)}
            buttonClassName="text-gray-600"
            onSelect={(item) => item.onClick()}
          />
        </div>
      ),
    },
  ];

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {selectedUserId ? "User Tasks" : "All Tasks"}
        </h2>
        {selectedUserId && (
          <CustomButton
            label="Show All"
            onClick={() => navigate("/admin")}
            className="bg-gray-500 text-white"
          />
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Table
        columns={columns}
        data={tasks}
        onSort={handleSort}
        sortConfig={sortConfig}
        itemsPerPage={5}
      />

      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={successMessage ? "Success" : "Error"}
      >
        <div className="text-center text-sm">
          {successMessage || errorMessage}
        </div>
      </CustomModal>

      <CustomModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        title="Confirm Delete"
        className="bg-white-pure text-white"
        actions={
          <>
            <button
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="mt-2 text-black">
          Are you sure you want to delete this task?
        </p>
      </CustomModal>
    </div>
  );
};

export default AdminDashboard;