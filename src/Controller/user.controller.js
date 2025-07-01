import { aysunHandler } from "../utils/aysunHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryupload } from "../utils/cloudnary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = aysunHandler(async (req, res) => {
    const { fullname, email, password,username } = req.body
    // basic logoc in error cheak 
    // if (fullname === "") {
    //     throw new ApiError(400, "fullname is required")
    // }
    
    // advace law in logic error cheak 
    if (
        [fullname, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "fullname is required")
        
    }
    console.log("emial=>", email, fullname ,username , password)


    const existedUser = User.findOne({
        //operater use is ma ek sath hum bhout sari chiza deakh sakta ha 
        $or: [{ username }, { email }]
    })
    if(existedUser){
        throw new ApiError(409, "user With email already exist")

    }
    // console.log("required " , existedUser);
    const avatarLocalpath = req.files.avatar[0]?.path ;
    const coverlocalpath = req.files.coverImage[0]?.path;
    
    if (!avatarLocalpath) {
        throw new ApiError(400, "avatar files is required")
    }
    const avatar = await cloudinaryupload(avatarLocalpath)
    const coverImage = await cloudinaryupload(coverlocalpath)
    

    if (avatar) {
        throw new ApiError(400, "avatar files is required")
    }

    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowercase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500 , "some thing went wrong while register ")
    }

    return res.status(201).json(
        new ApiResponce(200 , createdUser , "user register succesfully")
    )

})

export { registerUser }