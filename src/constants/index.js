export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000;
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  SERVER: process.env.SMTP_SERVER,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
};
