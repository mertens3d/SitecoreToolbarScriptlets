import { PayloadDataFromPopUp } from '../../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { IContentMessageBroker } from '../../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { LoggableBase } from '../LoggableBase';
import { IScWindowManager } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';

export class ContentMessageManager extends LoggableBase {
  private ContentMessageBroker: IContentMessageBroker;
  OperationCancelled: any;
  private ScWinMan: IScWindowManager;

  constructor(logger: ILoggerAgent,  scWinMan: IScWindowManager, contentMessageBroker: IContentMessageBroker) {
    super(logger);
    this.Logger.FuncStart(ContentMessageManager.name);

    this.ScWinMan = scWinMan;

    this.ContentMessageBroker = contentMessageBroker;

    this.Logger.FuncEnd(ContentMessageManager.name);
  }

  InitContentMessageManager() {
    this.Logger.FuncStart(this.InitContentMessageManager.name + ' ' + ContentMessageManager.name);

    this.ContentMessageBroker.BeginListening();
    this.Logger.FuncEnd(this.InitContentMessageManager.name);
  }

  private ToggleCompactCss(Data: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ToggleCompactCss.name);

      var targetDoc: IDataOneDoc = this.ScWinMan.TopLevelDoc();
      if (targetDoc) {
        var self = this;
        await this.ScWinMan.SetCompactCss(targetDoc)
          .then(() => resolve())
          .catch((err) => reject(err));
      }

      this.Logger.FuncEnd(this.ToggleCompactCss.name);
    });
  }

  SetParentInfo(__winDataParent: IDataOneDoc) {
  }
}