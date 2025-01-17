import { ValidationError } from 'class-validator';

export const formatError = (error: ValidationError[]) => {
  const updatedError: { type: string; messages: string[] }[] = [];

  error.forEach((e) => {
    if (e.constraints) {
      const error = {
        type: e.property,
        messages: Object.values(e.constraints),
      };
      updatedError.push(error);
    }
  });
  return updatedError;
};
