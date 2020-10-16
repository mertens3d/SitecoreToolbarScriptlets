import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { FrameElemJacket } from "../../../../DOMJacket/Elements/FrameElemJacket";
import { GenericElemJacket } from "../../../../DOMJacket/Elements/GenericElemJacket";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateLessDocProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { IStateLessDTFrameProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";





export class ScContentIframeId0Proxy extends _APICoreBase implements IStateLessDTFrameProxy {
  ScContentIframeId0FrameJacket: FrameElemJacket;
  FrameJacket: FrameElemJacket;
  HostedDocProxy: IStateLessDocProxy;

  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore);
    this.ScContentIframeId0FrameJacket = frameJacket;
  }

  async InstantiateAsyncMembers(): Promise<void> {
    //empty
  }

  async OpenFile(fileName: string): Promise<void> {
    //todo - handle case where filename no longer exists
    try {
      let FileNameInput: GenericElemJacket = null;
      let OpenOkButton: GenericElemJacket = null;
      let CancelButton: GenericElemJacket = null;
      let trimmedFileName: string = fileName.trim();

      await this.ScContentIframeId0FrameJacket.WaitForCompleteNABHtmlIframeElement('scContentIframeId0')
        .then(() => this.ScContentIframeId0FrameJacket.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Filename))
        .then((fileNameElemJacket: FrameElemJacket) => FileNameInput = fileNameElemJacket)
        .then(() => OpenOkButton = this.ScContentIframeId0FrameJacket.DocumentJacket.QuerySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Ok))
        .then(() => CancelButton = this.ScContentIframeId0FrameJacket.DocumentJacket.QuerySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Cancel))
        .then(() => {
          this.Logger.LogImportant('filename jacket found');

          if (!FileNameInput || !OpenOkButton || !CancelButton) {
            this.ErrorHand.HandleFatalError([ScContentIframeId0Proxy.name, this.OpenFile.name], 'missing buttons');
          }
        })
        .then(() => {
          if (FileNameInput && OpenOkButton && trimmedFileName.length > 0) {
            (<HTMLInputElement>FileNameInput.NativeElement).value = fileName;
            OpenOkButton.NativeElement.click();
          } else {
            CancelButton.NativeElement.click();
          }
        })
        .catch((err) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err))        ;
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([ScContentIframeId0Proxy.name, this.OpenFile.name], err);
    }
  }
}