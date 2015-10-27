// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova']);
 
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
 
app.controller('ImagePickerController', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts) {
    $scope.data = {}
    $scope.collection = {
        selectedImage : ''
    };
    var ImageName = $scope.collection.selectedImage;
    
    $ionicPlatform.ready(function() {
 
        $scope.getImageSaveContact = function() {       
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 80            // Higher is better
            };
 
            $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
                      
                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.collection.selectedImage = base64;
                        ImageName = $scope.collection.selectedImage;
                        //$scope.addContact();    // Save contact
                    });
                }
            }, function(error) {
                console.log('Error: ' + JSON.stringify(error));    // In case of error
            });
        };  
 
    }); 
 
    $scope.addContact = function(contactname,emailid,number1,nickname,streetAddress,locality,region,postalCode,country) {
          
          $scope.contact = {     // We will use it to save a contact
          
            "displayName": contactname,
            "name": {
                "givenName"  : contactname,
                "familyName" : "",
                "formatted"  : contactname
            },
            "nickname": nickname,
            "phoneNumbers": [
                {
                    "value": number1,
                    "type": "mobile"
                }             
            ],
            "emails": [
                {
                    "value": emailid,
                    "type": "home"
                }
            ],
            "addresses": [
                {
                    "type": "home",
                    "formatted": streetAddress+","+locality+","+region+","+country,
                    "streetAddress": streetAddress,
                    "locality":locality,
                    "region":region,
                    "postalCode":postalCode,
                    "country":country
                }
            ],
            "ims": null,
            "organizations": [
                {
                    "type": "",
                    "name": "",
                    "department": "",
                    "title":""
                }
            ],
            "birthday": "",
            "note": "",
            "photos": [
                {
                    "type": "base64",
                    "value": ImageName
    
                }
            ],
            "categories": null,
            "urls": null
        };
        
        $cordovaContacts.save($scope.contact).then(function(result) {
            console.log('Contact Saved!');
            alert("Contact updated successfully");
        }, function(err) {
            console.log('An error has occured while saving contact data!');
            alert("Error saving contact");
        });
    };
    
    
      $scope.getAllContacts = function() {
        $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
          $scope.contacts1 = allContacts;
        })
      };
    
      $scope.findContactsBySearchTerm = function (searchTerm) {
        var opts = {                                           //search options
          filter : searchTerm,                                 // 'Bob'
          multiple: true,                                      // Yes, return any contact that matches criteria
          fields:  [ 'displayName', 'name' ],                   // These are the fields to search for 'bob'.
          desiredFields: [id],    //return fields.
        };
    
        if ($ionicPlatform.isAndroid()) {
          opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
        };
    
        $cordovaContacts.find(opts).then(function (contactsFound) {
          $scope.contacts = contactsFound;
        });
      };
    
      $scope.pickContactUsingNativeUI = function () {
        $cordovaContacts.pickContact().then(function (contactPicked) {
          $scope.contact = contactPicked;
          
        })
      }
 
});

app.controller('PopupCtrl', function($scope, $timeout, $q, $ionicPopup) {
          $scope.sendOrder = function() {
            showPopup1.close();
            };
          $scope.closeLogin = function() {
    $scope.modal.hide();
  };
          $scope.showPopup1 = function() {
            $scope.data = {}

            $ionicPopup.show({
              templateUrl: 'templates/popup-template-CreateContact.html',
              title: 'Create Contact',
              scope: $scope,
              buttons: [
                { text: 'Cancel', onTap: function(e) { return true; } },
                {
                  text: '<b>Save</b>',
                  type: 'button-dark',
                  onTap: function(e) {
                    return false;
                  }
                },
              ]
              }).then(function(res) {
                console.log('Tapped!', res);
              }, function(err) {
                console.log('Err:', err);
              }, function(popup) {
                showPopup1.close();
              });

          };

          $scope.showConfirm = function() {
            $ionicPopup.confirm({
              title: 'Consume Ice Cream',
              content: 'Are you sure you want to eat this ice cream?'
            }).then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
          };
          $scope.showPrompt = function() {
            $ionicPopup.prompt({
              title: 'ID Check',
              subTitle: 'What is your name?'
            }).then(function(res) {
              console.log('Your name is', res);
            });
          };
          $scope.showPasswordPrompt = function() {
            $ionicPopup.prompt({
              title: 'Password Check',
              subTitle: 'Enter your secret password',
              inputType: 'password',
              inputPlaceholder: 'Your password'
            }).then(function(res) {
              console.log('Your name is', res);
            });
          };
          $scope.showAlert = function() {
            $ionicPopup.alert({
              templateUrl: 'popup-template-FaceNotRecog.html',
              title: 'Face Not Recognised',
              content: 'That\'s my sandwich'
            }).then(function(res) {
              console.log('Thank you for not eating my delicious ice cream cone');
            });
          };
          
            $scope.showPopup2 = function() {
            $scope.data = {}

            $ionicPopup.show({
              templateUrl: 'templates/popup-template-FaceNotRecog.html',
              title: 'Face Not Recognised',
              scope: $scope,
              buttons: [
                { text: 'Cancel', onTap: function(e) { return true; } },
                {
                  text: '<b>Save</b>',
                  type: 'button-dark',
                  onTap: function(e) {
                    return false;
                  }
                },
              ]
              }).then(function(res) {
                console.log('Tapped!', res);
              }, function(err) {
                console.log('Err:', err);
              }, function(popup) {
                showPopup2.close();
              });

          };
            $scope.showPopup3 = function() {
            $scope.data = {}

            $ionicPopup.show({
              templateUrl: 'templates/popup-template-UpdateExisting.html',
              title: 'Update Existing',
              scope: $scope,
              buttons: [
                { text: 'Cancel', onTap: function(e) { return true; } },
                {
                  text: '<b>Save</b>',
                  type: 'button-dark',
                  onTap: function(e) {
                    return $scope.data.wifi;
                  }
                },
              ]
              }).then(function(res) {
                console.log('Tapped!', res);
              }, function(err) {
                console.log('Err:', err);
              }, function(popup) {
                showPopup3.close();
              });

          };
      });