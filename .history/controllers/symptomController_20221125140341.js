const { Symptoms } = require("../models");

const getSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptoms.findAll();
        res.status(200);
        return res.json({
            message: "Success get all symptoms",
            statusCode: 200,
            data: symptoms,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const getSymptomsById = async (req, res) => {
    const symptomsId = req.params.id;
    try {
        const symptoms = await Symptoms.findOne({
            where: {
                id: symptomsId,
            },
        });
        if (!symptoms) {
            res.status(404);
            return res.json({
                message: "Symptoms not found",
                statusCode: 404,
            });
        }
        res.status(200);
        return res.json({
            message: "Success get symptoms by id",
            statusCode: 200,
            data: symptoms,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        })
    }
}
