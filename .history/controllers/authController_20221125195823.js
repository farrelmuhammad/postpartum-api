const { Users, Profile } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "username", "role"],
            include: {
                model: Profile,
                required: true,
                attributes: [
                    "fullname",
                    "address",
                    "phone",
                    "birth_date",
                    "gender",
                    "age"
                ],
            },
        });
        res.status(200);
        return res.json({
            message: "Success get all users",
            statusCode: 200,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await Users.findOne({
            attributes: ["id", "username", "role"],
            include: {
                model: Profile,
                required: true,
                attributes: [
                    "name",
                    "address",
                    "phone",
                    "age",
                    "gender",
                    "email"
                ],
            },
            where: {
                id: userId,
            },
        });
        if (!users) {
            res.status(404);
            return res.json({
                message: "User does not exist",
                statusCode: 404,
            });
        } else {
            res.status(200);
            return res.json({
                message: "Success get user",
                statusCode: 200,
                data: users,
            });
        }
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
};

const register = async (req, res) => {
    const { username, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username,
            password: hashPassword,
            role,
        });
        res.status(201).json({
            message: "Register success!",
        });
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    // const { username, password } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username,
            }
        })
        if (!user) {
            res.status(404);
            return res.json({
                message: "Email is not registered!",
                statusCode: 404,
            });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401);
            return res.json({
                message: "Username or password do not match!",
                statusCode: 401,
            });
        }
        req.user = { id: user.id, username: user.username, role: user.role };
        const refreshToken = jwt.sign(
            { userId: req.user.id, username: req.user.username, role: req.user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        const accessToken = jwt.sign(
            { userId: req.user.id, username: req.user.username, role: req.user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        console.log("Your path ", req._parsedUrl.pathname);

        return res.status(200).json({
            statusCode: 200,
            message: "Login success!",
            accessToken: accessToken,
        });
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
};

const whoami = async (req, res) => {
    try {
        checkToken(req, res);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
};

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (!refreshToken) {
            return res.sendStatus(204);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        req.logout();
        res.status(200);
        return res.json({
            statusCode: 200,
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
};

const updateProfile = async (req, res) => {
    const {
        name,
        address,
        phone,
        age,
        gender,
        email
    } = req.body;
    try {
        if (!req.user.userId) {
            res.status(403);
            return res.json({
                message: "Cannot update profile!",
                statusCode: 403,
            });
        }
        if (!name || !age || !address || !phone || !gender || !email) {
            res.status(400);
            return res.json({
                status: 400,
                message: "Please fill in each input field!",
            });
        }

        await Profile.update(
            {
                name,
                address,
                phone,
                age,
                gender,
                email
            },
            {
                where: {
                    UserId: req.user.userId,
                },
            }
        );
        const afterUpdate = await Profile.findOne({
            attributes: [
                "name",
                "address",
                "phone",
                "age",
                "gender",
                "email"
            ],
            where: {
                UserId: req.user.userId,
            },
        });
        res.status(200);
        return res.json({
            message: "Update profile Success!",
            statusCode: 200,
            data: afterUpdate,
        });
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
};


module.exports = {
    getUsers,
    getUserById,
    register,
    login,
    whoami,
    logout,
    updateProfile
};