function parseString(maybeString) {
  if (typeof maybeString !== 'string') {
    return undefined;
  }
  return maybeString.trim();
}

function parseBoolean(maybeBoolean) {
  if (typeof maybeBoolean !== 'string') {
    return undefined;
  }

  if (maybeBoolean.toLowerCase() === 'true') {
    return true;
  }

  if (maybeBoolean.toLowerCase() === 'false') {
    return false;
  }
  return undefined;
}

export function parseFilterParams(query) {
  const { contactType, isFavourite } = query;

  const parsedContactsType = parseString(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedContactsType,
    isFavourite: parsedIsFavourite,
  };
}
