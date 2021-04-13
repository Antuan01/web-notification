'use strict';

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    console.log(`[Service Worker] Push had this: "${event.data}"`);
    console.log(event);

    const title = 'TuBotones';

    const options = {
      body: event.data.text(),
      icon: 'images/icon.png',
      badge: 'images/badge.png',
      image: "https://staging.api.tubotones.com/storage/voucher/1617813685.jpg",
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://developers.google.com/web/')
    );
  });
