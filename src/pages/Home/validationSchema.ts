import { EMAIL_REGX } from "utils/constants";

export type ValidationSchemaType = {
  [key: string]: {
    required: boolean;
    validator?: {
      regex: RegExp;
      error: string;
    };
  };
};
// It has all format for validation schema values

export const validationSchema: ValidationSchemaType = {
  name: {
    required: true,
  },
  email: {
    required: true,
    validator: {
      regex: EMAIL_REGX,
      error: "Email is not valid.",
    },
  },
  rating: {
    required: true,
  },
  comment: {
    required: true,
  },
};
