const router = require("express").Router();
const { getAllTasks, addTask, updateTask, deleteTask } =  require('../controllers/todo');
const { verifyToken } = require('../helpers/jwt');

router.route("/").get(verifyToken, getAllTasks);
router.route("/add").post(verifyToken, addTask);
router.route("/:id").put(verifyToken, updateTask);
router.route("/:id").delete(verifyToken, deleteTask);

module.exports = router;