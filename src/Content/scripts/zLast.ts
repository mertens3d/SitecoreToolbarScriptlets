import { ContentHub } from './Managers/ContentHub';
import { LoggerContent } from "./Classes/LoggerContent";
import { LogLevel } from '../../Shared/scripts/Enums/LogLevel';

let logger = new LoggerContent(LogLevel.Enabled);
new ContentHub( logger);