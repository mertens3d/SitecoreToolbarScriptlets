import { ScWindowType } from "../../../Enums/scWindowType";
import { GuidData } from "../../../Helpers/GuidData";
import { IStateOfContentEditorProxy } from "./IDataStateOfContentEditor";
import { FrameStyling } from "./IFrameStyling";

export interface IStateOfDTFrameProxy {
  StateOfContentEditorProxy: IStateOfContentEditorProxy;
  StorageId: GuidData;
  Styling: FrameStyling;
  WindowType: ScWindowType;
  ZIndex: number
}