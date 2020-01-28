import { iSitecoreUiManager } from "../Shared/scripts/Interfaces/ISitecoreUiManager";
import { AbstractDebug } from "../Shared/scripts/Classes/debug";
import { IDataOneWindowStorage } from "../Shared/scripts/Interfaces/IDataOneWindowStorage";

export class SitecoreUiManagerFake implements iSitecoreUiManager {
  constructor(debug: AbstractDebug) {
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