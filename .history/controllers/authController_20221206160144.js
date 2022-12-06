const { Users, Profiles } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, name, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const emailRegistered = await isEmailRegistered(email);
        if (emailRegistered) {
            res.status(409);
            return res.json({
                message: "Email already registered!",
                statusCode: 409,
            });    
        }

        await Users.create({
            email,
            name,
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

const isEmailRegistered = (value) => {
    return Users.findOne({
        where: {
            email: value,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userInfo = await isEmailRegistered(email);
        const passwordMatch = await bcrypt.compare(password, userInfo.password);
        
        if(!passwordMatch) {
            res.status(401);
            return res.json({
                message: "Wrong password!",
                statusCode: 401,
            });
        } else {
            const accessToken = generateAccessToken(userInfo);
            const refreshToken = generateRefreshToken(userInfo);
            res.cookie("accessToken", accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });
            res.cookie("refreshToken", refreshToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).json({
                message: "Login success!",
                statusCode: 200,
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        }
    } catch (error) {
        res.status(500);
        return res.json({
            message: "Something went wrong!",
            statusCode: 500,
            error: error.message,
        });
    }
};

// const whoami = async (req, res) => {
//     try {
//         checkToken(req, res);
//     } catch (error) {
//         return res.status(500).json({
//             status: 500,
//             message: "Something went wrong!",
//             error: error.stack,
//         });
//     }
// };

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

const getProfileById = async (req, res) => {
    // const userId = req.params.id;
    try {
        const profile = await Users.findOne({
            where: {
                id: userId,
            }
        })
        res.status(200).json({
            statusCode: 200,
            message: "Get profile success!",
            data: profile,
        });
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const createProfile = async (req, res) => {
    const {
        fullname,
        address,
        phone,
        birth_date,
        age,
        gender,
        email
    } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                username: req.params.username,
            }
        })
        const profile = await Profiles.create({
            fullname,
            userId: user.id,
            address,
            phone,
            birth_date,
            age,
            gender,
            email
        })
        res.status(201).json({
            statusCode: 201,
            message: "Create profile success!",
            data: profile,
        })
    } catch (error) {

    }
}

const updateProfile = async (req, res) => {
    // const user = await Users.findOne({
    //     where: {
    //         id: req.params.id,
    //     }
    // })
    const {
        fullname,
        address,
        phone,
        birth_date,
        age,
        gender,
        email
    } = req.body;
    const userId = req.params.id;
    try {
        const profile = await Profiles.update({
            fullname,
            address,
            phone,
            birth_date,
            age,
            gender,
            email
        }, {
            where: {
                userId: userId,
            },
        }
        )
        res.status(200).json({
            statusCode: 200,
            message: "Update profile success!",
            profileData: profile,
        });
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.message,
        });
    }
};


module.exports = {
    register,
    login,
    createProfile,
    logout,
    getProfileById,
    updateProfile
};