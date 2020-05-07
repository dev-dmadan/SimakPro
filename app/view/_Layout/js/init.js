import * as _Layout from '../../_Layout/js/layout.js';

Pusher.logToConsole = true;
$.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) { 
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong: DataTable is error',
    });
};
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#user-info-name').textContent = USER_DATA ? USER_DATA.ContactName : '';
    _Layout.setSidebar();
});