import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET (request: Request){
    await dbConnect();

    try {
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log("result of username valid: ", result);

        if(!result.success){
            const usernameErors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErors?.length > 0 ? usernameErors.join(', '): "Invalid query parameters",
            }, {status: 400})
        }

        const {username} = result.data;
        console.log("username result unique ",username);

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: "Username is already taken"
            },{status: 400})
        }

        return Response.json({
            success: true,
            message: "Username is unique"
        }, {status: 200});


        
    } catch (error) {
        console.error("Error checking username validation", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        }, {status: 500});
    }

}