function parseNumber(maybeNumber, defaultNumber) {
  if (typeof maybeNumber !== 'string') {
    return defaultNumber;
  }
  const parsedNumber = parseInt(maybeNumber);

  if (Number.isNaN(parsedNumber)) {
    return defaultNumber;
  }
  return parsedNumber;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 10);

  return {
    page: parsePage,
    perPage: parsePerPage,
  };
}
