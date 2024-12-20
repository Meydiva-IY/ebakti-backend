"use strict";

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: 'YOUR_APP_ID',
  key: 'YOUR_APP_KEY',
  secret: 'YOUR_APP_SECRET',
  cluster: 'YOUR_APP_CLUSTER',
  useTLS: true
});
module.exports = pusher;
//# sourceMappingURL=pusher.dev.js.map
