// 

const isAuthenticated = (req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    // Bypass authentication for Jest
    return next();
  }

  if (req.session.user === undefined) {
    return res.status(401).json({ message: "You do not have access." });
  }
  next();
};

module.exports = { isAuthenticated };
