import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res, next) {
  const { id } = req.params;

  const contact = await getContact(id);

  if (contact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }
  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const createdContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
}

export async function updateContactController(req, res, next) {
  const { id } = req.params;
  const changed = req.body;

  const changedContact = await updateContact(id, changed);

  if (changedContact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: changedContact,
  });
}

export async function deleteContactController(req, res, next) {
  const { id } = req.params;

  const contactDelete = await deleteContact(id);

  if (contactDelete === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }

  res.status(204).end();
}
