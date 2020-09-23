import { IMenuCommandDefinition } from "./IMenuCommandDefinition";
import { IStateOfPopUp } from "./IStateOfPopUp";

export interface IUiLayer {
    GetStateOfPopUp(): IStateOfPopUp;

}

export interface ICommandDefinitionBucket {

    MenuCommandParamsAr: IMenuCommandDefinition[];
}
