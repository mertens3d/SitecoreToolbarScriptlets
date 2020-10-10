import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { IMessageBroker_Content } from '../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";

export class ContentMessageManager extends _FrontBase {
  private ContentMessageBroker: IMessageBroker_Content;
  OperationCancelled: any;

  constructor(hindeCore: IHindeCore, contentMessageBroker: IMessageBroker_Content) {
    super(hindeCore);
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