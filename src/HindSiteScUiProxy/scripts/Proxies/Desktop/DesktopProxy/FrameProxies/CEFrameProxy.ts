import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfCEFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateOfCEFrameProxy";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";

export class CEFrameProxy extends _BaseScFrameProxy<IStateOfCEFrameProxy> implements IStateFullProxy<IStateOfCEFrameProxy> {


  SetState(stateOfCEFrameProxy: IStateOfCEFrameProxy): Promise<void>{
      throw new Error("Method not implemented.");
  }


  GetState(): Promise<IStateOfCEFrameProxy> {
    return null;
  }

  Instantiate() {
  }

  WireEvents() {
  }

  FrameTypeDiscriminator = CEFrameProxy.name;
}