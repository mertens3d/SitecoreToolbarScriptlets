import { iSitecoreUiManager } from '../jsContent/interfaces/ISitecoreUiManager';
import { Debug } from '../JsShared/Classes/debug';
import { IDataOneWindowStorage } from '../JsShared/Interfaces/IDataOneWindowStorage'

export class SitecoreUiManagerFake implements iSitecoreUiManager {
  constructor(debug: Debug) {
    debug.FuncStart(SitecoreUiManagerFake.name);

    debug.FuncEnd(SitecoreUiManagerFake.name);
  }

  __activeWindowSnapShot: IDataOneWindowStorage;

  AssignOnClickEvent(targetId: string, handler: Function): void {
    //do nothing
  }
  AssignOnChangeEvent(targetId: string, handler: Function): void {
    //do nothing
  }
  AssignDblClickEvent(targetId: string, handler: Function): void {
    //do nothing
  }
  AssignMenuWindowChanged(): void {

  }
}