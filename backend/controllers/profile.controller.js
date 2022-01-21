const userModel = require("../models/user.model")
const { validationResult } = require('express-validator');

module.exports = {



    getProfile: async (req, res) => {
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
                const userProfile = await userModel.findOne({ '_id': req.params.userId });
                if (!userProfile) {
                    res.status(200);
                    res.json({
                        status: false,
                        subCode: 404,
                        message: 'Not found',
                        error: '',
                        items: {}
                    });
                } else {
                    res.status(200);
                    res.json({
                        status: true,
                        subCode: 200,
                        message: 'User Profile',
                        error: '',
                        items: userProfile
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

    updateProfile: async (req, res) => {
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
                const profileUpdate = await userModel.findOneAndUpdate({_id : req.params.userId}, req.body);
                if (!profileUpdate) {
                    res.status(200);
                    res.json({
                        status: false,
                        subCode: 400,
                        message: 'Profile not Updated',
                        error: '',
                        items: {}
                    });
                } else {
                    res.status(200);
                    res.json({
                        status: true,
                        subCode: 200,
                        message: 'Profile Updated Successfully',
                        error: '',
                        items: profileUpdate
                    });
                }
            }
        } catch (error) {
            console.log(error);
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