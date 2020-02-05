import { CommonEvents } from "./CommonEvents";

export class InternalEvents extends CommonEvents{
   HndlrSelectChange(evt: any) {
    this.PopHub.UiMan.SelectChanged();
  }
  __showDebugButtonClicked(evt: MouseEvent) {
    this.__initNewOperation();
    this.debug().FuncStart(this.__showDebugButtonClicked.name);

    this.debug().FuncEnd(this.__showDebugButtonClicked.name);
  }

   __cleardebugTextWithConfirm() {
    this.debug().HndlrClearDebugText(this.debug(), true);
  }

   __toggleAccordian(evt: MouseEvent) {
    this.debug().FuncStart(this.__toggleAccordian.name);

    var srcElem: HTMLElement = <HTMLElement>(evt.target || evt.srcElement);
    var foundContentSib = this.UiMan().GetAccordianContentElem(srcElem);

    if (foundContentSib) {
      var isCollapsed = foundContentSib.classList.contains(this.PopConst().ClassNames.HS.Collapsed);

      var newVal = !isCollapsed;
      this.UiMan().SetAccordianClass(foundContentSib, newVal)

       this.PopAtticMan().UpdateAccodianState(srcElem.getAttribute('id'), newVal);
    } else {
      this.debug().Error(this.__toggleAccordian.name, 'did not find sib');
    }
    this.debug().FuncEnd(this.__toggleAccordian.name);
  }


}
