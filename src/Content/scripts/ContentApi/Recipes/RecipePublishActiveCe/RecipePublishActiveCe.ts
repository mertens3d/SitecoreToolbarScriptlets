﻿import { PromiseResult } from "../../../../../Shared/scripts/Classes/PromiseResult";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/scWindowType";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataOneIframe } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { IDataPublishChain } from "../../../../../Shared/scripts/Interfaces/Data/IDataPublishChain";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";
import { IFactoryHelper } from "../../../../../Shared/scripts/Interfaces/IFactoryHelper";

export class RecipePublishActiveCe extends __RecipeBase implements ICommandRecipes {
 private FactoryHelp: IFactoryHelper;

  constructor(commandData: ICommandHndlrDataForContent, factoryHelp: IFactoryHelper) {
    super(commandData);
    this.FactoryHelp = factoryHelp;
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.PublishActiveCE(this.ScWinMan.GetTopLevelDoc())
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  private async GetDocToPublish(currentWindowType: ScWindowType, targetDoc: IDataOneDoc): Promise<IDataOneDoc> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetDocToPublish.name);

      try {
        if (currentWindowType === ScWindowType.Desktop) {
          await this.RecipeBasics.GetTopLevelIframe(targetDoc)
            .then((topIframe: IDataOneIframe) => resolve(topIframe.ContentDoc))
            .catch((err) => reject(err));
        }
        else {
          resolve(this.ScWinMan.GetTopLevelDoc());
        }
      } catch (err) {
        reject(this.GetDocToPublish.name + ' ' + err)
      }

