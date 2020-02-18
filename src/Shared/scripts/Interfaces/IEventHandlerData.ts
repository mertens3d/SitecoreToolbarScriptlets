import { CommandButtonEvents } from "./CommandButtonEvents";
//export interface IHandlers {
//  External: HandlersExternal,
//  Internal: HandlersInternal,
//}
export interface IEventHandlerData {
    Handler: Function;
    Event: CommandButtonEvents;
    ParameterData: any[];
}
