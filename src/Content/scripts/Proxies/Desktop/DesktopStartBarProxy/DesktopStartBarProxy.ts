import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { LoggableBase } from "../../../Managers/LoggableBase";

export class DesktopStartBarProxy extends LoggableBase {
  HostDoc: IDataOneDoc;
  private __statBarElem: HTMLElement;

  constructor(logger: ILoggerAgent, hostDoc: IDataOneDoc) {
    super(logger);

    this.HostDoc = hostDoc;
  }

  GetStartBarButtonById(targetId: string) {
    return this.HostDoc.ContentDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.HostDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__statBarElem;
  }
}