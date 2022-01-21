const { body, param } = require('express-validator');

exports.validateUser = (method) => {
    switch (method) {
        case 'register': {
            return [
                body('firstName', 'First Name is Required').not().isEmpty().trim().escape(),
                body('lastName', 'Last Name is Required').not().isEmpty().trim().escape(),
                body('email', 'Email is Required').isEmail(),
                body('password', 'Password is Required').not().isEmpty().trim().escape(),
                body('phone', 'Phone Number is Required').isMobilePhone().isLength({ min: 10, max: 10 }),
                body('gender', 'Gender is Required').not().isEmpty().trim().escape(),
                body('sequrityQuestion', 'Sequrity Question is Required').not().isEmpty().trim().escape(),
                body('answerForSequrity', 'Answer for Sequrity Question is Required').not().isEmpty().trim().escape(),
            ]
        }

        case 'login': {
            return [
                body('email', 'Email is Required').isEmail(),
                body('password', 'Password is Required').not().isEmpty().trim().escape()
            ]
        }

        case 'getProfile': {
            return [
                param('userId', 'User ID is Required').not().isEmpty().trim().escape()
            ]
        }

        case 'updateProfile': {
            return [
                body('firstName', 'First Name is Required').not().isEmpty().trim().escape(),
                body('lastName', 'Last Name is Required').not().isEmpty().trim().escape(),
                body('gender', 'Gender is Required').not().isEmpty().trim().escape(),
                param('userId', 'User ID is Required').not().isEmpty().trim().escape()
            ]
        }

    }
}