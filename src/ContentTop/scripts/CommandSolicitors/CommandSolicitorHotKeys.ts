import { DeepHotKeyAgent } from '../../../Shared/scripts/Agents/DeepHotKey/DeepHotKeyAgent';
import { ReqCommandMsgFlag } from '../../../Shared/scripts/Enums/10 - MessageFlag';
import { HotKeyEvent_Observer } from '../../../Shared/scripts/Events/HotKeyEvent/HotKeyEvent_Observer';
import { IHotKeyEvent_Payload } from '../../../Shared/scripts/Events/HotKeyEvent/IHotKeyEvent_Payload';
import { ICommandRouterParams } from '../../../Shared/scripts/Interfaces/ICommandRouterParams';
import { _CommandSolicitorForEvent_ } from './_CommandSolicitorFor_';

export class CommandSolicitorForHotKeys extends _CommandSolicitorForEvent_ {
  protected Instantiate() {
    this.DeepHotKeyAgent = new DeepHotKeyAgent(this.HindeCore, this.DocumentJacket.UrlJacket);
    this.HotKeyEvent_Observer = new HotKeyEvent_Observer(this.CommonCore, this.CallBackOnHotKeyEvent.bind(this));
    this.DeepHotKeyAgent.HotKeyEvent_Subject.RegisterObserver(this.HotKeyEvent_Observer);
  }

  private CallBackOnHotKeyEvent(hotKeyEvent_Payload: IHotKeyEvent_Payload): void {
    this.Logger.LogImportant('received : ' + ReqCommandMsgFlag[hotKeyEvent_Payload.ReqCommandMsgFlag]);

    let commandParams: ICommandRouterParams = {
      ReqMsgFlag: hotKeyEvent_Payload.ReqCommandMsgFlag,
      ReqMsgFlagFriendly: ReqCommandMsgFlag[hotKeyEvent_Payload.ReqCommandMsgFlag],
      NewNickName: null,
      SelectSnapShotId: null,
      SelectText: hotKeyEvent_Payload.SelectText,
      StateSnapShot: null,
    }

    if (this.CommandRouter) {
      this.CommandRouter.RouteCommand(commandParams);
    }
  }
}