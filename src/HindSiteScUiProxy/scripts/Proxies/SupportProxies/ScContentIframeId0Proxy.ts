﻿import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { ElementJacket } from "../../../../DOMJacket/ElementJacket";
import { _HindeCoreBase } from "../../../../Shared/scripts/_HindeCoreBase";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";

export class ScContentIframeId0Proxy extends _HindeCoreBase {
  ScContentIframeId0FrameJacket: ElementFrameJacket;

  constructor(hindeCore: IHindeCore, frameJacket: ElementFrameJacket) {
    super(hindeCore);
    this.ScContentIframeId0FrameJacket = frameJacket;
  }

  async OpenFile(fileName: string): Promise<void> {

    //todo - handle case where filename no longer exists
    try {
      let FileNameInput: ElementJacket = null;
      let OpenOkButton: ElementJacket = null;
      let CancelButton: ElementJacket = null;
      let trimmedFileName: string = fileName.trim();

      await this.ScContentIframeId0FrameJacket.WaitForCompleteNABHtmlIframeElement('scContentIframeId0')
        .then(() => this.ScContentIframeId0FrameJacket.DocumentJacket.WaitForAndReturnFoundElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Filename))
        .then((fileNameElemJacket: ElementJacket) => FileNameInput = fileNameElemJacket)
        .then(() => OpenOkButton = this.ScContentIframeId0FrameJacket.DocumentJacket.QuerySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Ok))
        .then(() => CancelButton = this.ScContentIframeId0FrameJacket.DocumentJacket.QuerySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Cancel))
        .then(() => {
          this.Logger.LogImportant('filename jacket found');

          if (!FileNameInput || !OpenOkButton || !CancelButton) {
            this.ErrorHand.ErrorAndThrow([ScContentIframeId0Proxy.name, this.OpenFile.name], 'missing buttons');
          }
        })
        .then(() => {
          if (FileNameInput && OpenOkButton && trimmedFileName.length > 0) {
            (<HTMLInputElement>FileNameInput.NativeElement).value = fileName;
            OpenOkButton.NativeElement.click();
          } else {
            CancelButton.NativeElement.click();
          }
        });
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow([ScContentIframeId0Proxy.name, this.OpenFile.name], err);
    }
  }
}