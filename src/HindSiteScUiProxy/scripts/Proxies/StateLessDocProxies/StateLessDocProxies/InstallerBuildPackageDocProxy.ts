import { GenericElemJacket } from "../../../../../DOMJacket/scripts/Elements/GenericElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { _BaseStateLessScDocProxy } from "./_BaseStateLessScDocProxy";

export class InstallerBuildPackageDocProxy extends _BaseStateLessScDocProxy implements IStateLessDocProxy {
  ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.InstallerBuildPackageDocProxy;
  ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBuildPackageDocProxy];

  async OnFocus(): Promise<void> {
    let parentElem: HTMLElement = null;

    await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.PackageFile)
      .then((genericElemJacket: GenericElemJacket) => parentElem = genericElemJacket.NativeElement.parentElement)
      .then(() => {
        this.AddPackageNameCandidateButtons(parentElem)
      })
      .catch((err) => this.ErrorHand.HandleFatalError([InstallerBuildPackageDocProxy.name, this.OnFocus.name], err));
  }

  private AddPackageNameCandidateButtons(parentElem: HTMLElement): void {
    for (var idx = 0; idx < 3; idx++) {
      let candidateButton: HTMLDivElement = this.BuildOneCandidatePackageNameButton('candidate-package-name-' + idx, 'Candidate Name ' + idx);
      parentElem.appendChild(candidateButton);
    }
  }

  private BuildOneCandidatePackageNameButton(buttonId: string, candidatePackageName: string): HTMLDivElement {
    let buttonToReturn: HTMLInputElement = document.createElement('input');
    buttonToReturn.type = 'button';
    buttonToReturn.classList.add('candidate-package-name');
    buttonToReturn.id = buttonId;
    buttonToReturn.setAttribute('data-candidate-package-name', candidatePackageName);
    buttonToReturn.value = candidatePackageName;
    buttonToReturn.addEventListener('click', ((event: Event) => this.PopulateCandidatePackageName(event)));

    let wrapperDiv: HTMLDivElement = document.createElement('div');
    wrapperDiv.appendChild(buttonToReturn);


    return wrapperDiv;
  }

  private PopulateCandidatePackageName(event: Event) {
    this.Logger.LogImportant('Populate! ');
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
        .catch((err) => this.ErrorHand.HandleFatalError([InstallerBuildPackageDocProxy.name, this.OpenFile.name], err));

    } catch (err) {
      this.ErrorHand.HandleFatalError([InstallerBuildPackageDocProxy.name, this.OpenFile.name], err);
    }
  }
}