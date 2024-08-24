import User from '../models/user.model.js';

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) return res.status(400).json({ message: 'user not exist' });

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.user);

    if (id !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'you can delete only your account' });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, phone, profession } = req.body;

    if (!name || !email || !phone || !profession) {
      return res.status(404).json({ message: 'please fill all fields' });
    }

    if (id !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'you can update only your account' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        profession,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
