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

  function getPlayerName() {
    return $("input[name='player-name']").val()
  }

  Template.buzzer.result = function() {
    var winner = Buzzes.findOne()
    if (winner === undefined) return undefined

    var isWinner = Buzzes.findOne().name === getPlayerName()
    return (result = (isWinner) ? "winner" : "loser")
  }

  Template.buzzer.events({
    'click button.buzz' : function () {
      var name = getPlayerName()
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

  Buzzes.allow({
    insert: function() {
      if (Buzzes.find().count() > 0)
        return false
      else 
        return true
    }
  })
}
