import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { FrameJacket } from "../../../../DOMJacket/FrameJacket";
import { ElementJacket } from "../../../../DOMJacket/ElementJacket";
import { _HindeCoreBase } from "../../../../Shared/scripts/_HindeCoreBase";

export class ScContentIframeId0Proxy extends _HindeCoreBase {
  ScContentIframeId0FrameJacket: FrameJacket;

  constructor(hindeCore: IHindeCore, frameJacket: FrameJacket) {
    super(hindeCore);
    this.ScContentIframeId0FrameJacket = frameJacket;
  }

  async OpenFile(fileName: string): Promise<void> {
    try {
      let FileNameInput: ElementJacket = null;
      let OpenOkButton: ElementJacket = null;
      let CancelButton: ElementJacket = null;
      let trimmedFileName: string = fileName.trim();

      await this.ScContentIframeId0FrameJacket.WaitForCompleteNABHtmlIframeElement('scContentIframeId0')
        .then(() => this.ScContentIframeId0FrameJacket.DocumentJacket.WaitForAndReturnFoundElemJacketFromDoc('[id=Filename]'))
        .then((fileNameElemJacket: ElementJacket) => FileNameInput = fileNameElemJacket)
        .then(() => OpenOkButton = this.ScContentIframeId0FrameJacket.DocumentJacket.QuerySelector('[id=OK]'))
        .then(() => CancelButton = this.ScContentIframeId0FrameJacket.DocumentJacket.QuerySelector('[id=Cancel]'))
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