/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />



import { PopUpManagerBase } from "./PopUpManagerBase";
//import { IMessageManager } from "../../../Shared/Scripts/Interfaces/IMessageManager";
import { IMsgFromX } from "../../../Shared/Scripts/Interfaces/IMsgPayload";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { MsgFromXBase } from "../../../Shared/scripts/Interfaces/MsgFromXBase";
//import { MessageRunner } from "../../../Shared/scripts/Classes/MsgRunner";

export class PopUpMessagesManager extends PopUpManagerBase {
  //MsgRunner: MessageRunner;

  Init() {
    var self = this;
    //this.MsgRunner = new MessageRunner(
    //  (msgPayload: IMsgFromX) => { self.ReceiveMessageHndlr(msgPayload) },
    //  self.ReceiveResponseHndlr,
    //   self.SendMessageHndlr, self.debug(), 'PopUp');
  }

  ReceiveResponseHndlr(response: IMsgFromX) {

    this.debug().FuncStart(this.ReceiveResponseHndlr.name, this.Utilites().MsgFlagAsString(response));


    this.debug().LogVal('response', JSON.stringify( response));


    this.debug().FuncEnd(this.ReceiveResponseHndlr.name, this.Utilites().MsgFlagAsString(response));
  }

  ReceiveMessageHndlr(msgPayload: IMsgFromX) {

    this.debug().FuncStart(this.ReceiveMessageHndlr.name, this.Utilites().MsgFlagAsString(msgPayload));

    
    this.debug().LogVal('greeting', msgPayload.greeting);


    this.debug().FuncEnd(this.ReceiveMessageHndlr.name, this.Utilites().MsgFlagAsString(msgPayload));
  }
  private SendMessageToTabs(tabs, messageToSend: MsgFromPopUp) {
    this.debug().FuncStart(this.SendMessageToTabs.name, this.Utilites().MsgFlagAsString(messageToSend))
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        messageToSend
      ).then((response) => {
        console.log('dealing with a response }}}}}}}}}}}}}}}}}}}}}}}}}}}');

        this.debug().LogVal('response', JSON.stringify(response));


        var asImsg: MsgFromContent = <MsgFromContent>response;
        if (asImsg) {
          this.debug().Log("Message from the content script:");
          this.debug().Log(JSON.stringify(asImsg));
          this.debug().Log(this.Utilites().MsgFlagAsString(asImsg));
          this.debug().Log(asImsg.greeting);

          this.ReceiveResponseHndlr(asImsg);

        } else {
          this.debug().Error(this.SendMessageToTabs.name, 'response is not imsg');
        }
      }).catch(this.onError);
    }
    this.debug().FuncEnd(this.SendMessageToTabs.name)
  }
  onError(error) {
    console.error(`Error: ${error}`);
  }

  //RunnerSendRequest(msgPlayload: IMsgFromX) {
  //  this.debug().FuncStart(this.RunnerSendRequest.name + MsgFlag[msgPlayload.MsgFlag]);

  //  browser.tabs.query({
  //    currentWindow: true,
  //    active: true
  //  }).then((tabs) => this.SendMessageToTabs(tabs, msgPlayload)).catch(this.onError);

  //  //var tabs = browser.tabs.query({ active: true, currentWindow: true });
  //  //var sending = browser.runtime.sendMessage(msgPlayload);
  //  //sending.then(this.handleResponse, this.handleError);

  //  //window.postMessage({
  //  //  direction: "from-content-script",
  //  //  message: "Message from the content script"
  //  //}, "https://mdn.github.io");

  //  this.debug().FuncEnd(this.RunnerSendRequest.name)
  //}
  private handleError(reason: any) {
  }
  async SendMessageHndlr(msgPlayload: MsgFromPopUp) {
    this.debug().FuncStart(this.SendMessageHndlr.name, this.Utilites().MsgFlagAsString(<MsgFromXBase>msgPlayload));
    //if (this.MsgRunner) {
    //  msgPlayload.greeting = 'this is the greeting from the popup handler';
    //  this.MsgRunner.RunnerSendRequest(msgPlayload);
    //} else {
    //  this.debug().Error(this.SendMessageHndlr.name, 'MsgRunner does not exist ' + MsgFlag[msgPlayload.MsgFlag]);
    //}


   await browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((tabs) => this.SendMessageToTabs(tabs, msgPlayload)).catch(this.onError);


    this.debug().FuncEnd(this.SendMessageHndlr.name, this.Utilites().MsgFlagAsString(msgPlayload));
  }

  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}