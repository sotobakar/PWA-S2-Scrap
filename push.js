var webPush = require('web-push');
     
const vapidKeys = {
   "publicKey": "BLp41wpr2iaEqYfUIydozyf1J6DVBMrHcfQCi0IkKXVR-DFXa1oeOrTkruGpFJXXH7kbVCAxHBnEVDWYjyO3n1s",
   "privateKey": "yiOurn65RS1RHlvKcichXxXsRRWkn5Moqiji1lnx8oA"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dQB5Y1aULgA:APA91bEmNcHBsrrj5_goJuVqmXdQR6fxPao3-IVIgQTkZZZ1wzV6RLsdaTvGtbXNduMBQMQe54MpXrzA0D9LLYN3AKXguLEzuCtRCYtM9e0FBn9-Soiu5QI4ahh-mR3XBbxDXwLDVUL1",
   "keys": {
       "p256dh": "BFXK7V4muxlKvc0LvCfxgrxQSk2eQlbxz+UA9AslXtCyDAVPNDrlbQdZvOj/BFoOByA0JFLLy7WZXwFWloXs+SQ=",
       "auth": "/YdIsOPyp+mDzq6Xm7IE8g=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '89222029687',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);