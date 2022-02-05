// 알럿
function callAlert(value) {
    var body = $('body');
    var alert = '';
    alert += '<div class="alert"><div class="alert_container">';
    alert += '<div class="title">';
    alert += value.title;
    alert += '</div><div class="content">';
    alert += value.content;
    alert +=
        '</div><div class="btn_group"><button type="button" class="alert_conform">';
    alert += value.btn;
    alert += '</button></div></div><div class="back"></div></div>';
    body.addClass('alert_on');
    body.append(alert);
}

// 알럿 컨펌 버튼
$(document).on('click', '.alert_conform, .alert .back', function () {
    var body = $('body');
    $('.alert').remove();
    body.removeClass('alert_on');
});
