const express = require("express")
const router = express.Router()
const {userRegister, userLogin} = require("../controller/user.controller")

router.post("/userRegister",userRegister)
router.post("/userLogin",userLogin)

module.exports = router;