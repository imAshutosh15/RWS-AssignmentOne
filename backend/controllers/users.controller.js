const userModel = require("../models/user.model")
const { validationResult } = require('express-validator');

module.exports = {



    usersList: async (req, res) => {
        try {
            const userProfile = await userModel.find({ userType: "user" }, {});
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
                    message: 'User List',
                    error: '',
                    items: userProfile
                });
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