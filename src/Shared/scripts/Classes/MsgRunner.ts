/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
import { BaseDebug } from "./debug";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFlag } from "../Enums/MessageFlag";

export class MessageRunner {
  ReceiveHndlr: Function;
  SendHndlr: Function;
  private Debug: BaseDebug;
  Nickname: string;

  constructor(receiveHndlr: Function, sendHndlr: Function, debug: BaseDebug, nickname: string) {
    this.Debug = debug;
    this.Nickname = nickname;

    this.Debug.FuncStart(MessageRunner.name, 'new messageRunner ' + this.Nickname);

    //this.ReceiveHndlr = receiveHndlr;
    //this.SendHndlr = sendHndlr;

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

    browser.runtime.onMessage.addListener(request => {
      console.log("Message from the background script:");
      console.log(request.greeting);
      return Promise.resolve({ response: "Hi from content script" });
    });



    this.Debug.FuncEnd(MessageRunner.name, this.Nickname);
  }
  onError(error) {
    console.error(`Error: ${error}`);
  }

  SendMessageToTabs(tabs) {
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        { greeting: "Hi from background script" }
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response);
      }).catch(this.onError);
    }
  }
  HandleMessageExample(request, sender, sendResponse) {
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
    }).then(this.SendMessageToTabs).catch(this.onError);















    //var tabs = browser.tabs.query({ active: true, currentWindow: true });
    var sending = browser.runtime.sendMessage(msgPlayload);
    sending.then(this.handleResponse, this.handleError);

    //window.postMessage({
    //  direction: "from-content-script",
    //  message: "Message from the content script"
    //}, "https://mdn.github.io");

    this.Debug.FuncEnd(this.SendMessage.name)
  }
  private handleError(reason: any) {
  }
}