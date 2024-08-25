import { Contact } from '../models/contacts.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  parentId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactQuery.where('parentId').equals(parentId);

  const [count, contacts] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
}

export function getContact(contactId, userId) {
  return Contact.findById({ _id: contactId, userId });
}

export function createContact(payload) {
  return Contact.create(payload);
}

export function updateContact(contactId, userId, changed) {
  return Contact.findByIdAndUpdate({ _id: contactId, userId }, changed, {
    new: true,
    runValidators: true,
  });
}

export function deleteContact(contactId, userId) {
  return Contact.findByIdAndDelete({ _id: contactId, userId });
}
