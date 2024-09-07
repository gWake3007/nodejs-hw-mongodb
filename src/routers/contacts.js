import express from 'express';
import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';
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

router.get('/:id', isValidId, ctrlWrapper(getContactController));

router.post(
  '/',
  jsonParser,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:id',
  isValidId,
  jsonParser,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/:id',
  isValidId,
  jsonParser,
  ctrlWrapper(deleteContactController),
);

export default router;
