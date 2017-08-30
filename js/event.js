//triggers marker click event through data attribute 
$("body").on("click", "[data-marker-index]", function(e){
    e.preventDefault();
      var index = $(this).data("marker-index");
      console.info('Triggering ' + markers[index].title + ' markers click event');
      google.maps.event.trigger(markers[index], 'click');
});

//Event to filter places on change of search input
$("body").on("change", "#filter-places", function(e){
    e.preventDefault();
    var value = $(this).val().toUpperCase();
    var markersToHide = [];
    var markersToShow = [];
    
    console.info('Filetering data for search criteria: ' + value );
    if(value !==  ""){
      $("#listing li").css("display", "block");
          $("li").filter(":not(:contains('" + value + "'))").css("display", "none");
    }else{
      $("#listing li").css("display", "block");
    }
    //Get markers that are to be hidden!!
    $("#listing li:not(:visible)").each(function(){
        markersToHide.push(markers[$(this).data("marker-index")]);
    });
    //Get markers that are to be shown!!
    $("#listing li:visible").each(function(){
        markersToShow.push(markers[$(this).data("marker-index")]);
    });
    
    hideMarkers(markersToHide);
    showMarkers(markersToShow);
});