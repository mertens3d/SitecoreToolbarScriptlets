import { IScContentTreeNodeLineage } from "../../Interfaces/Data/IScContentTreeNodeLineage";
import { IScIcon } from "../../Interfaces/Data/IScIcon";
import { DefaultScIcon } from "./DefaultScIcon";

export class DefaultScContentTreeNodeLineage implements IScContentTreeNodeLineage {
  L1Icon: IScIcon = new DefaultScIcon();
  L1Text = '';
  L2Icon: IScIcon = new DefaultScIcon();
  L2Text: string = '';
}