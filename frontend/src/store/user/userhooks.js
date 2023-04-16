import { useAppSelector, useAppAction } from "store/storeUtils";
import { addUser, clearUser } from "./userReducer";

export const useUserStore = () =>
 useAppSelector((state) => state['user']);

 export const useAddUser = () => useAppAction(addUser);
 export const useClearUser = () => useAppAction(clearUser);