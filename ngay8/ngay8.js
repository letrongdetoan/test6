var dsThiLai = new Array();
var btnBienHinh = document.getElementById('btnBienHinh');
btnBienHinh.onclick = function () {
    var txtFullname = document.forms['thi-lai-form']['full-name'];
    if (txtFullname) {
        var fullName = txtFullname.value;
        dsThiLai.push(fullName);

        var contentDiv = document.getElementById('content');
        if (contentDiv) {
            var contentOfDiv = '<ul>';
            for (var i = 0; i < dsThiLai.length; i++) {
                var element = dsThiLai[i];
                contentOfDiv += `<li>${element}</li>`;
            }
            contentOfDiv += '</ul>';
            contentDiv.innerHTML = contentOfDiv;
        }
    }
}