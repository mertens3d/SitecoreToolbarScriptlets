import { IDataStateOfDesktopProxy } from "../../Interfaces/Data/States/IDataStateOfDesktop";
import { IStateOfDTAreaProxy } from "../../Interfaces/Data/States/IStateOfDTProxy";

export class DefaultStateOfDTAreaProxy implements IStateOfDTAreaProxy {
  StateOfDTFrameProxies = [];
  IndexOfActiveDTFrameProxy = -1
}

export class DefaultStateOfDesktop implements IDataStateOfDesktopProxy {
  StateOfDTAreaProxy: IStateOfDTAreaProxy = new DefaultStateOfDTAreaProxy();
}