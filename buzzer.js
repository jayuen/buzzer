var Buzzes = new Meteor.Collection("buzzes")
if (Meteor.isClient) {
  Template.buzzes.allBuzzes = function() {
    return Buzzes.find()
  }

  Template.buzzes.events({
    'click button.reset' : function () {
      Meteor.call("removeAllBuzzes")
    }
  });

  Template.buzzer.events({
    'click button.buzz' : function () {
      var name = $("input[name='player-name']").val()
      Buzzes.insert({name: name})
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      removeAllBuzzes: function() {
        return Buzzes.remove({})
      }
    })
  });
}
