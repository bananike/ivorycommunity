$(document).ready(function () {
    // 스와이프
    const swiperTop5 = new Swiper('#top5Swiper', {
        effect: 'cards',
        cardsEffect: {
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    const swiperResult = new Swiper('#resultSwipe', {
        slidesPerView: 'auto',
        spaceBetween: 30,
    });

    // 탑5 투표하기 클릭
    $(document).on('click', '#btnVoteReadyTop5', function () {
        changeTop5VoteBtn($(this));
    });

    // 메인 카테고리 버튼 클릭(활성화)
    $(document).on('click', '#categoryList button', function (e) {
        e.preventDefault();
        activeCategoryBtn($(this), $('#categoryList'));
    });

    // 필터 버튼 클릭(활성화)
    $(document).on(
        'click',
        '[id^="btnVoteFilterStatus"], [id^="btnVoteFilterType"]',
        function () {
            onClickVoteFilterBtn($(this));
        }
    );

    // 등록하기 클릭(모달)
    $(document).on('click', '#btnAddVotePOLL, #btnAddVoteVS', function (e) {
        e.preventDefault();

        // 버튼 초기화
        closeFloatingButton();

        var target =
            $(this).attr('id').indexOf('POLL') != -1 ? 'on_poll' : 'on_vs';
        $('#addVoteContainer').addClass(target);

        modalOn($(this), '#addVoteContainer');
    });

    // 모달 닫기
    $(document).on(
        'click',
        '.modal_back, .modal_container .close_btn',
        function () {
            modalOff($(this));
        }
    );

    // 이유모아보기 클릭(모달)
    $(document).on('click', '.btn_show_total_reason', function (e) {
        e.preventDefault();

        modalOn($(this), '#totalReason');
    });

    // 모달 닫기
    $(document).on(
        'click',
        '.modal_back, .modal_container .close_btn',
        function () {
            modalOff($(this));
        }
    );

    // 이미지 업로드 프리뷰
    $(document).on('change', '.input_img_uploader', function (e) {
        onClickPreviewImageUpload($(this), e);
    });

    // 투표등록 등록된 이미지 제거
    $(document).on('click', '.btn_delete_img', function () {
        deleteImg($(this));
    });

    // textarea 글 라인 체크
    $('.textarea_auto_line').on('keyup keydown', function () {
        changeTextAreaLine($(this));
    });

    // 폴 옵션 삭제 모드
    $(document).on('click', '#btnOnDeleteMode', function () {
        changePollOptionDeleteMode();
    });

    // 폴 옵션 삭제
    $(document).on('click', '.btn_delete_option', function () {
        deletePollOption($(this));
    });

    // 폴 옵션 추가 버튼
    $(document).on('click', '#btnAddPollOption', function () {
        cloneAddVotePollOption();
    });

    // 폴 이미지 삭제 버튼
    $(document).on(
        'click',
        '.btn_delete_poll_option_img, .btn_delete_vs_card_img',
        function () {
            deleteVoteIOptionImg($(this));
        }
    );

    // 등록하기 버튼 클릭
    $(document).on('click', '#btnRegistVote', function () {
        if ($(this).hasClass('disable')) {
            // 발리데이션 클래스 추가
            onValidateRequire();
        } else {
            // 등록 진행
        }
    });

    // 복수선택, 마감시간 설정박스 보이기
    $(document).on(
        'change',
        '#checkVoteMultiSelect, #checkVoteLimitTime',
        function () {
            toggleSettingBox($(this));
        }
    );

    // 복수선택 숫자입력패널 호출
    $(document).on('click', '#btnOnInputMultiCount', function () {
        onMultiSelectCountPanel();
    });

    // 갯수제한 없음 선택 시 복수선택버튼 비활성화
    $(document).on('change', '#btnPollMultiSelectNoLimit', function () {
        onChangeMultiSelectNoLimit($(this));
    });

    // 작성 항목 감지로 등록하기버튼, error 클래스 제거
    $(document).on(
        'change keyup',
        '#registVoteCategory, #resgistVoteTitle, #voteContentText, [id^="votePollOption_"], [id^="textareaVsCard"]',
        function () {
            changeInputValues($(this));
        }
    );

    $(document).on('focus', '[id^="votePollOption_"]', function () {
        $(this).closest('.form_group').removeClass('error');
        $(this).closest('.form_group').addClass('focusing');
    });
    $(document).on('blur', '[id^="votePollOption_"]', function () {
        $(this).closest('.form_group').removeClass('focusing');
    });

    // 카테고리선택 클릭(모달)
    $(document).on('click', '#btnRegistVoteCategory', function (e) {
        e.preventDefault();
        modalOn($(this), '#selectCategoryPanel');
    });

    // 카테고리선택 버튼 클릭
    $(document).on('click', '#categorySelectList button', function (e) {
        e.preventDefault();
        activeCategoryBtn($(this), $('#categorySelectList'));
    });

    // 투표완료버튼 클릭시 결과창 호출
    $(document).on('click', '.btn_complete', function () {
        callResultSlidePopup($(this));
    });

    // 결과창 닫기
    $(document).on(
        'click',
        '.result_slide_on .back_bg, #sliderVoteResult .close_popup',
        function () {
            closeResultSlidePopup($(this));
        }
    );

    // 댓글상세 호출
    $(document).on('click', '.view_more_rereply', function () {
        callReplySlidePopup($(this));
    });

    // 댓글 닫기
    $(document).on(
        'click',
        '.reply_slide_on .back_bg, #sliderReplyDetail .close_popup',
        function () {
            closeReplySlidePopup($(this));
        }
    );

    // 프로그레스 설정
    progressBar(
        $('.progress_box'),
        $('.srcoll_container'),
        $('.scroll_header')
    );

    // 하트클릭 ui 변경
    $(document).on('click', '.btn_heart', function () {
        clickHeart($(this));
    });

    // 코멘트 박스 보이기
    onSlideCommentBox($('#inputReplyDetail'), $(window), $('.detail_header'));
    onSlideCommentBox(
        $('#inputReplyResult'),
        $('#sliderVoteResult .srcoll_container'),
        $('#sliderVoteResult .scroll_header')
    );

    // 댓글입력하면 플레이스홀더 가리기
    $(document).on('input', '.text_input_box', function () {
        commentPlaceholder($(this));
    });

    // 대댓글 클릭하면 댓글입력창에 번호 생성
    $(document).on('click', '.btn_rereply', function () {
        onClickRereply($(this));
    });

    // 입력창 댓글타겟 클릭해서 지우기
    $(document).on('click', '.reply_comment_input_box .target', function () {
        onClickDeleteReplyTarget($(this));
    });

    // 스크롤 모달 애니메이션 실행
    medalAnimation($('.medal'), $('.srcoll_container'), $('.scroll_header'));

    // 폴 아이템 선택 시 ui변경
    $(document).on('change', '.poll_checker', function () {
        checkPollItem($(this));
    });

    // 항목선택이유 건너뛰기
    $(document).on('click', '.btn_reason_ignore', function () {
        noInputReason($(this));
    });

    // 항목선택이유 수정
    $(document).on('click', '.btn_modify_voted_reason', function () {
        reasonModfiy($(this));
    });

    // vs 카드 선택
    $(document).on('click', '[name=selectVs]', function () {
        selectVSCard($(this));
    });

    // vs카드 등록 textarea 포커싱
    $(document).on('focus', '.vs_card_text', function () {
        focusVoteRegistVSCard($(this), 'focus');
    });
    $(document).on('blur', '.vs_card_text', function () {
        focusVoteRegistVSCard($(this), 'blur');
    });

    // vs 내가선택한이유
    $(document).on('click', '.btn_voted_reason', function () {
        onVSVotedReason($(this));
    });

    // 공유하기 모달
    $(document).on(
        'click',
        '.btn_share_fadeModal, .modal_share .btn_close_modal',
        function () {
            fadeInModal($('.modal_share'));
        }
    );

    // 신고하기 모달
    $(document).on(
        'click',
        '.btn_report_fadeModal, .modal_report .btn_close_modal',
        function () {
            fadeInModal($('.modal_report'));
        }
    );

    // 신고하기 버튼활성화 체크
    $(document).on('change', '[name=report_type]', function () {
        onChangeReportType($(this));
    });

    // 리플 펑션 모달 켜기
    $(document).on('click', '.btn_more', function () {
        onModalReplyFn($(this));
    });

    // 리플펄셩 닫기
    $(document).on('click', '.fn_cancel, .reply_fn_container', function () {
        offModalReplyFn($(this));
    });

    // 선택이유 코멘트 수정
    $(document).on('click', '.btn_comment_modify', function () {
        onReasonCommentModify($(this));
    });
    $(document).on('click', '.btn_comment_cancel', function () {
        offReasonCommentModify($(this));
    });

    // 커뮤니티 알림 모달
    $(document).on('click', '#btnOnNotification', function (e) {
        e.preventDefault();

        modalOn($(this), '#notificationWrap');
    });
});

// --------------------------------------------
//
//
// test
// modalOn($('#btnAddVotePOLL'), '#addVoteContainer');
//
//
//
//
//
//
//
//
// --------------------------------------------

// 001. top5 투표하기 버튼 변경
function changeTop5VoteBtn(_this) {
    var completeBtn = _this
        .closest('.top_5_detail')
        .find('#btnVoteCompleteTop5');
    _this.prop('hidden', true);
    completeBtn.prop('hidden', false);
}

// 002. 카테고리 버튼 활성화
function activeCategoryBtn(_this, listWrapper) {
    listWrapper.find('li.active').removeClass('active');
    _this.closest('li').addClass('active clicking');
    if (listWrapper.attr('id') == 'categorySelectList')
        selectCategoryInput(_this);
    $('#btnRegistVoteCategory').removeClass('error');

    setTimeout(function () {
        _this.closest('li').removeClass('clicking');
    }, 300);
}

// 003. 투표리스트 필터버튼 모양
function onClickVoteFilterBtn(_this) {
    if (_this.attr('id').indexOf('Type') != -1) {
        // 타입 버튼
        $('[id^="btnVoteFilterType"]').removeClass('fill');
        $('[id^="btnVoteFilterType"]').addClass('outline');
        _this.removeClass('outline');
        _this.addClass('fill');
    } else {
        // 상태 버튼
        $('[id^="btnVoteFilterStatus"]').removeClass('fill');
        $('[id^="btnVoteFilterStatus"]').addClass('outline');
        _this.removeClass('outline');
        _this.addClass('fill');
    }
}

// 004. 모달
function modalOn(_this, container) {
    console.log(container);
    $('body').addClass('modal_on');
    $(container).css('display', 'block');
}

// 005. 모달 닫기
function modalOff(_this) {
    var container = _this.closest('.modal_container');
    container.addClass('closing');
    setTimeout(function () {
        container.css('display', 'none');
        container.removeClass('closing on_vs on_poll');

        if (!container.hasClass('level_2')) {
            $('body').removeClass('modal_on');
        }
    }, 500);
}

// 006. 등록버튼 플로팅 닫기
function closeFloatingButton() {
    $('body').removeClass('is-blur');
    $('.floating-container').removeClass('is-opened');
}

// 007. 이미지 프리뷰
function onClickPreviewImageUpload(_this, e) {
    var box = _this.closest('.preview_img_box');
    var previewImage = box.find('.preview_img');
    var list = _this.closest('ul');

    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
            previewImage.attr('src', e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);

        box.find('.on_img_box').prop('hidden', false);
        box.find('.btn_delete_img').prop('hidden', false);
        box.find('.btn_delete_poll_option_img').prop('hidden', false);
        box.find('.btn_delete_vs_card_img').prop('hidden', false);
        box.find('.none_img_box').prop('hidden', true);

        if (
            $('#votePreviewImgList .img_item:last-child .none_img_box').prop(
                'hidden'
            )
        ) {
            cloneVotePreviewImageUploader();
        }

        if (list.attr('id') == 'votePollOpionList') {
            _this.closest('label').addClass('on');
        }
    }
}

// 008. 투표등록 이미지 등록인풋 조건부 생성
function cloneVotePreviewImageUploader() {
    var wrapper = $('#votePreviewImgList');
    var cloneItem = $('#cloneRegistImgItem').clone(true);
    var id = cloneItem.find('.input_img_uploader').attr('data-id');

    if (wrapper.find('li').length <= 0) {
        cloneElement(cloneItem, wrapper, 0);
    } else {
        // 이미지가 등록되어있을때
        var currentList = $('.input_img_uploader[id^=' + id + ']');
        var numberArr = [];
        var idIndex = 0;

        for (var i = 0; currentList.length > i; i++) {
            var item = $(currentList[i]);
            numberArr.push(item.attr('id').split('_').pop());
        }

        var compareArr = numberArr.sort(function (a, b) {
            return a - b;
        });
        for (var ii = 0; compareArr.length > ii; ii++) {
            if (compareArr[ii] == idIndex) {
                idIndex++;
            }
        }

        cloneElement(cloneItem, wrapper, idIndex);
    }
}
// 첫번째 빈박스 생성
cloneVotePreviewImageUploader();

// 009. 복제
function cloneElement(item, target, index) {
    var appendImgId = item.find('.input_img_uploader').attr('data-id');
    item.attr('id', '');
    item.find('.preview_img_box').attr('for', appendImgId + index);
    item.find('.input_img_uploader').attr('id', appendImgId + index);

    if (item.find('.vote_poll_text').length > 0) {
        var appendTextId = item.find('.vote_poll_text').attr('data-id');
        item.find('.vote_poll_text').attr('id', appendTextId + index);
        item.find('.vote_poll_text').attr(
            'placeholder',
            '항목 ' + (index + 1) + ' 입력'
        );
    }

    item.prop('hidden', false);
    target.append(item);
}

// 010. 등록된 프리뷰 이미지 제거
function deleteImg(_this) {
    _this.closest('li').remove('.img_item');
}

// 011. textarea 높이 변경
function changeTextAreaLine(_this) {
    var lineHeight = _this.css('line-height').split('px')[0] * 1;
    var paddingTop = _this.css('padding-top').split('px')[0] * 1;
    var paddingBottom = _this.css('padding-bottom').split('px')[0] * 1;
    var borderTop = _this.css('border-top-width').split('px')[0] * 1;
    var borderBottom = _this.css('border-bottom-width').split('px')[0] * 1;
    var limitLine = _this.attr('data-limit-line') * 1 + 1;

    var isHiddenWrapper = _this.closest('.input_write_reason');

    if (isHiddenWrapper.length > 0) {
        var boxheader = isHiddenWrapper.find('.box_header');
        var textbox = isHiddenWrapper.find('.text_input_box');

        var height =
            boxheader.height() +
            textbox.height() +
            boxheader.css('margin-top').split('px')[0] * 1 +
            boxheader.css('margin-bottom').split('px')[0] * 1 +
            textbox.css('margin-top').split('px')[0] * 1 +
            textbox.css('margin-bottom').split('px')[0] * 1;
        isHiddenWrapper.height(height);
    }

    if (_this.prop('scrollHeight') <= lineHeight * limitLine) {
        _this
            .height(1)
            .height(
                _this.prop('scrollHeight') -
                    (paddingTop + paddingBottom + borderTop + borderBottom)
            );
    }
}

// 012. 폴 옵션 삭제모드 변환
function changePollOptionDeleteMode() {
    $('#votePollOpionList').toggleClass('delete_mode');
}

// 013. 폴 옵션 추가
function cloneAddVotePollOption() {
    var wrapper = $('#votePollOpionList');
    var cloneItem = $('#cloneRegistPollOption').clone(true);
    var id = cloneItem.find('.input_img_uploader').attr('data-id');

    var currentList = $('.input_img_uploader[id^=' + id + ']');
    var numberArr = [];
    var idIndex = 0;

    for (var i = 0; currentList.length > i; i++) {
        var item = $(currentList[i]);
        numberArr.push(item.attr('id').split('_').pop());
    }

    var compareArr = numberArr.sort(function (a, b) {
        return a - b;
    });
    for (var ii = 0; compareArr.length > ii; ii++) {
        if (compareArr[ii] == idIndex) {
            idIndex++;
        }
    }

    if (idIndex < 30) cloneElement(cloneItem, wrapper, idIndex);
    else
        callAlert({
            title: '아이보리 알림',
            content: '30개 이상 추가 시 얼럿 출력',
            btn: '확인',
        });
}
// 최초 3개 항목 생성
[...Array(3)].map(() => cloneAddVotePollOption());

// 014. 폴 옵션 이미지 삭제
function deleteVoteIOptionImg(_this) {
    var box = _this.closest('.preview_img_box');
    box.removeClass('on');
    box.find('.input_img_uploader').val('');
    box.find('.on_img_box').prop('hidden', true);
    box.find('.btn_delete_poll_option_img').prop('hidden', true);
    box.find('.btn_delete_vs_card_img').prop('hidden', true);
    box.find('.none_img_box').prop('hidden', false);
}

// 015. 폴 옵션 삭제
function deletePollOption(_this) {
    var wrapper = _this.closest('li');
    wrapper.remove();
}

// 016. 체크박스 상세 열기
function toggleSettingBox(_this) {
    var wrapper = _this.closest('.setting_sub_wrapper');
    var hidebox = wrapper.find('.hide_box');

    if (_this.prop('checked')) {
        hidebox.addClass('on');
    } else {
        hidebox.removeClass('on');
    }
}

// 017. 숫자입력 패널
function onMultiSelectCountPanel() {
    $('#multiSelectOptionBox').addClass('is_opened');
    $('#multiSelectOptionBox').css(
        'height',
        $('#multiSelectOptionBox').prop('scrollHeight')
    );

    $(document).on(
        'click',
        '#multiSelectOptionBox .select_option',
        function () {
            $(this).addClass('selecting');

            var selectvalue = $(this).text().trim();

            setTimeout(function () {
                $('#btnOnInputMultiCount').html(selectvalue);
                $('#btnOnInputMultiCount').addClass('selected');
                $('#multiSelectOptionBox .select_option').removeClass(
                    'selecting'
                );

                $('#multiSelectOptionBox').removeClass('is_opened');
                $('#multiSelectOptionBox').css('height', 0);
            }, 300);
        }
    );

    $(document).on('click', '#multiSelectOptionBox ~ .backdrop', function () {
        $('#multiSelectOptionBox').removeClass('is_opened');
        $('#multiSelectOptionBox').css('height', 0);
    });
}

// 018. 갯수제한 없음 선택
function onChangeMultiSelectNoLimit(_this) {
    if (_this.prop('checked')) {
        $('#btnOnInputMultiCount').prop('disabled', true);
    } else {
        $('#btnOnInputMultiCount').prop('disabled', false);
    }
}

// 019. 필수항목작성 ui출력
function onValidateRequire() {
    $('#registVoteCategory').val().trim() == ''
        ? $('#btnRegistVoteCategory').addClass('error')
        : null;
    $('#resgistVoteTitle').val().trim() == ''
        ? $('#resgistVoteTitle').addClass('error')
        : null;
    $('#voteContentText').val().trim() == ''
        ? $('#voteContentText').addClass('error')
        : null;

    if ($('#addVoteContainer').hasClass('on_poll')) {
        var pollOptions = $('[id^="votePollOption_"]');
        var contents = 0;

        for (var i = 0; pollOptions.length > i; i++) {
            var item = $(pollOptions[i]);
            if (item.val().trim() == '')
                item.closest('.form_group').addClass('error');
            if (item.val().trim() != '') contents++;
        }
        if (contents < 3) {
            callAlert({
                title: '아이보리 알림',
                content:
                    'POLL은 <span style="color: #FB8713;">최소 3개 항목등록</span>이 필수입니다.',
                btn: '확인',
            });
        }
    } else if ($('#addVoteContainer').hasClass('on_vs')) {
        var vsCards = $('[id^=textareaVsCard]');

        for (var i = 0; vsCards.length > i; i++) {
            var item = $(vsCards[i]);
            if (item.val().trim() == '')
                item.closest('[class^=card_vs_]').addClass('error');
        }
        if (
            $('#textareaVsCardA').val().trim() == '' ||
            $('#textareaVsCardB').val().trim() == ''
        ) {
            callAlert({
                title: '아이보리 알림',
                content:
                    '<span style="color: #FB8713;">VS의 두 항목</span>은 모두 필수입력입니다.',
                btn: '확인',
            });
        }
    }
}

// 020. 투표등록 인풋 항목 감지
function changeInputValues(_this) {
    _this.val().trim() != '' && _this.removeClass('error');

    if (_this.attr('id') == 'registVoteCategory')
        $('.btn_select_category').removeClass('error');

    if (_this.hasClass('vs_card_text'))
        _this.closest('[class^=card_vs_]').removeClass('error');

    var valid = false;

    // 항목 3개체크
    var pollOptions = $('[id^="votePollOption_"]');
    var contents = 0;

    for (var i = 0; pollOptions.length > i; i++) {
        var item = $(pollOptions[i]);
        if (item.val().trim() != '') contents++;
    }

    $('#registVoteCategory').val().trim() != '' &&
    $('#resgistVoteTitle').val().trim() != '' &&
    $('#voteContentText').val().trim() != '' &&
    contents > 2
        ? $('#btnRegistVote').removeClass('disable')
        : $('#btnRegistVote').addClass('disable');
}

// 021. 카테고리 선택 입력
function selectCategoryInput(_this) {
    var value = _this.find('.select_category_value').text();
    $('#registVoteCategory').val(value);
    $('#voteCategoryText').text(value);
    $('#registVoteCategory').attr('data-is-data', true);

    setTimeout(function () {
        modalOff(_this);
    }, 300);
}

// 022. 결과창 호출
function callResultSlidePopup(_this) {
    var body = $('body');
    var type = _this.closest('li').hasClass('type_poll') ? 'on_poll' : 'on_vs';
    var target = $('#sliderVoteResult');

    body.addClass('result_slide_on');
    target.addClass(type);
}

// 023. 결과창 닫기
function closeResultSlidePopup(_this) {
    var body = $('body');
    var target = $('#sliderVoteResult');

    body.removeClass('result_slide_on');
    target.removeClass('on_poll on_vs');
}

// 024. 프로그레스 바
function progressBar(_this, container, header) {
    var height = container.height();
    var headerHeight = header.outerHeight();
    initProgress(_this, height, headerHeight);

    $(container).scroll(function () {
        initProgress(_this, height, headerHeight);
    });

    // 반복문
    function initProgress(_this, height, headerHeight) {
        for (var i = 0; _this.length > i; i++) {
            var progress = $(_this[i]);
            var offset = progress.offset().top;
            var progressdata = progress.attr('data-progress') * 1;
            var foreground = progress.find('.foreground');
            var startPosition = $(document).scrollTop();

            if (
                offset - headerHeight - startPosition + progress.height() <
                height
            ) {
                foreground.css('width', progressdata + '%');
                if (progressdata == 0) {
                    foreground.css('opacity', 0);
                } else {
                    foreground.css('opacity', 1);
                }
                if (
                    progress.height() >
                    (progress.width() / 100) * progressdata
                ) {
                    console.log(
                        progress.height(),
                        progress.width(),
                        progressdata
                    );
                    foreground.css({ 'min-width': 0, 'border-radius': '50%' });
                }
            } else {
                foreground.css('width', 0);
            }
        }
    }
}

// 025. 하트 클릭
function clickHeart(_this) {
    _this.toggleClass('clicked');
}

// 026. 코멘트 박스 보임
function onSlideCommentBox(_this, container, header) {
    $(container).scroll(function () {
        for (var i = 0; _this.length > i; i++) {
            var textbox = $(_this[i]);
            var wrapper = textbox.closest('.reply_wrapper');
            var height = container.height();
            var headerHeight = header.outerHeight();
            var baseCommentItemHeight = 200;
            var startPosition = $(document).scrollTop();

            if (
                wrapper.offset().top -
                    headerHeight -
                    startPosition +
                    textbox.outerHeight() +
                    baseCommentItemHeight <
                height
            ) {
                textbox.addClass('on_slide');
            } else {
                textbox.removeClass('on_slide');
            }
        }
    });
}

// 027. 댓글입력 플레이스홀더
function commentPlaceholder(_this) {
    var val = _this.html();

    if (val.trim() != '') {
        _this.addClass('is_focus');
    } else {
        _this.removeClass('is_focus');
    }
}

// 028. 대댓글 클릭
function onClickRereply(_this) {
    var wrapper = _this.closest('.reply_wrapper');
    console.log(wrapper.length);
    if (wrapper.length <= 0) {
        wrapper = _this.closest('.reply_detail');
    }
    var targetReply =
        '@' +
        _this
            .closest('.reply_item')
            .find('.reply_info .reply_count span:eq(0)')
            .text() +
        _this
            .closest('.reply_item')
            .find('.reply_info .reply_count .num')
            .text();

    var targetContainer = wrapper
        .find('.reply_comment_input_box > .target')
        .clone(true);

    if (wrapper.find('.text_input_box .target').length > 0) {
        wrapper.find('.text_input_box .target').text(targetReply);
    } else {
        targetContainer.text(targetReply);
        targetContainer.prop('hidden', false);

        wrapper.find('.text_input_box').prepend(targetContainer);
    }
    wrapper.find('.text_input_box').addClass('is_focus');

    wrapper.find('.text_input_box span').focus();
}

// 029. 댓글 타겟 지우기
function onClickDeleteReplyTarget(_this) {
    _this.remove();
}

// 030. 메달 애니메이션
function medalAnimation(_this, container, header) {
    var height = container.height();
    var headerHeight = header.outerHeight();
    var startPosition = $(document).scrollTop();
    $(container).scroll(function () {
        for (var i = 0; _this.length > i; i++) {
            var medal = $(_this[i]);
            var offset = medal.offset().top;

            if (offset - headerHeight - startPosition < height) {
                medal.addClass('on_animation');
            } else {
                medal.removeClass('on_animation');
            }
        }
    });
}

// 031. 투표선택 poll 숨긴박스 표시
function checkPollItem(_this) {
    var val = _this.prop('checked');
    var wrapper = _this.closest('.vote_select_item');
    var target = '';
    var margin = wrapper.css('margin-bottom').split('px')[0] * 1;

    if (wrapper.hasClass('is_voted')) {
        target = wrapper.find('.voted_reason');
    } else {
        target = wrapper.find('.input_write_reason');
    }

    // .text_box .text 에 내용 입력 후 (내부 높이를 가져와서 열어야함)

    if (val) {
        target.css({
            height: target.prop('scrollHeight'),
            'margin-top': margin,
            'margin-bottom': margin * 2.5,
        });
    } else {
        target.css({ height: 0, 'margin-top': 0, 'margin-bottom': 0 });
    }
}

// 032. 건너뛰기 버튼
function noInputReason(_this) {
    var box = _this.closest('.input_write_reason');
    var textarea = box.find('textarea');
    var arrowbox = $('.arrow_box');

    textarea.val('');
    arrowbox.prop('hidden', true);
    box.css({ height: 0, 'margin-top': 0, 'margin-bottom': 0 });
}

// 033. 수정하기 버튼
function reasonModfiy(_this) {
    var type = _this.hasClass('poll') ? 'poll' : 'vs';

    var wrapper =
        type == 'poll'
            ? _this.closest('.vote_select_item')
            : _this.closest('.vs_wrapper');

    var box = _this.closest('.voted_reason');
    var inputbox = wrapper.find('.input_write_reason');
    var textarea = inputbox.find('textarea');
    var val = _this.closest('.text_box').find('.text').text();
    var margin = wrapper.css('margin-bottom').split('px')[0] * 1;

    wrapper.removeClass('is_voted');
    box.css({ height: 0, 'margin-top': 0, 'margin-bottom': 0 });
    box.removeClass('is_opened a b');
    var replace = val.replace(/\n|\r/g, '');
    textarea.val(replace);
    inputbox.css({
        height: inputbox.prop('scrollHeight'),
        'margin-top': margin,
        'margin-bottom': margin * 2.5,
    });
}

// 034. vs 버튼클릭
function selectVSCard(_this) {
    var select = _this.val();
    var wrapper = _this.closest('.vs_wrapper');
    var inputbox = wrapper.find('.input_write_reason');
    var margin = $('.vs_a').css('margin-right').split('px')[0] * 1;
    var arrowbox = $('.arrow_box');
    var isVoted = _this.closest('.is_voted').length > 0 ? true : false;

    if (!isVoted) {
        var votedReason = wrapper.find('.voted_reason');
        votedReason.css({
            height: 0,
            'margin-top': 0,
            'margin-bottom': 0,
        });
        votedReason.removeClass('is_opened a b');
        if (inputbox.hasClass('is_opened') && !inputbox.hasClass(select)) {
            inputbox.css({
                height: 0,
                'margin-top': 0,
                'margin-bottom': 0,
            });
            inputbox.removeClass('is_opened');
            inputbox.removeClass('a b');
            arrowbox.prop('hidden', true);
            arrowbox.removeClass('a b');

            setTimeout(function () {
                inputbox.css({
                    height: inputbox.prop('scrollHeight'),
                    'margin-top': margin,
                    'margin-bottom': margin * 2.5,
                });
                inputbox.addClass('is_opened');
                inputbox.addClass(select);
                setTimeout(function () {
                    arrowbox.prop('hidden', false);
                }, 150);
                arrowbox.addClass(select);
            }, 300);
        } else {
            inputbox.css({
                height: inputbox.prop('scrollHeight'),
                'margin-top': margin,
                'margin-bottom': margin * 2.5,
            });
            inputbox.addClass('is_opened');
            inputbox.addClass(select);
            setTimeout(function () {
                arrowbox.prop('hidden', false);
            }, 150);
            arrowbox.addClass(select);
        }
    } else {
        inputbox.css({
            height: 0,
            'margin-top': 0,
            'margin-bottom': 0,
        });
        inputbox.removeClass('is_opened');
        inputbox.removeClass('a b');
        arrowbox.prop('hidden', true);
        arrowbox.removeClass('a b');
    }
}

// 035. vs등록 포커스 스타일
function focusVoteRegistVSCard(_this, event) {
    var card = _this.closest('[class^=card_vs_]');

    if (event == 'focus') {
        card.addClass('focusing');
    } else if (event == 'blur') {
        card.removeClass('focusing');
    }
}

// 036. vs 내가선택한이유
function onVSVotedReason(_this) {
    var select = _this
        .closest('[class^="vs_"]')
        .find('input[type="radio"]')
        .val();
    var wrapper = _this.closest('.vs_wrapper');
    var box = wrapper.find('.voted_reason');
    var margin = wrapper.css('margin-bottom').split('px')[0] * 1;

    // .text_box .text 에 내용 입력 후 (내부 높이를 가져와서 열어야함)

    if (box.hasClass('is_opened') && !box.hasClass(select)) {
        box.css({
            height: 0,
            'margin-top': 0,
            'margin-bottom': 0,
        });
        box.removeClass('is_opened');
        box.removeClass('a b');

        setTimeout(function () {
            box.css({
                height: box.prop('scrollHeight'),
                'margin-top': margin,
                'margin-bottom': margin / 2.5,
            });
            box.addClass('is_opened');
            box.addClass(select);
        }, 300);
    } else if (box.hasClass('is_opened') && box.hasClass(select)) {
        box.css({
            height: 0,
            'margin-top': 0,
            'margin-bottom': 0,
        });
        box.removeClass('is_opened');
        box.removeClass('a b');
    } else {
        box.css({
            height: box.prop('scrollHeight'),
            'margin-top': margin,
            'margin-bottom': margin / 2.5,
        });
        box.addClass('is_opened');
        box.addClass(select);
    }
}

// 037. 모달 페이드인
function fadeInModal(modal) {
    if (!modal.hasClass('opened')) {
        $('body').addClass('double_modal');
        modal.addClass('opened');
        modal.css('display', 'flex');
    } else {
        modal.addClass('closing');

        setTimeout(function () {
            $('body').removeClass('double_modal');
            modal.removeClass('opened');
            modal.css('display', 'none');
            modal.removeClass('closing');
        }, 300);
    }
}

// 038. 신고하기 버튼 활성화
function onChangeReportType(_this) {
    var value = $('[name=report_type]:checked').val();
    var btn = _this.closest('.report_container').find('.btn_submit');

    if (value != undefined) {
        btn.prop('disabled', false);
    } else {
        btn.prop('disabled', true);
    }
}

// 039. 리플상세 호출
function callReplySlidePopup(_this) {
    var body = $('body');
    var target = $('#sliderReplyDetail');

    body.addClass('reply_slide_on');
}

// 040. 리플상세 닫기
function closeReplySlidePopup(_this) {
    var body = $('body');

    body.removeClass('reply_slide_on');
}

// 041. 리플 펑션 모달
function onModalReplyFn(_this) {
    var wrapper = _this.closest('.reply_wrapper');
    if (wrapper.length <= 0) {
        wrapper = _this.closest('.reply_detail');
    }
    $('body').addClass('modal_on');

    var modal = wrapper.find('.modal_reply_fn');
    modal.css('display', 'block');
}

// 042. 리플 펑션모달 닫기
function offModalReplyFn(_this) {
    var wrapper = _this.closest('.modal_reply_fn');

    wrapper.addClass('closing');

    setTimeout(function () {
        wrapper.css('display', 'none');
        wrapper.removeClass('closing');
        $('body').removeClass('modal_on');
    }, 300);
}

// 043. 선택이유 코멘트 수정
function onReasonCommentModify(_this) {
    var box = _this.closest('.text_comment_input');
    box.addClass('editing');
    box.find('.editable_text').attr('contenteditable', true);
    _this.prop('hidden', true);
    _this.siblings('.btn_comment_save').prop('hidden', false);
    _this.siblings('.btn_comment_cancel').prop('hidden', false);
}

// 044. 선택이유 코멘트 닫기
function offReasonCommentModify(_this) {
    var box = _this.closest('.text_comment_input');
    box.removeClass('editing');
    box.find('.editable_text').attr('contenteditable', false);
    _this.prop('hidden', true);
    _this.siblings('.btn_comment_save').prop('hidden', true);
    _this.siblings('.btn_comment_modify').prop('hidden', false);
}
