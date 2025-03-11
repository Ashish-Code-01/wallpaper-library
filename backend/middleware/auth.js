const clerk = require('@clerk/clerk-sdk-node');

/**
 * Middleware to verify the Clerk user token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireAuth = async (req, res, next) => {
  try {
    // Get the session token from the headers
    const authHeader = req.headers.authorization || '';
    
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required. Bearer token missing.' });
    }
    
    const token = authHeader.split(' ')[1];  // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Authentication required. Token missing.' });
    }

    try {
      // Verify the token with Clerk
      const session = await clerk.verifyToken(token);
      
      if (!session) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      
      // Add the user ID to the request
      req.auth = {
        userId: session.sub,
        sessionId: session.sid
      };
      
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Optional auth middleware that doesn't block requests without auth
 * but adds user info to the request if available
 */
const optionalAuth = async (req, res, next) => {
  try {
    // Get the session token from the headers
    const authHeader = req.headers.authorization || '';
    
    if (!authHeader.startsWith('Bearer ')) {
      req.auth = null;
      return next();
    }
    
    const token = authHeader.split(' ')[1];  // Bearer TOKEN

    if (!token) {
      // Continue without auth
      req.auth = null;
      return next();
    }

    try {
      // Verify the token with Clerk
      const session = await clerk.verifyToken(token);
      
      if (!session) {
        req.auth = null;
        return next();
      }
      
      // Add the user ID to the request
      req.auth = {
        userId: session.sub,
        sessionId: session.sid
      };
    } catch (error) {
      // Continue without auth on verification failure
      console.error('Optional auth error:', error);
      req.auth = null;
    }
    
    next();
  } catch (error) {
    // Continue without auth on any error
    console.error('Optional auth error:', error);
    req.auth = null;
    next();
  }
};

module.exports = { requireAuth, optionalAuth }; 