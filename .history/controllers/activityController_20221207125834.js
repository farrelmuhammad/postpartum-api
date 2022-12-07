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
        postnatal
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
            postnatal
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