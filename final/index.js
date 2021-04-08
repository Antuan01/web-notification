'use strict';

//necesitas user id para la linea 2 y un check en la linea 86
// <3 Antuan01
const applicationServerPublicKey = "BC4auUyTyASkAy-ir6di0RZirzu1dWkN-lu6z6S1Yd-rCVhyNgWykgcGxn33mZzui1RDt5s9sbefJszAUfxNXuQ";
const SERVER_URL = "https://staging.api.tubotones.com/api/save_subscription/1";

let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function check() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('service.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    swCheck();

  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
}

}

function saveSubscriptionOnServer(subscription) {
        fetch(SERVER_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
      })
      .then(res => console.log(res.json()))
      .catch(err => console.log(err))
}


function subscribeUser(swRegistration) {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('Just subscribe.');
    console.log(subscription);
    saveSubscriptionOnServer(subscription);

  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}


function swCheck() {
      swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
      console.log(subscription, "fdfd")
      
      if(subscription === null) {
          console.log("No registrado please subs");
          //sacar modal para subscribir o_O
          subscribeUser(swRegistration);
      }else {
          console.log("Registrado");
      }

  });

}

function main() {
    console.log("checking")
    check();
}
