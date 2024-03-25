function togglePwd(e, t) {
    ;(e = document.getElementById(e)), (t = document.getElementById(t))
    'password' === e.type
        ? ((e.type = 'text'), (t.innerHTML = '<i class="fa fa-eye-slash"></i>'))
        : ((e.type = 'password'), (t.innerHTML = '<i class="fa fa-eye"></i>'))
}
// function checkLogin() {
//     var e = $('form[name=frmLogin]').serialize()
//     return (
//         $.ajax({
//             url: root + 'home/log',
//             data: e + '&action=Login',
//             type: 'POST',
//             cache: !1,
//             dataType: 'json',
//             beforeSend: function () {
//                 $('body').prepend('<div class="screen" style="z-index:1000"></div>')
//             },
//             success: function (e) {
//                 1 == e.status && (location.href = root + e.link),
//                     0 == e.status && (alert(e.str), $('.screen').remove(), $('#txtEmail').focus()),
//                     2 == e.status && (alert(e.str), location.reload())
//             },
//         }),
//         !1
//     )
// }
// function checkLogin2(e) {
//     return '' == e.txtEmail.value
//         ? (alert('Vui lòng nhập số điện thoại'), e.txtEmail.focus(), !1)
//         : '' != e.txtPassword.value || (alert('Vui lòng nhập mật khẩu'), e.txtPassword.focus(), !1)
// }
function startTime() {
    var e = new Date(),
        t = e.getHours(),
        n = e.getMinutes(),
        o = e.getSeconds(),
        a = e.getDate(),
        s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][e.getMonth()],
        e = e.getFullYear(),
        n = checkTime(n),
        o = checkTime(o)
    ;(document.getElementById('show_clock').innerHTML =
        'Hôm nay: ' +
        a +
        '-' +
        s +
        '-' +
        e +
        " <i class='fa fa-clock-o fa-spin'></i> <span style='color:yellow'>" +
        t +
        ':' +
        n +
        ':' +
        o +
        '</span>'),
        setTimeout(startTime, 1e3)
}
function checkTime(e) {
    return e < 10 && (e = '0' + e), e
}
