
import { ChromeMessage, Sender } from "../types";

const messagesFromReactAppListener = (message: ChromeMessage, sender: any, response: any) => {
  console.log('[content.js]. Message received', {
    message,
    sender,
  })

  function connectWith(i: any) {

    setTimeout(() => {
      const mainDiv = document.getElementsByClassName('entity-result__actions entity-result__divider')[i];
      const div = mainDiv?.getElementsByTagName('div')[0];
      const button = div?.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary ember-view')[0] as HTMLButtonElement;
      const span = button?.getElementsByClassName('artdeco-button__text')[0];

      if ((span.textContent?.trim()) === "Connect") {
        console.log(span.textContent?.trim());
        button.click();
        setTimeout(() => {
          const modal = document.getElementsByClassName('artdeco-modal artdeco-modal--layer-default send-invite')[0];
          const modalBottomElement = modal?.getElementsByClassName('artdeco-modal__actionbar ember-view text-align-right')[0];
          const modalButton = modalBottomElement?.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1')[0] as HTMLButtonElement;
          const modalSpan = modalButton?.getElementsByClassName('artdeco-button__text')[0];
          console.log(modalSpan.textContent?.trim());
          modalButton.click();
          response(i);
          // Recursive call
          connectWith(i + 1);
        }, 2000)
      } else {
        // Recursive call
        connectWith(i + 1);
      }
    }, 2000)

  }
  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "delete logo") {
    connectWith(0);
  }

}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);


