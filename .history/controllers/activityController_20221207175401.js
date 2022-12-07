const { Activity } = require("../models");

const createActivity = async (req, res) => {
    const {
        fullname,
        birth_date,
        address,
        email,
        phone,
        gender,
        age,
        postnatal,
        category
    } = req.body;

    try {
        const activity = await Activity.create({
            fullname,
            birth_date,
            address,
            email,
            phone,
            gender,
            age,
            postnatal,
            category
        });
        res.status(201).json({
            statusCode: 201,
            message: "Create activity success!",
            data: activity,
        });
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.message,
        });
    }
}

const getActivity = async (req, res) => {
    try {
        const activity = await Activity.findAll();
        res.status(200);
        return res.json({
            message: "Success get all activity",
            statusCode: 200,
            data: activity,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.message,
        });
    }
}

const getActivityById = async (req, res) => {
    const activityId = req.params.id;
    try {
        const activity = await Activity.findOne({
            where: {
                id: activityId,
            },
        });
        if (!activity) {
            res.status(404);
            return res.json({
                message: "Activity not found",
                statusCode: 404,
            });
        }
        res.status(200);
        return res.json({
            message: "Success get activity by id",
            statusCode: 200,
            data: activity,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.message,
        })
    }
}

module.exports = {
    createActivity,
    getActivity,
    getActivityById
}