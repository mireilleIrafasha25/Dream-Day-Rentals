import userModel from "../model/userModel.js"

export const authenticateToken = async (req, res, next) => {
  try {
      const token = req.headers.authorization;
      if (!token) {
          return res.status(401).json({ message: 'Unauthorized. Token missing.' });
      }
      // Extract the token from the Authorization header (remove 'Bearer ')
      const accessToken = token.split(' ')[1];
      // Verify the token
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
          }
          const userId = decoded.userId; // Access userId instead of _id
          try {
              const admin = await userModel.findOne({ _id: userId }); // Use userId to query the user
              if (!admin) {
                  return res.status(401).json({ message: 'Unauthorized. User not found.' });
              }
              const role = admin.role;
              if (role === "admin") {
                  // Attach the user object to the request for future use
                  req.user = admin;
                  next(); // Proceed to the next middleware or route handler
              } else {
                  return res.status(403).json({ message: 'Forbidden. Only admin have access.' });
              }
          } catch (error) {
              console.error("Database error:", error);
              return res.status(500).json({ message: 'Internal server error.' });
          }
      });
  } catch (error) {
      console.error("Middleware error:", error);
      return res.status(500).json({ message: 'Internal server error.' });
  }
};