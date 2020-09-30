import { IStateOfContentEditorProxy } from "../../Interfaces/Data/States/IDataStateOfContentEditor";
import { IStateOfContentEditorTreeProxy } from "../../Interfaces/Data/States/IDataStateOfTree";
import { DefaultStateOfContentEditorTreeProxy } from "./DefaultStateOfTree";

export class DefaultStateOfContentEditor implements IStateOfContentEditorProxy {
  StateOfContentEditorTreeProxy: IStateOfContentEditorTreeProxy = new DefaultStateOfContentEditorTreeProxy();
}
