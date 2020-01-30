/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
import { BaseDebug } from "./debug";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFlag } from "../Enums/MessageFlag";
import { MsgFromContent } from "./MsgPayloadResponseFromContent";

export class MessageRunner {
  ReceiveHndlr: Function;
  SendHndlr: Function;
  private Debug: BaseDebug;
  Nickname: string;

  constructor(receiveHndlr: Function, sendHndlr: Function, debug: BaseDebug, nickname: string) {
    this.Debug = debug;
    this.Nickname = nickname;

    this.Debug.FuncStart(MessageRunner.name, 'new messageRunner ' + this.Nickname);

    this.ReceiveHndlr = receiveHndlr;
    if (this.ReceiveHndlr) {
      this.Debug.Log('2222222222 has receive handler');
      var self = this;
      browser.runtime.onMessage.addListener(request => self.ContentReceiver(request));


    } else {

      this.Debug.Log('2222222222 has NO receive handler');
    }
    this.SendHndlr = sendHndlr;

    //this.Debug.LogVal('setting listener', (this.ReceiveHndlr && this.SendHndlr).toString())

    //browser.runtime.onMessage.addListener(this.HandleMessageExample);

    //browser.runtime.onMessage.addListener((message: IMsgFromX) => {
    //  console.log('=====================================');
    //  this.HandleMessage(message);
    //});

    //window.addEventListener("message", (event) => {
    //  this.HandleMessage(event.data);
    //});

    //browser.tabs.query({
    //  currentWindow: true,
    //  active: true
    //}).then(this.SendMessageToTabs).catch(this.onError);

   
    this.Debug.FuncEnd(MessageRunner.name, this.Nickname);
  }

  onError(error) {
    console.error(`Error: ${error}`);
  }

  ContentReceiver(requestMsg: IMsgFromX) {
    this.Debug.FuncStart(this.ContentReceiver.name + " Message from the popup script yyyyy:", requestMsg.FlagAsString);
    this.Debug.LogVal('Nickname bb', this.Nickname);
    this.Debug.LogVal('greeting', requestMsg.greeting);
    var response = new MsgFromContent(MsgFlag.TestResponse);
    response.response = "Hi from content script";

    if (this.ReceiveHndlr) {
      this.Debug.Log('has receiver defined');
      this.ReceiveHndlr(requestMsg);
    } else {
      this.Debug.Log('No handler assigned');
    }


    this.Debug.FuncEnd(this.ContentReceiver.name);
    return Promise.resolve(response);
  }

  private SendMessageToTabs(tabs, messageToSend: IMsgFromX) {
    this.Debug.FuncStart(this.SendMessageToTabs.name, messageToSend.FlagAsString)
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        messageToSend
      ).then(response => {
        var asImsg: IMsgFromX = <IMsgFromX>response;
        if (asImsg) {
          this.Debug.Log("Message from the content script:");
          this.Debug.Log(asImsg.FlagAsString);
          this.Debug.Log(asImsg.greeting);

          if (this.ReceiveHndlr) {
            this.ReceiveHndlr(asImsg);
          }

        } else {
          this.Debug.Error(this.SendMessageToTabs.name, 'response is not imsg');
        }
      }).catch(this.onError);
    }
  }

  HandleMessageExample(request: IMsgFromX, sender, sendResponse) {
    this.Debug.FuncStart(this.HandleMessageExample.name, request.MsgFlag)
    console.log("Message from the content script: " + request.greeting);
    //sendResponse({ response: "Response from background script" });
  }

  private HandleMessage(message: IMsgFromX) {
    this.Debug.FuncStart(this.HandleMessage.name, this.Nickname);
    this.Debug.LogVal('Message Flag', MsgFlag[message.MsgFlag]);
    if (this.ReceiveHndlr) {
      this.ReceiveHndlr(message);
    } else {
      this.Debug.Error(this.HandleMessage.name, 'no receive handler');
    }
    this.Debug.FuncEnd(this.HandleMessage.name);
  }

  private handleResponse() {
  }

  SendMessage(msgPlayload: IMsgFromX) {
    this.Debug.FuncStart(this.SendMessage.name, this.Nickname + MsgFlag[msgPlayload.MsgFlag]);

    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((tabs) => this.SendMessageToTabs(tabs, msgPlayload)).catch(this.onError);

    //var tabs = browser.tabs.query({ active: true, currentWindow: true });
    //var sending = browser.runtime.sendMessage(msgPlayload);
    //sending.then(this.handleResponse, this.handleError);

    //window.postMessage({
    //  direction: "from-content-script",
    //  message: "Message from the content script"
    //}, "https://mdn.github.io");

    this.Debug.FuncEnd(this.SendMessage.name)
  }
  private handleError(reason: any) {
  }
}