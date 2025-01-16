$(document).ready(function() {
    $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${getSearchTerm()}&key=${AIzaSyDr0b4v9ASGPvRMpGN5OTvXlDNiB45mMMg}", function (data) {
        var dataContainer = $("#videos ul");
        $.each(data.data.items, function(i, val) {
            if(typeof(val.player) !== 'undefined' && typeof(val.title) !== 'undefined') {
                dataContainer.append("<li><a href=" + val.player.default+" target='_blank'>"+val.title+"</a></li>");
            }
        });
    });
});