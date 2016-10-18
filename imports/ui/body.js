import {Template} from 'meteor/templating';
import Resolutions from '../api/resolutions.js';
import './body.html';


Template.body.helpers({
    resolutions() {
        /* if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } else { */
            return Resolutions.find();
        // }
    },
    hideFinished(event){
      return Session.get('hideFinished');
    }
});

Template.body.events({
    'submit .new-resolution' (event) {
        var text = event.target.text.value;

        Meteor.call('addResolution', text);
        event.target.text.value = "";
        return false;
    },
    'change .hide-finished'(event) {
        Session.set('hideFinished', event.target.checked);

    }
});



Template.resolution.events({
    'click .delete' (event) {
        Meteor.call('deleteResolution', this._id);
    },
    'click .toggle-checked' (event) {
        Meteor.call('updateResolution', this._id, !this.checked);
    },
    'click .toggle-private' (event) {
        Meteor.call('setPrivate', this._id, !this.private);
    }
});

Template.resolution.helpers({
  isOwner(event) {
    return this.owner === Meteor.userId();
  }
})

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
