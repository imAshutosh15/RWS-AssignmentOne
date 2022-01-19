const userModel = require("../models/user.model")
const { validationResult } = require('express-validator');

module.exports = {

    //function for registration of user
    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(200);
                res.json({
                    status: false,
                    subCode: 400,
                    message: 'All Fields Required',
                    error: errors.array(),
                    items: {}
                });
            } else {
                const existData = await userModel.findOne({ $or: [{ 'email': req.body.email }, { 'phone': req.body.phone }] });
                if (!existData) {
                    const userData = new userModel(req.body);
                    const result = await userData.save();
                    if (result) {
                        res.status(200);
                        res.json({
                            status: true,
                            subCode: 200,
                            message: 'User Registered Successfully',
                            error: "",
                            items: result
                        });
                    } else {
                        res.status(200);
                        res.json({
                            status: false,
                            subCode: 400,
                            message: 'Sorry ! Please try Again',
                            error: result,
                            items: {}
                        });
                    }
                } else {
                    res.status(200);
                    res.json({
                        status: false,
                        subCode: 400,
                        message: 'Phone / Email Already exist',
                        error: '',
                        items: {}
                    });
                }
            }
        } catch (error) {
            res.status(200);
            res.json({
                status: false,
                subCode: 500,
                message: 'Something went Wrong',
                error: error,
                items: {}
            });
        }
    },

    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(200);
                res.json({
                    status: false,
                    subCode: 400,
                    message: 'All Fields Required',
                    error: errors.array(),
                    items: {}
                });
            } else {
                const existData = await userModel.findOne({ 'email': req.body.email, 'password': req.body.password });
                if (!existData) {
                    res.status(200);
                    res.json({
                        status: false,
                        subCode: 400,
                        message: 'Invalid Credentials',
                        error: '',
                        items: {}
                    });
                } else {
                    res.status(200);
                    res.json({
                        status: true,
                        subCode: 200,
                        message: 'Logged In Successfully',
                        error: '',
                        items: existData
                    });
                }
            }
        } catch (error) {
            res.status(200);
            res.json({
                status: false,
                subCode: 500,
                message: 'Something went Wrong',
                error: error,
                items: {}
            });
        }
    }
}