$('.floating-button').on('click', function () {
    if (!$('.floating-container').hasClass('is-opened')) {
        $(this).parent('.floating-container').addClass('is-opened');
        $('body').toggleClass('is-blur');
    } else {
        $(this).parent('.floating-container').removeClass('is-opened');
        $('body').removeClass('is-blur');
    }
});

/*$('.floating-container').on("mouseout", function(){
$(this).parent('.floating-container').removeClass('is-opened');
$('body').removeClass('is-blur');
})*/ $(document).click(function (event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest('.floating-container').length) {
        $('.floating-button')
            .parent('.floating-container')
            .removeClass('is-opened');
        $('body').removeClass('is-blur');
    }
});
