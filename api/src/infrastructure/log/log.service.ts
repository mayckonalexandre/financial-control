import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const { combine, timestamp, json } = winston.format;

export class LoggerService {
  private logger: winston.Logger;
  private loggerConsole = new Logger('LoggerService');

  constructor() {
    const logDirectory = path.resolve(__dirname, '../../../logs/winston');

    if (!fs.existsSync(logDirectory))
      fs.mkdirSync(logDirectory, { recursive: true });

    const fileRotateTransport = new winston.transports.DailyRotateFile({
      dirname: logDirectory,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json(),
        winston.format.printf(
          ({ level, message, timestamp, additionalInfo }) => {
            return `${timestamp} [${level}]: ${message} ${
              additionalInfo ? JSON.stringify(additionalInfo) : ''
            }`;
          },
        ),
      ),
      transports: [fileRotateTransport],
    });
  }

  logConsole(message: string, type: 'error' | 'warn' | 'log') {
    this.loggerConsole[type](message);
  }

  logInfo(message: string, additionalInfo?: any) {
    const correlationKey = uuidv4();
    this.logConsole(`${correlationKey}: ${message}`, 'log');
    this.logger.info({
      message: `${correlationKey}: ${message}`,
      additionalInfo,
    });
  }

  logError(message: string, additionalInfo?: any) {
    const correlationKey = uuidv4();
    this.logConsole(`${correlationKey}: ${message}`, 'error');
    this.logger.error({
      message: `${correlationKey}: ${message}`,
      additionalInfo,
    });
  }
}
