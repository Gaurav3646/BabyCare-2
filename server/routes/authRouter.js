const express = require('express');
const {createNewUser, loginWithPhoneOtp, verifyPhoneOtp} = require("../controller/authController");
const router = express.Router();


// router.post("/sendotp", sendOtp);
router.post("/register_with_phone", createNewUser);

router.post("/login_with_phone", loginWithPhoneOtp);


router.post("/verify", verifyPhoneOtp);

module.exports = router;
