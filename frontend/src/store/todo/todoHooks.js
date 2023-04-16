import { useAppSelector, useAppAction } from "store/storeUtils";

import { addIntialTasks, addNewTask, updateTask, deleteTask, clearTasks} from "./todoReducer";

export const useTodoStore = () =>
 useAppSelector((state) => state['todo']);


 export const useAddInitialTask = () => useAppAction(addIntialTasks);
 export const useAddNewTask = () => useAppAction(addNewTask);
 export const useUpdateTask = () => useAppAction(updateTask);
 export const useDeleteTask = () => useAppAction(deleteTask);
 export const useClearTasks = () => useAppAction(clearTasks);