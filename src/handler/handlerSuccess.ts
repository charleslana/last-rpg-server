import { Response } from 'express';

export default class HandlerSuccess {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 200) {
    this.message = message;
    this.statusCode = statusCode;
  }

  toJSON(response: Response) {
    return response.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
    });
  }
}
