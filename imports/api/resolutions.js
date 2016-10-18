import {Mongo} from 'meteor/mongo';

const Resolutions = new Mongo.Collection('resolutions');

if(Meteor.isClient) {
    Meteor.subscribe('resolutions');


}
if (Meteor.isServer) {

  Meteor.publish('resolutions', function() {
    return Resolutions.find({
      $or: [ {private: {$ne: true}},
      {owner: this.userId}]
    });
  });
}
Meteor.methods ({
  'addResolution'(text) {
    Resolutions.insert({text: text, createdAt: new Date(), owner: Meteor.userId()});
  },
  'deleteResolution'(id) {
    var res = Resolutions.findOne(id);
    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.remove(id);
  },
  'updateResolution'(id, checked) {
    var res = Resolutions.findOne(id);
    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.update(id, {
        $set: {
            checked: checked
          }
        });
  },
  setPrivate(id, private) {
    var res = Resolutions.findOne(id);
    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.update(id, {
        $set: {
            private: private
          }
        });

  }
});

export default Resolutions
