import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { ContentEditorTreeNodeProxy } from "../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export class DtStartBarProxy extends LoggableBase {

    HostDoc: IDataOneDoc;
    private __statBarElem: HTMLElement;

    constructor(logger: ILoggerAgent, hostDoc: IDataOneDoc) {
        super(logger);

        this.HostDoc = hostDoc;
    }


  CallBackActiveElementChanged(treeNodeProxy: ContentEditorTreeNodeProxy) {
    // this method is called when the active node changes on the tree
    // responds with the nodeProdxy

    this.Logger.Log('Active Node Changed');

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
