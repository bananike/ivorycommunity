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
    $(document).on('click', '.btn_delete_poll_option_img', function () {
        deletePollOptionImg($(this));
    });

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
        '#registVoteCategory, #resgistVoteTitle, #voteContentText, [id^="votePollOption_"]',
        function () {
            changeInputValues($(this));
        }
    );

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
        '.slide_on .back_bg, #sliderVoteResult .close_popup',
        function () {
            closeResultSlidePopup($(this));
        }
    );

    // test
    // modalOn($('#btnAddVotePOLL'), '#addVoteContainer');
});

// --------------------------------------------
//
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
    $('#registVoteCategory').removeClass('error');

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

    if (_this.prop('scrollHeight') <= lineHeight * limitLine)
        _this
            .height(1)
            .height(
                _this.prop('scrollHeight') -
                    (paddingTop + paddingBottom + borderTop + borderBottom)
            );
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
function deletePollOptionImg(_this) {
    var box = _this.closest('.preview_img_box');
    box.removeClass('on');
    box.find('.input_img_uploader').val('');
    box.find('.on_img_box').prop('hidden', true);
    box.find('.btn_delete_poll_option_img').prop('hidden', true);
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
    alert('없음');
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
        ? $('#registVoteCategory').addClass('error')
        : null;
    $('#resgistVoteTitle').val().trim() == ''
        ? $('#resgistVoteTitle').addClass('error')
        : null;
    $('#voteContentText').val().trim() == ''
        ? $('#voteContentText').addClass('error')
        : null;

    var pollOptions = $('[id^="votePollOption_"]');
    var contents = 0;

    for (var i = 0; pollOptions.length > i; i++) {
        var item = $(pollOptions[i]);
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
}

// 020. 투표등록 인풋 항목 감지
function changeInputValues(_this) {
    _this.val().trim() != '' && _this.removeClass('error');

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

    body.addClass('slide_on');
    target.addClass(type);
}

// 023. 결과창 닫기
function closeResultSlidePopup(_this) {
    var body = $('body');
    var target = $('#sliderVoteResult');

    body.removeClass('slide_on');
    target.removeClass('is_poll is_vs');
}
