import { GenericElemJacket } from "../../../../../DOMJacket/Elements/GenericElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { _BaseStateLessScDocProxy } from "./_BaseStateLessScDocProxy";

export class InstallerBuildPackageDocProxy extends _BaseStateLessScDocProxy implements IStateLessDocProxy {
  ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.InstallerBuildPackageDocProxy;
  ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBuildPackageDocProxy];



  async OnFocus(): Promise<void> {


    this.Logger.LogImportant('FFFFFFOOOOCCCCCUUUUUUSSSSSS!');
  }

  async OpenFile(fileName: string): Promise<void> {
    try {
      let FileNameInput: GenericElemJacket = null;
      let OpenOkButton: GenericElemJacket = null;
      let CancelButton: GenericElemJacket = null;
      let trimmedFileName: string = fileName.trim();



      await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Ok)
        .then((genericElemJacket: GenericElemJacket) => OpenOkButton = genericElemJacket)
        .then(() => this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Cancel))
        .then((genericElemJacket: GenericElemJacket) => CancelButton = genericElemJacket)
        .then(() => this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.PackageFile))
        .then((genericElemJacket: GenericElemJacket) => FileNameInput = genericElemJacket)
        .then(() => {
          if (trimmedFileName.length > 0) {
            (<HTMLInputElement>FileNameInput.NativeElement).value = fileName;
            OpenOkButton.NativeElement.click();
          } else {
            CancelButton.NativeElement.click();
          }
        })
    } catch (err) {
      this.ErrorHand.HandleFatalError([InstallerBuildPackageDocProxy.name, this.OpenFile.name], err);
    }
  }
}