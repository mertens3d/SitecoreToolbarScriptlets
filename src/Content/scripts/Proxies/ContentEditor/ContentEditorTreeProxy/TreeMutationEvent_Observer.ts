import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { GenericEvent_Observer } from '../../Desktop/DesktopProxy/Events/GenericEvent/GenericEvent_Subject';
import { IGeneric_Observer } from "../../Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { ITreeMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload';

export class TreeMutationEvent_Observer extends GenericEvent_Observer<ITreeMutationEvent_Payload> implements IGeneric_Observer<ITreeMutationEvent_Payload> {

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.Friendly = TreeMutationEvent_Observer.name;
  }

  UpdateAsync(payload: ITreeMutationEvent_Payload) : void{
    this.Logger.ErrorAndContinue(TreeMutationEvent_Observer.name, "Method not implemented.");
  }
}