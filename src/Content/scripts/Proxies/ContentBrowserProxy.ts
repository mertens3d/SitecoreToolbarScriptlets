/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />

import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { BaseBrowserProxy } from "../../../Shared/scripts/Proxies/Browser/_BaseBrowserProxy";

export class ContentBrowserProxy extends BaseBrowserProxy implements IContentBrowserProxy {
  ExtensionGetUrl(arg0: string): string {
    return browser.extension.getURL(arg0);
  }

  AddListenerForPopUp(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>) {
    browser.runtime.onMessage.addListener((request: IMessageControllerToContent) => callback(request));
  }

  async InitAsyncProperties(): Promise<void> {
    try {
    } catch (err) {
      this.ErrorHand.ErrorAndThrow([ContentBrowserProxy.name, this.InitAsyncProperties.name], err);
    }
  }
}