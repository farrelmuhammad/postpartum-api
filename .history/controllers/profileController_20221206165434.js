const { Profiles } = require("../models");

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