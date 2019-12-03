function WireMenuButtons() {
    document.querySelector('#btnEdit').onclick = function () { SetScMode('edit'); };
    document.querySelector('#btnPrev').onclick = function () { SetScMode('preview'); };
    document.querySelector('#btnNorm').onclick = function () { SetScMode('normal'); };
    document.querySelector('#btnAdminB').onclick = function () { AdminB(window.opener.document); };
    document.querySelector('#btnDesktop').onclick = function () { Desktop(window.opener); };
}