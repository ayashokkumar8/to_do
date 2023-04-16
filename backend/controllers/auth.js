const bcrypt = require('bcryptjs')
const { User } = require('../db/models')
const { hashPassword } = require('../helpers/hashpassword')
const { generateToken } = require('../helpers/jwt')
const errorHandler = require('../helpers/errorhandler')

class AuthController {
    async register(req, res) {
        try {
            const rawData = req.body;
            const hashedPassword = await hashPassword(rawData.password);
            const user = await User.build({
                email: rawData.email,
                fullname: rawData.fullname,
                password: hashedPassword,
            })
            await user.save();
            res.status(200).send('ok');
        } catch (error) {
            errorHandler.internalServerError(res);
        }
    };

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const foundUser = await User.findOne({
                where: {
                    email,
                }
            });
            if (!foundUser) {
                errorHandler.badRequest(res, 'Incorrect user')
                return;
            }

            const passwordMatch = await bcrypt.compare(password, foundUser.password)

            if (!passwordMatch) {
                errorHandler.badRequest(res, 'Incorrect password')
                return;
            }
            const maxAge = 8 * 60 * 60;
            const token = generateToken(foundUser.id)

            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000, // 3hrs in ms
            });

            const user = {
                id: foundUser.id,
                fullname: foundUser.fullname,
                email: foundUser.email
            };
            res.json({ user, token })

        } catch (error) {
            errorHandler.internalServerError(res)
        }
    };

    async getUser(req, res) {
        const id = req.userId ? req.userId : req.params.id;
        const foundUser = await User.findByPk(id);
        if (foundUser) {
            const user = {
                id: foundUser.id,
                fullname: foundUser.fullname,
                email: foundUser.email
            };
            res.status(200).send(user);
        } else {
            errorHandler.badRequest(res, 'User Not Found');
            return;
        }
        
    }
};

module.exports = new AuthController();