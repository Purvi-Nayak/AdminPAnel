import React from "react";
import useUsers from "./use-users";
import Table from "../../shared/table";
import CustomModal from "../../shared/custommodal";
import SearchBox from "../../shared/SearchText";

const Users = () => {
  const {
    users,
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
  } = useUsers();

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <div className="w-64">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={columns}
          data={users}
          emptyMessage="No users found"
          className="w-full"
          onSort={handleSort}
          sortConfig={sortConfig}
          itemsPerPage={10}
        />
      )}

      <CustomModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={`Tasks for ${selectedUserName}`}
        size="extra-large"
        className="max-w-8xl bg-gray-300 rounded-lg shadow-lg p-6"
      >
        <div className="mt-4">
          {selectedUserTasks.length > 0 ? (
            <Table
              columns={taskColumns}
              data={selectedUserTasks}
              emptyMessage="No tasks found"
              className="w-full bg-gray-100 max-w-4xl rounded-lg shadow overflow-hidden"
              onRowClick={(row) => {
                if (
                  currentUser?.role === "admin" ||
                  row.userId === currentUser.id
                ) {
                  navigate(`/tasks/${row.id}`);
                }
              }}
              rowClassName="cursor-pointer hover:bg-gray-200"
            />
          ) : (
            <p className="text-center text-gray-500">
              No tasks found for this user
            </p>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default Users;
