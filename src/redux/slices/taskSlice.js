// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   tasks: [],
//   isModalOpen: false,
//   editingTask: null,
//   loading: false,
//   error: null
// };

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push({
//         ...action.payload,
//         userId: action.payload.userId,
//         userToken: action.payload.userToken 
//       });
//     },
//      updateTask: (state, action) => {
//       const index = state.tasks.findIndex(task => task.id === action.payload.id);
//       if (index !== -1) {
//         state.tasks[index] = action.payload;
//       }
//     },
//     // deleteTask: (state, action) => {
//     //   state.tasks = state.tasks.filter(task => 
//     //     !(task.id === action.payload.taskId && 
//     //       task.userToken === action.payload.userToken)
//     //   );
//     // },
//   // In your taskSlice.js
// deleteTask: (state, action) => {
//   state.tasks = state.tasks.filter(task => task.id !== action.payload);
// },
//     setModalOpen: (state, action) => {
//       state.isModalOpen = action.payload;
//     },
//     setEditingTask: (state, action) => {
//       state.editingTask = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     }

//   }
// });

// export const { 
//   addTask, 
//   updateTask, 
//   deleteTask, 
//   setModalOpen, 
//   setEditingTask,
//   setLoading,
//   setError
// } = taskSlice.actions;

// export default taskSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isModalOpen: false,
  editingTask: null,
  loading: false,
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getAllTasks: (state, action) => {
      state.tasks.push({
        ...action.payload,
        userId: action.payload.userId,
        userToken: action.payload.userToken 
      });
    },
       setTasks: (state, action) => {
      state.tasks = action.payload; // <-- Set the full array from backend
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload); // <-- Use backend's response (with id)
    },
     updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    // deleteTask: (state, action) => {
    //   state.tasks = state.tasks.filter(task => 
    //     !(task.id === action.payload.taskId && 
    //       task.userToken === action.payload.userToken)
    //   );
    // },
  // In your taskSlice.js
deleteTask: (state, action) => {
  state.tasks = state.tasks.filter(task => task.id !== action.payload);
},
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }

  }
});

export const { 
  addTask,
  getAllTasks, 
  updateTask, 
  deleteTask, 
  setModalOpen, 
  setEditingTask,
  setLoading,
  setError
} = taskSlice.actions;

export default taskSlice.reducer;