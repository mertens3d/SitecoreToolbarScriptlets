class ClassOneLivingIframe {
  constructor(iframeIndex, iframeElem) {
    xyyz.debug.Log('s) OneLivingIframeData: ' + iframeIndex);
    this.Index = iframeIndex;
    this.IframeElem = iframeElem;
    this.DocElem = iframeElem.contentDocument;
    xyyz.debug.Log('e) OneLivingIframeData');
  }
}