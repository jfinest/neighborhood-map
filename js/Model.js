var myModel;
      
function MyViewModel(markers) {
  var self = this;
  self.listings = ko.observableArray(getLocations());
  self.articles = ko.observableArray();
  self.markers = ko.observableArray(markers);
  self.noArticles = ko.observable();

  self.loadArticles = function(listing) {
    google.maps.event.trigger(self.markers()[listing.index], 'click');
  };

  self.activateMarkerClick = function(marker) {
    loadData(marker.title).done(function(data2) {
      //If return from JSON is less than 1 or error then show No Articles found to user.
      if (data2.length < 1){
        self.noArticles("No Articles Found");
        self.articles("");
        //else then set noArticles back to empty and pass along the array of articles to html.   
      }else {
        self.articles(data2);  
        self.noArticles("");  
      }
    }); 
  };

  self.searchCriteria = ko.observable("");
  self.detailsEnabled = ko.observable();
  show = ko.observable(true);
           
  enableDetails = function() {
  };
}

function showHideListings(listingTitle, listingIndex){

  var title = listingTitle.trim().toLowerCase();
  var search = myModel.searchCriteria().trim().toLowerCase();

  if ( search === "" ){
    for (var i = 0; i < myModel.markers().length; i++){
    myModel.markers()[listingIndex].setVisible(true);
  }
  return true;
  } else if (title.indexOf(search) >= 0 ){
    myModel.markers()[listingIndex].setVisible(true);
  return true;
  } else{
    myModel.markers()[listingIndex].setVisible(false);
  return false;
  }
}

      
deferScript.done(function(data) {
  ko.options.deferUpdates = true;
  myModel = new MyViewModel(data);
  ko.applyBindings(myModel);
});