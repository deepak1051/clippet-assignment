import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded', decoded);

    console.log(decoded);

    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: 'user no longer exist' });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'invalid or expired token' });
  }
};
