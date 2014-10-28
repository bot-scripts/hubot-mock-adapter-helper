var Robot = require('hubot/src/robot');

function setupRobot(callback) {
  var robot, user, adapter;

  robot = new Robot(null, "mock-adapter", false, "hubot");
  robot.adapter.on("connected", function() {
    user = robot.brain.userForId("1", {
      name: "mocha",
      room: "#mocha"
    });

    adapter = robot.adapter;
    var _on = adapter.on;
    adapter.on = function(event, callback, done) {
      var wrapCallback = function(envelope, strings) {
        try {
          callback(envelope, strings);
          if (done) { done(); }
        } catch (e) {
          if (done) { done(e); } else { throw e; }
        }
      };
      _on.apply(this, [event, wrapCallback]);
    };

    callback({robot: robot, user: user, adapter: adapter});
  });
  robot.run();
}

module.exports = {
  setupRobot: setupRobot
};
