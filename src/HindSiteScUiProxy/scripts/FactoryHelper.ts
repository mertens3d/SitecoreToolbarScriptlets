import { FrameElemJacket } from "../../DOMJacket/scripts/Elements/FrameElemJacket";
import { IAPICore } from "../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { _APICoreBase } from "../../Shared/scripts/_APICoreBase";
import { CEFrameProxy } from "./Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";

export class FactoryHelper extends _APICoreBase {
  SettingsAgent: ISettingsAgent;

  constructor(apiCore: IAPICore) {
    super(apiCore);
  }

  CEFrameFactory(frameJacket: FrameElemJacket, nickname: string): CEFrameProxy {
    this.Logger.FuncStart(this.CEFrameFactory.name);

    this.ErrorHand.ThrowIfNullOrUndefined(this.CEFrameFactory.name, [frameJacket]);
    let toReturn = new CEFrameProxy(this.ApiCore, frameJacket);
    toReturn.InstantiateAsyncMembers();
    toReturn.WireEvents();
    this.Logger.FuncEnd(this.CEFrameFactory.name);
    return toReturn;
  }
} 