import { IDataOneWindowStorage } from '../../../Shared/Scripts/Interfaces/IDataOneWindowStorage'
import { PopUpDebug } from '../Classes/PopUpDebug';
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';

export class SitecoreUiManager implements iSitecoreUiManager {
  __activeWindowSnapShot: IDataOneWindowStorage;
  debug: PopUpDebug;

  constructor(debug: PopUpDebug) {
    debug.FuncStart(SitecoreUiManager.name);
    this.debug = debug;
    debug.FuncEnd(SitecoreUiManager.name);
  }

  //AssignMenuWindowChanged(handler: Function): void {
  //  window.addEventListener('click', (evt) => { handler(); });
  //  window.addEventListener('resize', (evt) => { handler(); });
  //  //window.onclick = () => {
  //  //  alert('changed');
  //  //}
  //}
}