import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";

export class CommandToExecuteData extends LoggableBase {
    commandToExecute: Function;
    CommandType: CommandType;
}
