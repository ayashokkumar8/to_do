const { User, Todo } = require('../db/models')
const errorHandler = require('../helpers/errorhandler');

class TodoController {
    
    async getAllTasks(req, res) {
        const tasksInfo = await Todo.findAll({
            where: {
                UserId: req.query.id,
            },
        });
        res.status(200).send(tasksInfo);
    };

    async addTask(req, res) {
        try {
            const task = await Todo.upsert({
                ...req.body
            });
            res.status(200).send(task[0]);

        } catch (error) {
            errorHandler.internalServerError(res);
        }
    };

    async updateTask(req, res) {
        const id = req.params.id
        const taskInfo = {
            status: req.body.status,
        }

        try {
            if (id) {
                await Todo.update(taskInfo, {
                    where: {
                        id,
                    }
                })

                errorHandler.success(res, 'success', taskInfo)
            } else {
                errorHandler.badRequest(res, 'task details not found')
            }
        } catch (e) {
            errorHandler.internalServerError(res)
        }
    }

    async deleteTask(req, res) {
        const id = req.params.id
        try {
            if (id) {
                await Todo.destroy({
                    where: {
                        id
                    }
                })
                res.status(200).send('ok')
            } else {
                errorHandler.badRequest(res, 'task details not found')
            }
        } catch (error) {
            errorHandler.internalServerError(res)
        }
    }

};

module.exports = new TodoController();