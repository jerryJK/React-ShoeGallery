//loading overlay
$(window).on('load', function() {
    $('#overlay').delay(1200).fadeOut(400);
    setTimeout(function() {
        scrollTo(0, 0);
    }, 0);
});
