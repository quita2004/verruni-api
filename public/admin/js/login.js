$(() => {
    $('.btn-login').on('click', function () {
        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();

        login(username, password);
    });
});

function login(username, password) {
    $.ajax({
        url: '/admin/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username, password }),
        success: function (res) {
            window.location.href = '/admin';
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}
