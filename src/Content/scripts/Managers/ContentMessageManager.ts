import { LoggableBase } from '../../../Shared/scripts/LoggableBase';
import { IMessageBroker_Content } from '../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';

export class ContentMessageManager extends LoggableBase {
  private ContentMessageBroker: IMessageBroker_Content;
  OperationCancelled: any;

  constructor(logger: ILoggerAgent, contentMessageBroker: IMessageBroker_Content) {
    super(logger);
    this.Logger.FuncStart(ContentMessageManager.name);


    this.ContentMessageBroker = contentMessageBroker;

    this.Logger.FuncEnd(ContentMessageManager.name);
  }

  InitContentMessageManager() {
    this.Logger.FuncStart(this.InitContentMessageManager.name + ' ' + ContentMessageManager.name);

    this.ContentMessageBroker.BeginListening();
    this.Logger.FuncEnd(this.InitContentMessageManager.name);
  }

  //private ToggleCompactCss(): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.ToggleCompactCss.name);



      

  //    var targetDoc: IDataOneDoc = this.scWinProxy.GetTopLevelDoc();
  //    if (targetDoc) {
  //      var self = this;
  //      await this.scWinProxy.SetCompactCss(targetDoc)
  //        .then(() => resolve())
  //        .catch((err) => reject(err));
  //    }

  //    this.Logger.FuncEnd(this.ToggleCompactCss.name);
  //  });
  //}
}