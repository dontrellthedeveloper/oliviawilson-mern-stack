require("../firebase");
const admin = require("firebase-admin");

exports.authCheck = async (req, res, next) => {
    console.log(req.headers); // token
    try {

        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);

        req.user = firebaseUser;
        next();

    } catch (err) {
        // console.log(err);
        res.status(401).json({
            err: "Invalid or expired token",
        });
    }
};