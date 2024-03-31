import { Observable } from "rxjs";
import { LogEntry } from "./log4a.service";

export type LogAppenderConfig = {
  appenderName: string;
  location: string;
  enable: boolean;
};

export abstract class AbstractLogger {
  location!: string;
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
