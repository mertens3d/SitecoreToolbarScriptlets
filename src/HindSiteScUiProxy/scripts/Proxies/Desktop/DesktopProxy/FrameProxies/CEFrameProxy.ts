import { IScStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";

export class CEFrameProxy extends _BaseScFrameProxy implements IScStateFullProxy {


    Instantiate() {
        throw new Error("Method not implemented.");
    }

    WireEvents() {
        throw new Error("Method not implemented.");
    }


    FrameTypeDiscriminator = CEFrameProxy.name;

}
