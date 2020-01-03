import { Hub } from '../Managers/Hub';
import { iSitecoreUiManager } from '../interfaces/ISitecoreUiManager';
import { Debug } from '../Classes/debug';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage'

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



  AssignOnClickEvent(targetId: string, handler: Function): void {
    var targetElem: HTMLElement = document.getElementById(targetId);
    if (!targetElem) {
      this.debug.Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('click', (evt) => { handler(evt) });
    }
  }
  AssignOnChangeEvent(targetId: string, handler: Function): void {
    var targetElem: HTMLElement = document.getElementById(targetId);
    if (!targetElem) {
      this.debug.Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.onchange = () => { handler };
    }
  }
  AssignDblClickEvent(targetId: string, handler: Function): void {
    var targetElem: HTMLElement = document.getElementById(targetId);
    if (!targetElem) {
      this.debug.Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.ondblclick = (evt ) => { handler (evt)};
    }
  }
}