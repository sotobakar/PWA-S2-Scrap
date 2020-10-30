regServiceWorker();
document.querySelector('.subscribe').addEventListener("click", function () {
  Notification.requestPermission();
});

async function regServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      let regis = await navigator.serviceWorker.register('./sw.js')
  
      console.log('Registered:', regis);

      try {
        let push = await navigator.serviceWorker.ready
        let subscribe = await push.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('BLp41wpr2iaEqYfUIydozyf1J6DVBMrHcfQCi0IkKXVR-DFXa1oeOrTkruGpFJXXH7kbVCAxHBnEVDWYjyO3n1s')
        })
        console.log('Endpoint URL: ', subscribe.endpoint);
        console.log('p256dh : ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
        console.log('Auth : ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
      } catch (error) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', error);
        }
      }

      let sub = await regis.pushManager.getSubscription()
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