      this.Logger.FuncEnd(this.GetDocToPublish.name);
    })
  }

  async PublishActiveCE(targetDoc: IDataOneDoc): Promise<void> {
    this.Logger.FuncStart(this.PublishActiveCE.name);
    try {
      var currentWindowType = this.ScWinMan.GetCurrentPageType();
      await this.GetDocToPublish(currentWindowType, targetDoc)
        .then((docToPublish: IDataOneDoc) => this.PublishCE(docToPublish))
        .catch((err) => { throw (err) });
    }
    catch (err) {
      throw (this.PublishActiveCE.name + ' ' + err);
    }
    this.Logger.FuncEnd(this.PublishActiveCE.name);
  }

  private __debugDataPublishChain(dataPublishChain: IDataPublishChain, nickname: string) {
    this.Logger.FuncStart(this.__debugDataPublishChain.name, nickname);

    this.Logger.LogVal('docToPublish', this.Logger.IsNullOrUndefined(dataPublishChain.docToPublish));
    this.Logger.LogVal('jqIframe', this.Logger.IsNullOrUndefined(dataPublishChain.jqIframe) + ' ' + (dataPublishChain.jqIframe ? dataPublishChain.jqIframe.IframeElem.src : ''));
    this.Logger.LogVal('Iframe0blueIframe', this.Logger.IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.IframeElem.src : ''));
    this.Logger.LogVal('messageDialogIframeRed', this.Logger.IsNullOrUndefined(dataPublishChain.messageDialogIframeRed) + ' ' + (dataPublishChain.messageDialogIframeRed ? dataPublishChain.messageDialogIframeRed.IframeElem.src : ''));

    this.Logger.FuncEnd(this.__debugDataPublishChain.name);

    return dataPublishChain;
  }

  async PublishCE(docToPublish: IDataOneDoc): Promise<void> {
    this.Logger.FuncStart(this.PublishCE.name);

    try {
      var dataPublishChain: IDataPublishChain = {
        docToPublish: docToPublish,
        TopLevelDoc: this.ScWinMan.GetTopLevelDoc(),
        Iframe0Blue: null,
        jqIframe: null,
        messageDialogIframeRed: null
      }

      await this.ClickPublishOnNav(dataPublishChain)

        .then((dataPublishChain: IDataPublishChain) => this.ClickMenuButtonPublishDropDown(dataPublishChain))
        //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post ClickMenuButtonPublishDropDown'))
        .then((dataPublishChain: IDataPublishChain) => this.ClickMenuDropDownPublishItem(dataPublishChain))
        //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post MenuDropDownPublishItem'))
        .then((dataPublishChain: IDataPublishChain) => this.GetThePublishItemDialog(dataPublishChain))
        //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post PublishItemDialog'))

        .then((dataPublishChain: IDataPublishChain) => this.GetDialogIframe0Blue(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.__WaitForAndClickPublishNextButton(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.GetMessageDialog(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickOk(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickClose(dataPublishChain))

        .catch(ex => {
          this.Logger.ErrorAndThrow(this.PublishCE.name, ex);
        });
    } catch (err) {
      throw (this.PublishCE.name + ' ' + err);
    }
    this.Logger.FuncEnd(this.PublishCE.name);
  }

  private async ClickPublishOnNav(payload: IDataPublishChain): Promise<IDataPublishChain> {
    this.Logger.FuncStart(this.ClickPublishOnNav.name);
    try {
      await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip], payload.docToPublish)
      await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip], payload.docToPublish)
    } catch (err) {
      throw (this.ClickPublishOnNav.name + ' ' + err);
    }
    this.Logger.FuncEnd(this.ClickPublishOnNav.name);
    return payload;
  }

  private async __waitForAndClickClose(dataPublishChain: IDataPublishChain) {
    await this.RecipeBasics.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, ContentConst.Const.Selector.SC.Publish.SettingsHidden)
      .then(async () => {
        await this.RecipeBasics.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, ContentConst.Const.Selector.SC.Publish.TheItemHasBeenPublished, SharedConst.Const.IterHelper.MaxCount.OverridePublishing)
      })
      .then(async () => {
        await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.Cancel], dataPublishChain.Iframe0Blue.ContentDoc);
      });

    return dataPublishChain;
  }

  private async __waitForAndClickOk(dataPublishChain: IDataPublishChain) {
    await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.Ok], dataPublishChain.messageDialogIframeRed.ContentDoc);

    return dataPublishChain;
  }

  async __WaitForAndClickPublishNextButton(dataPublishChain: IDataPublishChain) {
    await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.NextButton], dataPublishChain.Iframe0Blue.ContentDoc);

    return dataPublishChain;
  }

  async ClickMenuButtonPublishDropDown(payload: IDataPublishChain = null) {
    await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.MenuButtonPublish], payload.docToPublish);
    return payload;
  }

  async ClickMenuDropDownPublishItem(payload: IDataPublishChain = null) {
    return await this.RecipeBasics.WaitForAndClickWithPayload(ContentConst.Const.Selector.SC.MenuDropDownPublishItem, payload.docToPublish, payload)
  }

  async GetThePublishItemDialog(dataPublishChain: IDataPublishChain = null) {
    await this.RecipeBasics.WaitForAndReturnFoundElem(dataPublishChain.TopLevelDoc, ContentConst.Const.Selector.SC.JqueryModalDialogsFrame)
      .then(
        (found: HTMLElement) => {
          dataPublishChain.jqIframe = this.FactoryHelp.DataOneIframeFactory(<HTMLIFrameElement>found, 'jqIframe');

          return dataPublishChain;
        }
      ) // opens publish item dialog
      .then(async (payload: IDataPublishChain) => {
        await this.RecipeBasics.WaitForReadyIframe(payload.jqIframe);
        dataPublishChain = payload;
      });

    return dataPublishChain;
  }

  async GetMessageDialog(dataPublishChain: IDataPublishChain) {
    let toReturnPublishChain: IDataPublishChain = dataPublishChain;

    await this.RecipeBasics.WaitForIframeElemAndReturnWhenReady(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIFrame1, 'iframeRed')
      .then((result) => toReturnPublishChain.messageDialogIframeRed = result)
      .catch((err) => this.Logger.ErrorAndThrow(this.GetMessageDialog.name, err));

    return toReturnPublishChain;
  }

  async GetDialogIframe0Blue(dataPublishChain: IDataPublishChain = null) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetDialogIframe0Blue.name);

      let promiseResult: PromiseResult = new PromiseResult(this.GetDialogIframe0Blue.name, this.Logger);

      this.Logger.LogAsJsonPretty('dataPublishChain', dataPublishChain);

      await this.RecipeBasics.WaitForIframeElemAndReturnWhenReady(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIframe0, 'Iframe0Blue')
        .then((result) => {
          this.Logger.MarkerC();
          dataPublishChain.Iframe0Blue = result;
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.Logger.LogAsJsonPretty('dataPublishChain.Iframe0Blue', dataPublishChain.Iframe0Blue);
      //this.ContentAgents.Logger.DebugDataOneIframe(dataPublishChain.Iframe0Blue);

      this.Logger.FuncEnd(this.GetDialogIframe0Blue.name);
      if (promiseResult.WasSuccessful()) {
        resolve(dataPublishChain);
      } else {
        reject(promiseResult.RejectReasons)
      }
    });
  }

  private __waitForThenFunc(selector: string, targetDoc: IDataOneDoc, dataPublishChain: IDataPublishChain, optionFunc: Function) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__waitForThenFunc.name, selector);
      this.Logger.LogAsJsonPretty(this.__waitForThenFunc.name, targetDoc);

      var found: HTMLElement = null;
      await this.RecipeBasics.WaitForAndReturnFoundElem(targetDoc, selector)
        .then((result) => found = result);

      if (found) {
        this.Logger.Log('found');
        if (optionFunc) {
          this.Logger.Log('executing func');
          dataPublishChain = await optionFunc(found, dataPublishChain);
        }
        this.__debugDataPublishChain(dataPublishChain, this.__waitForThenFunc.name);

        this.Logger.FuncEnd(this.__waitForThenFunc.name, selector);

        resolve(dataPublishChain)
      } else {
        reject('not found');
      }
    });
  }
}