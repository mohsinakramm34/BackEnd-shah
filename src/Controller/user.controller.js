import { aysunHandler } from "../utils/aysunHandler.js";

const registerUser = aysunHandler(async (req, res) => {
    res.status(200).json({
        message: "syed Mohsin shah"
    })
})

export {registerUser}