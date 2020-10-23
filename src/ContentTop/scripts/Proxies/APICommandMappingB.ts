import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { InternalCommandFlag } from "../../../Shared/scripts/Enums/InternalCommand";
import { IMapMsgFlagToInternalFlag } from "../../../Shared/scripts/Interfaces/IMapMsgFlagToInternalFlag";

export class CommandMappingMsgFlagToInternalFlag {
  static AllMapping: IMapMsgFlagToInternalFlag[] = [
    {
      MsgFlag: ReqCommandMsgFlag.ReqUpdateNickName,
      InternalCommand: InternalCommandFlag.SetNickName,
    },
    {
      MsgFlag: ReqCommandMsgFlag.Ping,
      InternalCommand: InternalCommandFlag.Ping,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqToggleFavorite,
      InternalCommand: InternalCommandFlag.ToggleFavorite,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqDebugContentFatalError,
      InternalCommand: InternalCommandFlag.ThrowFatalError,
    },
    {
      MsgFlag: ReqCommandMsgFlag.SetStateFromQueryString,
      InternalCommand: InternalCommandFlag.SetStateFromQueryString,
    },
    {
      MsgFlag: ReqCommandMsgFlag.SetStateFromMostRecent,
      InternalCommand: InternalCommandFlag.SetStateFromMostRecent,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqTakeAndSaveSnapShot,
      InternalCommand: InternalCommandFlag.SaveWindowState,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqRemoveFromStorage,
      InternalCommand: InternalCommandFlag.RemoveSnapShot,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqDebugAutoSnapShot,
      InternalCommand: InternalCommandFlag.DebugForceAutoSnapShot,
    }
  ];
}