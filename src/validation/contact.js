import Joi from 'joi';

// export const contactSchema = Joi.object({
//   phoneNumber: Joi.string()
//     .pattern(/^\+?[0-9]{9,13}$/)
//     .required()
//     .messages({
//       'string.pattern.base':
//         'PhoneNumber should be between 9 and 13 digits and can optionally start with +!',
//       'any.required': 'PhoneNumber is required!',
//     }),
// });

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string!',
    'string.min': 'Name should be at least {#limit} characters long',
    'string.max': 'Name should be at most {#limit} characters long',
    'any.required': 'Name is required!',
  }),
  phoneNumber: Joi.alternatives()
    .try(
      Joi.string()
        .pattern(/^\+?\d{9,13}$/)
        .messages({
          'string.pattern.base': 'PhoneNumber should be a valid phone number!',
        }),
      Joi.number().integer().min(100000000).max(9999999999999).messages({
        'number.base': 'PhoneNumber should be a number!',
        'number.min': 'PhoneNumber should be at least {#limit} digits long',
        'number.max': 'PhoneNumber should be at most {#limit} digits long',
      }),
    )
    .required()
    .messages({
      'any.required': 'PhoneNumber is required!',
    }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address!',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite should be either true or false!',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type should be a string!',
      'any.required': 'Contact type is required!',
      'any.only': 'Contact type should be one of {#valids}!',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.base': 'Name should be a string!',
    'string.min': 'Name should be at least {#limit} characters long',
    'string.max': 'Name should be at most {#limit} characters long',
  }),
  phoneNumber: Joi.alternatives()
    .try(
      Joi.string()
        .pattern(/^\+?\d{9,13}$/)
        .messages({
          'string.pattern.base': 'PhoneNumber should be a valid phone number!',
        }),
      Joi.number().integer().min(100000000).max(9999999999999).messages({
        'number.base': 'PhoneNumber should be a number!',
        'number.min': 'PhoneNumber should be at least {#limit} digits long',
        'number.max': 'PhoneNumber should be at most {#limit} digits long',
      }),
    )
    .optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address!',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite should be either true or false!',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .messages({
      'string.base': 'Contact type should be a string!',
      'any.only': 'Contact type should be one of {#valids}!',
    }),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');
