const {Router} = require('express')
const userController = require('../controllers/userController')
const { protectRoutes } = require('../middleware/authMiddleware')
const multerUpload = require('../config/multer')
const router = Router()

router.route('/signin').post(userController.signin_post)
router.route('/signup').post(multerUpload.single('profilePicture'),userController.signup_post)
router.route('/logout').get(userController.logout_get)
router.route('/user').post(protectRoutes,userController.user_get)
router.route('/uploadProfilePicture').post(multerUpload.single('profilePicture'),userController.uploadProfilePicture_post)
router.route('/profilePicture/:username').get(userController.profilePicture_get)

module.exports = router