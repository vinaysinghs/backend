import Jwt from "jsonwebtoken";
//import { JWT_KEY } from "../config/CommonConfig";
import SessionModel from "../Model/SessionModel";

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    const token = req?.headers?.['authorization'];
    if (!token) {
        return res.status(400).json({
            status: false,
            message: "No token provided.",
            data: []
        })
    }

    try {
        const bearer = token?.split(' ').pop();
        const isToken = await SessionModel.find({ token: bearer });
        console.log("isToken>>>>>>>>>>>>>>>>>>>>>>>>>>>>",isToken)
        //const decoded = Jwt.verify(bearer, JWT_KEY)
        //req.user = decoded;
        //next()
        if(isToken?.length==0){
            return res.status(401).json({
                status: false,
                message: 'Token has expired',
                data: []
            });
        }else{
            return true;
        }
        
    } catch (error: any) {
        if (error?.name === 'TokenExpiredError') {
            return res.status(401).send({
                status: false,
                message: 'Token has expired',
                data: []
            });
        } else {
            return res.status(401).send({
                status: false,
                message: 'Invalid Token',
                data: []
            });
        }
    }
}