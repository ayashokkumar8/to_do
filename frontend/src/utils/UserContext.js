import { createContext, useEffect } from 'react'
import { AuthService, TodoService } from 'services';
import { useAddUser } from 'store/user/userhooks';
import { useAddInitialTask } from 'store/todo/todoHooks';

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const addUser = useAddUser();
    const addIntialTasks = useAddInitialTask();
    useEffect(() => {
        AuthService.fetchUser().then((user) => {
          if (user) {
            addUser(user);
            TodoService.getAllTodoList({ id: user.id })
            .then(data => {
              addIntialTasks(data)
            })
          }
        })
      }, [addUser, addIntialTasks])
    
  return (
    <UserContext.Provider value={''}>
    {children}
  </UserContext.Provider>
  )
};


export default UserContext;