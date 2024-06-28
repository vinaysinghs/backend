import SessionModel from '../Model/SessionModel';

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({
            status: false,
            message: "No token provided.",
            data: []
        });
    }

    try {
        const bearer = token.split(' ')[1];
        const isToken = await SessionModel.findOne({ token: bearer });

        if (!isToken) {
            return res.status(401).json({
                status: false,
                message: 'Token has expired',
                data: []
            });
        }

        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
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
};
