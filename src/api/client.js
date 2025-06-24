import client from ".";
import { METHODS } from "../constant";

export const api = {
  USERS: {
    register: ({ data, ...config }) =>
      client({ method: METHODS.POST, url: "/users", data, ...config }),
    login: ({ data, ...config }) =>
      client({
        method: METHODS.GET,
        url: `/users?email=${data.email}&password=${data.password}`,
        ...config,
      }),

    getUsers: (config) =>
      client({
        method: METHODS.GET,
        url: "/users",
        ...config,
      }),
    getAll: (config) =>
      client({
        method: METHODS.GET,
        url: "/users",
        ...config,
      }),
    getUserByEmail: (data, ...config) =>
      client({
        method: METHODS.GET,
        url: `/users?email=${encodeURIComponent(data.email)}`,
        ...config,
      }),

    updateUser: ({ userId, data }) => client({
      method: METHODS.PUT,
      url: `/users/${userId}`,
      data
    }),

    update: (config) =>
      client({
        method: METHODS.PUT,
        url: `/users/${config.userId}`,
        data: {
          ...config.data,
          updatedAt: new Date().toISOString(),
        },
      }),

    updatePassword: ({ userId, data }) =>
      client({
        method: METHODS.PUT,
        url: `/users/${userId}/password`,
        data: {
          ...data,
          updatedAt: new Date().toISOString(),
        },
      }),

    // update: (id, data) => client.put(`/users/${id}`, data),
    delete: (id) => client.delete(`/users/${id}`),
  },
  ADMIN: {
    updateProfile: ({ adminId, data }) =>
      client({
        method: METHODS.PUT,
        url: `/users/${adminId}`,
        data: {
          ...data,
          updatedAt: new Date().toISOString(),
        },
      }),
    verifyPassword: ({ adminId, password, email }) =>
      client({
        method: METHODS.POST,
        url: `/users/verify-password`,
        data: { adminId, password, email },
      }),
  },
  TASKS: {
    getUserTasks: ({ userId, ...config }) =>
      client({
        method: METHODS.GET,
        url: userId ? `/tasks?userId=${userId}` : "/tasks",
        ...config,
      }),
    get: ({ id, ...config }) =>
      client({
        method: METHODS.GET,
        url: `/tasks/${id}`,
        ...config,
      }),
    // Create task
    create: ({ data, ...config }) =>
      client({
        method: METHODS.POST,
        url: "/tasks",
        data: {
          ...data,
          createdAt: new Date().toISOString(),
        },
        ...config,
      }),
    // Admin actions
    updateStatus: ({ taskId, data }) =>
      client({
        method: "PUT",
        url: `/tasks/${taskId}`,
        data,
      }),
    // General actions
    delete: ({ id }) =>
      client({
        method: METHODS.DELETE,
        url: `/tasks/${id}`,
      }),

    update: ({ data, taskId }) =>
      client({
        method: METHODS.PUT,
        url: `/tasks/${taskId}`,
        data,
      }),
    getAllTasks: () =>
      client({
        url: "/tasks",
      }),

    // Search and filter
    search: ({ query, userId, ...config }) =>
      client({
        method: METHODS.GET,
        url: `/tasks?userId=${userId}&title_like=${query}`,
        ...config,
      }),

      
  },
};
