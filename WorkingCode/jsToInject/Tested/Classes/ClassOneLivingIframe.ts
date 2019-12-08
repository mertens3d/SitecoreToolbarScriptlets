class ClassOneLivingIframe extends SpokeBase {

  Index: any;
  IframeElem: any;
  DocElem: any;
  constructor(iframeIndex, iframeElem, xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(ClassOneLivingIframe.name + ' : ' + iframeIndex);
    this.Index = iframeIndex;
    this.IframeElem = iframeElem;
    this.DocElem = iframeElem.contentDocument;
    xyyz.debug.Log('e) OneLivingIframeData');
  }
}