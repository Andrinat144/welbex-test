import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { formatError } from '@/helpers/formatErrors';

type Constructor<T> = { new (): T };

export const ValidateDto = <T extends object>(dtoClass: Constructor<T>) => {
  return function (_target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value as RequestHandler;
    if (typeof originalMethod === 'function') {
      descriptor.value = async function async(req: Request, res: Response, next: NextFunction) {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject, { whitelist: true });
        if (errors.length > 0) {
          res.status(400).send(formatError(errors));
          return;
        }
        req.body = dtoObject;
        originalMethod.apply(this, [req, res, next]);
      };

      return descriptor;
    }
    throw Error(`${propertyKey} is not a function`);
  };
};
