const router = require('express').Router();
const controller = require('../controllers/user');
const userValidators = require('../validator/userValidator');
const cloudinary = require('../middleware/cloudinaryImage');
const authUser = require('../helpers/jwt');

router.get('/users', controller.getAllUsers);
router.get('/:username', controller.getUserByUsername);
router.patch(
  '/:username/profile',
  [userValidators.validateUserExists],
  controller.updateUserProfile
);

router.patch(
  '/:username/image/upload',
  [
    authUser.authUser,
    userValidators.validateUserExists,
    cloudinary.uploadCloudImage('image'),
    cloudinary.deleteCloudImage
  ],
  controller.uploadUserImage
);

module.exports = router;
