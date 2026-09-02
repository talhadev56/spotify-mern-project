const jwt = require('jsonwebtoken');

async function authArtist(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg :"unauthorized" })
    }
    try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      if(decoded.role !== "artist"){
         return res.status(403).json({
            msg :"you dont have access" })
      }
      req.user = decoded;
      next()
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            msg :"unauthorized" })
    }
}
async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "user") {
            return res.status(403).json({ message: "You don't have access" })
        }
        req.user = decoded;
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authArtist, authUser, auth }