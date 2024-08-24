import express from 'express';
import {
  getAllUser,
  deleteUser,
  editUser,
  getUser,
} from '../controllers/user.ct.js';
import { auth } from '../middleware/auth.md.js';

const router = express.Router();

router.get('/', auth, getAllUser);
router.get('/:id', auth, getUser);

router.patch('/:id', auth, editUser);

router.delete('/:id', auth, deleteUser);

export default router;
