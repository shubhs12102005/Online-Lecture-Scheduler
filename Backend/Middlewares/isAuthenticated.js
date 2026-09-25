import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Taking token from cookies
        const token = req.cookies.token;
        console.log("Token from cookies: ", token);
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verifying it
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // If decode is null or incorrect, then user is not authenticated
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false,
            });
        }

        // Set the user id int the request object
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized User" });
    }
}