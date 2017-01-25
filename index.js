function notify(args, f) {
console.log(args);
  console.log(process.env['SLACK_WEBHOOK']);
  var Slack = require('./slack.seed');
  slack = new Slack();
  slack.setWebhook(process.env['SLACK_WEBHOOK']);
  slack.webhook(args, f);
}

function make(payload) {
  var user = payload.user;
  var post = payload.post;

  switch(payload.kind) {
    case 'post_create':
      return {
        text: user.name + " created <" + post.url + "|" + post.name + ">",
        attachments: [
          {
            "title": post.name,
            "text": post.body_md
          }
        ]
      }
    case 'post_update':
      return {
        text: user.name + " updated <" + post.url + "|" + post.name + "> (<" + post.diff_url + "|diff>)",
        attachments: [
          {
            "title": post.message,
            "text": post.body_md
          }
        ]
      }
    case 'comment_create':
      return {
        text: user.name + " commented on <" + post.url + "|" + post.name + ">",
        attachments: [
          {
            "text": payload.comment.body_md
          }
        ]
      }
  }
}

exports.handler = function( event, context, callback) {
  var rules = require('./rule');
  var payload = JSON.parse(event.body);
  var skip = false;

  rules.forEach(function(rule) {
    if (skip) { return }

    if (payload.post.name.match(rule.pattern)) {
      skip = true;
      var message = make(payload);
      if(!message) { return }
      message.channel = rule.channel;
      message.username = payload.user.name;
      message.icon_url = payload.user.icon.thumb_s.url;

      notify(message, function (err, response) {
        if(err) {
          callback(response);
        } else {
          callback();
        }
      });
    }
  });
}

