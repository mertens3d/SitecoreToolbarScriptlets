import { FrameJacket } from "../../../../DOMJacket/FrameJacket";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../../../../Shared/scripts/_HindeCoreBase";
import { SupportFrameFactory } from "./BaseFrameFactory";

export class _baseSupportStatelessFrameProxy extends _HindeCoreBase {
    public readonly FrameJacket: FrameJacket = null;
    BaseFrameFactory: SupportFrameFactory;
    constructor(hindeCore: IHindeCore, appFrameJacket: FrameJacket) {
        super(hindeCore);
        this.FrameJacket = appFrameJacket;
        this.BaseFrameFactory = new SupportFrameFactory(this.HindeCore);
    }
}
