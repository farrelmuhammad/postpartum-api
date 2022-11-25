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
    const { answer, md_user } = req.body;
    try {
        const answers = await Answers.create({
            answer,
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