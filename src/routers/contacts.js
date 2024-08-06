import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.patch('/:id', jsonParser, ctrlWrapper(updateContactController));

router.delete('/:id', jsonParser, ctrlWrapper(deleteContactController));

export default router;
