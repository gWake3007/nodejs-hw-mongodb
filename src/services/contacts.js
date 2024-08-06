import { Contact } from '../models/contacts.js';

export function getContacts() {
  return Contact.find();
}

export function getContact(contactId) {
  return Contact.findById(contactId);
}

export function createContact(payload) {
  return Contact.create(payload);
}

export function updateContact(contactId, changed) {
  return Contact.findByIdAndUpdate(contactId, changed, {
    new: true,
    runValidators: true,
  });
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}
