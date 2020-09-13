import { ILoggerAgent } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { GenericEvent_Observer } from '../GenericEvent/GenericEvent_Subject';
import { IGeneric_Observer } from '../GenericEvent/IGeneric_Observer';
import { ITreeMutationEvent_Payload } from './ITreeMutationEvent_Payload';
import { DesktopStartBarProxy } from '../../../DesktopStartBarProxy/DesktopStartBarProxy';


export class TreeMutationEvent_Observer extends GenericEvent_Observer<ITreeMutationEvent_Payload> implements IGeneric_Observer<ITreeMutationEvent_Payload> {
    private Owner: DesktopStartBarProxy;
    Friendly: string;

    constructor(logger: ILoggerAgent, owner: DesktopStartBarProxy) {
        super(logger);
        this.Owner = owner;
        this.Friendly = TreeMutationEvent_Observer.name;
    }

    UpdateAsync(payload: ITreeMutationEvent_Payload): void {
        //(payload: ITreeMutatedEvent_Payload) => { self.CallbackTreeNodeChanged(payload) });
        this.Owner.CallbackTreeNodeChanged(payload);
    }
}
