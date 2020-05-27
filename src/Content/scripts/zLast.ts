import { ContentHub } from './Managers/ContentHub';
import { LoggerContentAgent } from './Agents/LoggerContent';

new ContentHub(new LoggerContentAgent());