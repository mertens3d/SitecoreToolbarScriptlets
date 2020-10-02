import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";

export class CommandToExecuteData extends _HindeCoreBase {
    commandToExecute: Function;
    CommandType: CommandType;
}
