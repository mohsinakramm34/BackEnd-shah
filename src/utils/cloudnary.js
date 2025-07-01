import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});



const cloudinaryupload = async (localfile) => {
    try {
        if (!localfile) return null
        const responce = await cloudinary.uploader.upload(localfile, {
            resource_type: "auto"
        })
        console.log("file ressponce kia wah ",
            responce.url);
        return responce;
    } catch (error) {
        fs.unlinkSync(localfile)
        return null
    }
}


export { cloudinaryupload }