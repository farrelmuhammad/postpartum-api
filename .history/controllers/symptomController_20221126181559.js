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
            error: error.message,
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

const createSymptoms = async (req, res) => {
    const { symptom_name, mb_symptom } = req.body;
    try {
        const symptoms = await Symptoms.create({
            symptom_name,
            mb_symptom
        });
        res.status(201);
        return res.json({
            message: "Success create symptoms",
            statusCode: 201,
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

const updateSymnptoms = async (req, res) => {
    const symptomsId = req.params.id;
    const { symptom_name, mb_symptom } = req.body;
    try {
        const symptoms = await Symptoms.update({
            symptom_name,
            mb_symptom
        }, {
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
            message: "Success update symptoms",
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

const deleteSymptoms = async (req, res) => {
    const symptomsId = req.params.id;
    try {
        const symptoms = await Symptoms.destroy({
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
            message: "Success delete symptoms",
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

module.exports = {
    getSymptoms,
    getSymptomsById,
    createSymptoms,
    updateSymnptoms,
    deleteSymptoms
}
