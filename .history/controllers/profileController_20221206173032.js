const { Profiles, Users } = require("../models");

const getProfile = async (req, res) => {
    try {
        const profile = await Profiles.findAll({
            include: {
                model: Users,
                attributes: ["id", "email", "role"],
                required: true
            }
        });
        res.status(200);
        return res.json({
            message: "Success get all profile",
            statusCode: 200,
            data: profile,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.message,
        });
    }
}

const createProfile = async (req, res) => {
    const { fullame, age, phone, address, UserId, gender } = req.body;
    try {
        const user = await Users.findOne()
        const profile = await Profiles.create({
            fullname, 
            age, 
            phone, 
            address, 
            UserId: user.id, 
            gender
        });
        res.status(201);
        return res.json({
            message: "Success create profile",
            statusCode: 201,
            data: profile,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.message,
        });
    }
}

module.exports = {
    getProfile,
    createProfile
}