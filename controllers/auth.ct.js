import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  try {
    const { name, email, phone, profession, password } = req.body;

    if (!name || !email || !phone || !profession || !password) {
      return res.status(404).json({ message: 'please fill all fields' });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist)
      return res.status(404).json({ message: 'user already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
      phone,
      profession,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signin = async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(req.body);
    if (!password || !email) {
      return res.status(404).json({ message: 'please fill all fields' });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'invalid credentails' });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res.status(404).json({ message: 'invalid credentails' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
