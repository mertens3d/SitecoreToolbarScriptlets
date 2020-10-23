import { BrowserMessageBroker_Content } from "../../../../ContentTop/scripts/Proxies/BrowserMessageBroker_Content";
import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { CommandTypeFlag } from "../../Enums/CommandType";
import { APICommandFlag } from "../../Enums/APICommand";
import { InternalCommandFlag } from "../../Enums/InternalCommand";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { GuidData } from "../../Helpers/GuidData";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IToApiCallPayload } from "../../Interfaces/IApiCallPayload";
import { ICommandData } from "../../Interfaces/ICommandParams";
import { _CommonBase } from "../../_CommonCoreBase";

export class DefaultCommandData  implements ICommandData {
  NewNickname = '';
  TargetSnapShotId: GuidData = null;
  ContentMessageBroker: BrowserMessageBroker_Content = null;
  hindeCore: ICommonCore = null;
  TargetDoc: DocumentJacket = null;
  TargetNickName: string = '';
  TopLevelDoc: DocumentJacket = null;
  CommandType: CommandTypeFlag;
  InternalCommandFlag: InternalCommandFlag;

  ToAPIPayload: IToApiCallPayload = {
    DataOneWindowStorage: null,
    APICommand: APICommandFlag.Unknown,
    SnapShotFlavor: SnapShotFlavor.Unknown,
    SnapShotOfStateScUiApi: null,
  }
}