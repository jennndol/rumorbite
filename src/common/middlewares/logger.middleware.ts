import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '../services/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction): void {
    this.logger.log(`Request ${req.url} from ${req.ip} ${req.hostname} using ${req.headers['user-agent']} - [${req.method}]`);
    res.on('close', () => {
      this.logger.log(`Response ${req.url} from ${req.ip} ${req.hostname} - ${res.statusCode}`);
    });
    next();
  }
}