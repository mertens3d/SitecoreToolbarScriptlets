import { ContentHub } from '../../../jsContent/Managers/ContentHub';
import { iSitecoreUiManager } from '../../../jsContent/interfaces/ISitecoreUiManager';
import { Debug } from '../../../JsShared/Classes/debug';
import { IDataOneWindowStorage } from '../../../JsShared/Interfaces/IDataOneWindowStorage'

export class SitecoreUiManager implements iSitecoreUiManager  {
    
  __activeWindowSnapShot: IDataOneWindowStorage;
    debug: Debug;

  constructor(debug: Debug) {
    debug.FuncStart(SitecoreUiManager.name);
    this.debug = debug;
    debug.FuncEnd(SitecoreUiManager.name);
  }

  AssignMenuWindowChanged(handler: Function): void {

    window.addEventListener('click', (evt) => { handler(); });
    window.addEventListener('resize', (evt) => { handler(); });
    //window.onclick = () => {
    //  alert('changed');
    //}
  }



  
}