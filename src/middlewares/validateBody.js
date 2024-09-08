import createHttpError from 'http-errors';

// export function validateBody(schema) {
//   return async (req, res, next) => {
//     const result = await schema.validate(req.body, { abortEarly: false });

//     if (typeof result.error !== 'undefined') {
//       return next(
//         createHttpError(
//           400,
//           result.error.details.map((err) => err.message).join(', '),
//         ),
//       );
//     }
//     next();
//   };
// }

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (err) {
      next(
        createHttpError(
          400,
          err.details.map((detail) => detail.message).join(','),
        ),
      );
    }
  };
}
