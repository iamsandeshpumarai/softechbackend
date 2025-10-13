const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
  const token = req.cookies.tokens;
  if (!token) {
    return res.status(401).json({ message: "No Token Found" });
  }

  try {
    const decoded = jwt.verify(token, "ihateyou");
    req.adminId = decoded.id; // Attach admin ID to request
    next();
  } catch (err) {
    console.error("Middleware error:", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = adminMiddleware;
