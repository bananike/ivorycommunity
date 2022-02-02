$(document).ready(function () {
    $(document).on('click', '#btnVoteReadyTop5', function () {
        changeTop5VoteBtn($(this));
    });

    $(document).on('click', '#categoryList a', function (e) {
        e.preventDefault();
        activeCategoryBtn($(this));
    });

    $(document).on(
        'click',
        '[id^="btnVoteFilterStatus"], [id^="btnVoteFilterType"]',
        function () {
            onClickVoteFilterBtn($(this));
        }
    );

    $(document).on('click', '#btnAddVote', function () {
        onClickAddVoteBtn($(this));
    });
});

// 001. top5 투표하기 버튼 변경
function changeTop5VoteBtn(_this) {
    var completeBtn = _this
        .closest('.top_5_detail')
        .find('#btnVoteCompleteTop5');
    _this.prop('hidden', true);
    completeBtn.prop('hidden', false);
}

// 002. 카테고리 버튼 활성화
function activeCategoryBtn(_this) {
    $('#categoryList li').removeClass('active');
    _this.closest('li').addClass('active clicking');

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

// 004. 투표 등록 버튼 애니메이션
function onClickAddVoteBtn(_this) {
    _this.addClass('clicking');

    setTimeout(function () {
        _this.removeClass('clicking');
    }, 300);
}
