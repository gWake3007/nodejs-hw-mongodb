import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  const { id } = req.params;

  if (isValidObjectId(id) !== true) {
    return next(createHttpError.NotFound('Id is not valid!'));
  }
  next();
}
