import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { SupportFrameFactory } from "./BaseFrameFactory";

export class _baseSupportStatelessFrameProxy extends _APICoreBase {
    public readonly FrameJacket: ElementFrameJacket = null;
    BaseFrameFactory: SupportFrameFactory;
    constructor(apiCore: IAPICore, appFrameJacket: ElementFrameJacket) {
        super(apiCore);
        this.FrameJacket = appFrameJacket;
        this.BaseFrameFactory = new SupportFrameFactory(this.ApiCore);
    }
}
