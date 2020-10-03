import { IScStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfCEFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateOfCEFrameProxy";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";

export class CEFrameProxy extends _BaseScFrameProxy<IStateOfCEFrameProxy> implements IScStateFullProxy {
  GetState(): Promise<IStateOfCEFrameProxy> {
    return null;
  }

  Instantiate() {
  }

  WireEvents() {
  }

  FrameTypeDiscriminator = CEFrameProxy.name;
}