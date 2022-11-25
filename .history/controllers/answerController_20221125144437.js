const { Answers } = require("../models");

const getAnswers = async (req, res) => {
    try {
        const answers = await Answers.findAll();
        res.status(200);
        return res.json({
            message: "Success get all answers",
            statusCode: 200,
            data: answers,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const createAnswer = async (req, res) => {
    const { answer_name, md_user } = req.body;
    try {
        const answers = await Answers.create({
            answer_name,
            md_user
        });
        res.status(201);
        return res.json({
            message: "Success create answers",
            statusCode: 201,
            data: answers,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const updateAnswers = async (req, res) => {
    const { answer, md_user } = req.body;
    const answersId = req.params.id;
    try {
        const answers = await Answers.update({
            answer,
            md_user
        }, {
            where: {
                id: answersId,
            },
        });
        if (!answers) {
            res.status(404);
            return res.json({
                message: "Answers not found",
                statusCode: 404,
            });
        }
        res.status(200);
        return res.json({
            message: "Success update answers",
            statusCode: 200,
            data: answers,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const deleteAnswer = async (req, res) => {
    const answersId = req.params.id;
    try {
        const answers = await Answers.destroy({
            where: {
                id: answersId,
            },
        });
        if (!answers) {
            res.status(404);
            return res.json({
                message: "Answers not found",
                statusCode: 404,
            });
        }
        res.status(200);
        return res.json({
            message: "Success delete answers",
            statusCode: 200,
            data: answers,
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
    getAnswers,
    createAnswer,
    updateAnswers,
    deleteAnswer
}