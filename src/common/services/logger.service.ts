import { LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/%DATE%/error.log',
      level: 'error'
    }),
    new transports.DailyRotateFile({
      filename: 'logs/%DATE%/combined.log'
    }),
  ],
});


export class Logger implements LoggerService {
  log(message: string): void {
    logger.info(message);
  }
  error(message: string, trace: string): void {
    logger.error(`${message} -> ${trace}`);
  }
  warn(message: string): void {
    logger.warn(message);
  }
  debug(message: string): void {
    logger.debug(message);
  }
  verbose(message: string): void {
    logger.verbose(message);
  }
}