import jwt from "jsonwebtoken";

export default function AdminAuthMiddleware(req, res, next) {
    try {
        const token = req.cookies.AdminToken;

        if (!token) {
            return res.status(401).json({
                message: "Admin authentication required",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);        

        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required",
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Invalid or expired admin token",
        });
    }
}
