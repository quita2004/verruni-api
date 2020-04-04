$(() => {
    $('.q-button-edit-info').on('click', function () {
        const name = $(this).data('name');
        const data = $('#' + name).val();
        const dataUpdate = {};
        dataUpdate[name] = data;
        updateInfo(dataUpdate);
    });
});

function onSucces(res) {
    toastr.success(res.message);
};
function onError(res) {
    toastr.error("Đã xảy ra lỗi");
};
function updateInfo(data) {
    $.ajax({
        url: '/api/information/update',
        method: 'POST',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: onSucces,
        error: onError
    });
}