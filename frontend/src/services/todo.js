import { fetchData, patchData, postData, putData, deleteData } from 'plugins/api';

class TodoService {
    static async getAllTodoList(data) {
        return await fetchData('/todo', {params: data})
    }

    static async addTask(task) {
        return postData('/todo/add', task)
    }

    static async updateTask(id, task) {
        return await putData(`/todo/${id}`, task)
    }

    static async deleteTask(id) {
        return await deleteData(`/todo/${id}`)
    }
};

export default TodoService;