const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  console.log(req.cookies.tokens,'is the cookies')
  try {
    let token;

    // Check Authorization header
    
    
    if (req.cookies && req.cookies.tokens) {
      token = req.cookies.tokens;
    }

    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verify token
    const decoded = jwt.verify(token, "ihateyou");
    req.id = decoded.id; 
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
