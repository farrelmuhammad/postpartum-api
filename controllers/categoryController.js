const { Category } = require("../models");

const getCategory = async (req, res) => {
    try {
        const category = await Category.findAll();
        res.status(200);
        return res.json({
            message: "Success get all category",
            statusCode: 200,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findOne({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            res.status(404);
            return res.json({
                message: "Category not found",
                statusCode: 404,
            });
        }
        res.status(200);
        return res.json({
            message: "Success get category by id",
            statusCode: 200,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        })
    }
}

const createCategory = async (req, res) => {
    const { category_name, description, solution } = req.body;
    try {
        const category = await Category.create({
            category_name,
            description,
            solution
        });
        res.status(201);
        return res.json({
            message: "Success create category",
            statusCode: 201,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { category_name, description, solution } = req.body;
    try {
        const category = await Category.findOne({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            res.status(404);
            return res.json({
                message: "Category not found",
                statusCode: 404,
            });
        }
        await Category.update(
            {
                category_name,
                description,
                solution
            },
            {
                where: {
                    id: categoryId,
                },
            }
        );
        res.status(200);
        return res.json({
            message: "Success update category",
            statusCode: 200,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.destroy({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            res.status(404);
            return res.json({
                message: "Category not found",
                statusCode: 404,
            });
        }
        await Category.destroy({
            where: {
                id: categoryId,
            },
        });
        res.status(200);
        return res.json({
            message: "Success delete category",
            statusCode: 200,
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
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}