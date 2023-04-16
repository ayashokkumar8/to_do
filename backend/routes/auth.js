const router = require("express").Router();
const { login, register, getUser } =  require('../controllers/auth');
const { verifyToken } = require('../helpers/jwt');

router.post('/login', login);
router.post('/register', register);
router.route("/signed").get(verifyToken, getUser);

module.exports = router;