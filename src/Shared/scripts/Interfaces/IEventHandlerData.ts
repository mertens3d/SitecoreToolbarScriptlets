import { CommandButtonEvents } from "../Enums/CommandButtonEvents";
//export interface IHandlers {
//  External: HandlersExternal,
//  Internal: HandlersInternal,
//}
export interface IEventHandlerData {
    Handler: Function;
    Event: CommandButtonEvents;
    ParameterData: any[];
}
