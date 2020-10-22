import { DocumentJacket } from '../../../DOMJacket/scripts/Document/DocumentJacket';
import { DeepHotKeyAgent } from '../../../Shared/scripts/Agents/DeepHotKey/DeepHotKeyAgent';
import { HotKeyEvent_Observer } from '../../../Shared/scripts/Events/HotKeyEvent/HotKeyEvent_Observer';
import { IHindeCore } from '../../../Shared/scripts/Interfaces/Agents/IHindeCore';
import { _FrontBase } from '../../../Shared/scripts/_HindeCoreBase';
import { CommandRouter } from '../Proxies/CommandRouter';


export abstract class _CommandSolicitorFor_ extends _FrontBase {
    protected CommandRouter: CommandRouter;
    protected HotKeyEvent_Observer: HotKeyEvent_Observer;
    protected DeepHotKeyAgent: DeepHotKeyAgent;
    protected DocumentJacket: DocumentJacket;

    constructor(hindCore: IHindeCore, commandRouter: CommandRouter, documentJacket: DocumentJacket) {
        super(hindCore);
        this.CommandRouter = commandRouter;
        this.DocumentJacket = documentJacket;
        this.Instantiate_base();
        this.Instantiate();
    }

    protected abstract Instantiate(): void;

    private Instantiate_base(): void {
    }
}
