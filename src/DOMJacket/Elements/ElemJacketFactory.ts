//import { _CommonBase } from "../../Shared/scripts/_CommonCoreBase";
//import { FrameElemJacket } from "./FrameElemJacket";
//import { GenericElemJacket } from "./GenericElemJacket";
//import { SharedConst } from "../../Shared/scripts/SharedConst";
//import { ReadyStateNAB } from "../../Shared/scripts/Classes/ReadyState";

//export class ElemJacketFactory extends _CommonBase {

//  private MakeFrameElemStep1(inputValue: GenericElemJacket | HTMLElement): FrameElemJacket {
//    let htmlIframeElement: HTMLIFrameElement = null;
//    if (inputValue instanceof GenericElemJacket) {
//      if (inputValue.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
//        htmlIframeElement = <HTMLIFrameElement>inputValue.NativeElement;
//      } else {
//        this.ErrorHand.HandleFatalError([ElemJacketFactory.name, this.MfgrFrameElemJackets.name], 'Invalid tag name: ' + inputValue.NodeTagName);
//      }
//    } else if (inputValue instanceof HTMLElement) {
//      htmlIframeElement = <HTMLIFrameElement>inputValue;
//    }

//    let frameElemJacket = new FrameElemJacket(this.CommonCore, htmlIframeElement);
//    return frameElemJacket;
//  }

//  MfgrFrameElemJackets(inputValue: GenericElemJacket[] | HTMLElement[]): Promise<FrameElemJacket[]> {
//    return new Promise(async (resolve, reject) => {
//      let frameElemJacketAr: FrameElemJacket[] = [];

//      inputValue.forEach((inputValue: GenericElemJacket | HTMLElement) => {
//        frameElemJacketAr.push(this.MakeFrameElemStep1(inputValue));
//      });

//      let promiseAr: Promise<ReadyStateNAB>[] = [];

//      frameElemJacketAr.forEach((FrameElemJacket: FrameElemJacket) => {
//        promiseAr.push(FrameElemJacket.WaitForCompleteNABHtmlIframeElement(ElemJacketFactory.name + this.MfgrFrameElemJackets.name));
//      });

//      await Promise.all(promiseAr)
//        .then(() => resolve(frameElemJacketAr))
//        .catch((err) => reject( this.ErrorHand.FormatRejectMessage([ElemJacketFactory.name, this.MfgrFrameElemJackets.name], err)));
//    });
//  }
//}