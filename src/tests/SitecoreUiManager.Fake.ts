import { iSitecoreUiManager } from '../jsToInject/interfaces/ISitecoreUiManager';
import { Debug } from '../jsToInject/Classes/debug';
import { IDataOneWindowStorage } from '../jsToInject/Interfaces/IDataOneWindowStorage'

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