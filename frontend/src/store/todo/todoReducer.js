import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoReducer = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addIntialTasks: (state, action) => {
            return state = action.payload
          },
          addNewTask: (state, action) => {
            state.push(action.payload)
          },
          updateTask: (state, action) => {
            return state = state.map((task) =>
              task.id === action.payload.id ? { ...task, ...action.payload } : task,
            );
          },
          deleteTask: (state, action) => {
            return state = state.filter((task) => task.id !== action.payload.id)
          },
          clearTasks: (state) => {
            return state = []
          }
    }
});

export const { addIntialTasks, addNewTask, updateTask, deleteTask, clearTasks } = todoReducer.actions;
export default todoReducer.reducer;