var nodecastor = require('nodecastor'),
  util = require("util");
nodecastor.scan()
  .on('online', function(d) {
    console.log("New device: ", d.id);
    d.on('connect', function() {
    d.status(function(err, s) {
      if (!err) {
        console.log('Chromecast status', util.inspect(s));
        d.application('5C3F0A3C', function(err, a) {
          if (!err) {
            console.log('Application', util.inspect(a));
            a.run('urn:x-cast:es.offd.dashcast', function(err, s) {
              if (!err) {
                s.send('http://theregister.co.uk');
              }
            });
          }
      });
      }
    });
});
  })
  .on('offline', function(d) {
    console.log('Removed device', util.inspect(d));
  })
  .start();