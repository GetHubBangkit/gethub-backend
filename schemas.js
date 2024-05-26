const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} tidak boleh memasukan HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

//* User
exports.userRegisterSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).optional(),
  full_name: Joi.string().required(),
  username: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(20),
  profession: Joi.string().allow("").optional(),
  phone: Joi.string()
    .allow("")
    .pattern(/^\d{10,15}$/)
    .optional(),
  web: Joi.string().allow("").optional(),
  address: Joi.string().allow("").optional(),
  photo: Joi.string().allow("").optional(),
  about: Joi.string().allow("").optional(),
  qr_code: Joi.string().allow("").optional(),
  is_verify: Joi.boolean().optional(),
  is_complete_profile: Joi.boolean().optional(),
  is_premium: Joi.boolean().optional(),
  theme_hub: Joi.number().integer().optional(),
  role_id: Joi.string().guid({ version: "uuidv4" }).optional(),
  sentiment_owner_analisis: Joi.string().allow("").optional(),
  sentiment_owner_score: Joi.number().optional(),
  sentiment_freelance_analisis: Joi.string().allow("").optional(),
  sentiment_freelance_score: Joi.number().optional(),
});

exports.userLoginSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).optional(),
  full_name: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  profession: Joi.string().allow("").optional(),
  phone: Joi.string()
    .allow("")
    .pattern(/^\d{10,15}$/)
    .optional(),
  web: Joi.string().allow("").optional(),
  address: Joi.string().allow("").optional(),
  photo: Joi.string().allow("").optional(),
  about: Joi.string().allow("").optional(),
  qr_code: Joi.string().allow("").optional(),
  is_verify: Joi.boolean().optional(),
  is_complete_profile: Joi.boolean().optional(),
  is_premium: Joi.boolean().optional(),
  theme_hub: Joi.number().integer().optional(),
});