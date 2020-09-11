import { LoggableBase } from '../../../Managers/LoggableBase';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { DesktopStartBarProxy } from './DesktopStartBarProxy';

export class DesktopStartBarButtonProxy extends LoggableBase {
  private StartBarButtonElemId: string;
  private OwnerStartBar: DesktopStartBarProxy;
   FoundStartBarButton: HTMLElement;

  constructor(logger: ILoggerAgent, iframeElemId: string, ownerStartBar: DesktopStartBarProxy) {
    super(logger);
    this.OwnerStartBar = ownerStartBar;

    this.StartBarButtonElemId = ContentConst.Const.Names.Desktop.StartBarApplicationPrefix + iframeElemId;
    let querySelectBtn = '[id=' + this.StartBarButtonElemId + ']';
    this.FoundStartBarButton = this.OwnerStartBar.GetAssociatedDoc().ContentDoc.querySelector(querySelectBtn);
  }
}