const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");


dotenv.config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers['authorization'];

  //Check for token
  if (!token) res.status(401).json({ msg: "no token, unauthorized" });
    // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
      console.log(decoded);
      req.users = decoded;
  });
    //Add user from payload
  next();
  
}

async function checkUser(req, res, next){
    try {
      const token = req.headers['authorization'];
      if (!token) res.status(401).json({msg: "no token, unauthorized"});
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  
    next();
}






module.exports = {authMiddleWare, checkUser};
