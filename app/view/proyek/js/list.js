import * as _Layout from '../../_Layout/js/layout.js';
import * as _Proyek from './proyek.js';

const Proyek = new _Proyek.Proyek();
Proyek.list(_Layout.getCookieValue(QUERY_STRING_AUTH));

const ChannelPusher = PUSHER.subscribe('Proyek');
const dataTableSetup = Proyek.dataTable;
const ProyekTable = $('#proyek-table').DataTable(dataTableSetup);
const card = document.querySelector('.card');

_Layout.loadingCard(card);
document.addEventListener('DOMContentLoaded', async () => {
    const newButton = document.querySelector('#new');
    const excelButton = document.querySelector('#exportExcel');
    const refreshButton = document.querySelector('#refresh');

    ChannelPusher.bind('reload-datatable', data => {
        console.log('%c Response subscribe channel: ', 'color: green', data);
        
        if(data.UserId == USER_DATA.UserId) {
            refreshButton.disabled = true;
            ProyekTable.ajax.reload(response => {
                refreshButton.disabled = false;
            }, false);
        }
    });

    const accessList = await _Layout.getAccessRight('proyek'); 
    if(accessList.success && accessList.accessRight) {
        if(!accessList.accessRight.isCanInsert) {
            newButton.disabled = true;
            newButton.style.display = 'none';
        }

        // if(!accessList.accessRight.isCanExport) {
        //     excelButton.disabled = true;
        //     excelButton.style.display = 'none';
        // }
    }

    _Layout.loadingCard(card, false);

    newButton.addEventListener('click', () => {
        Proyek.new();
    });

    excelButton.addEventListener('click', () => {
        // $('#modalExport').modal('show');
    });
    
    refreshButton.addEventListener('click', () => {
        refreshButton.disabled = true;
        ProyekTable.ajax.reload(response => {
            refreshButton.disabled = false;
        }, false);
    });
});