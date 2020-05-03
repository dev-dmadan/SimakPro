import * as _Layout from '../../_Layout/js/layout.js';
import * as _Bank from './bank.js';

const Bank = new _Bank.Bank();
Bank.list(_Layout.getCookieValue(QUERY_STRING_AUTH));

const ChannelPusher = PUSHER.subscribe('Bank');
const dataTableSetup = Bank.dataTable;
const BankTable = $('#bank-table').DataTable(dataTableSetup);
const card = document.querySelector('.card');

_Layout.loadingCard(card);
document.addEventListener('DOMContentLoaded', async () => {
    const newButton = document.querySelector('#new');
    const excelButton = document.querySelector('#exportExcel');
    const refreshButton = document.querySelector('#refresh');
    const saveButton = document.querySelector('#save');

    $('.select2bs4').select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Status",
		allowClear: true
    });

    ChannelPusher.bind('reload-datatable', data => {
        console.log('%c Response subscribe channel: ', 'color: green', data);
        
        refreshButton.disabled = true;
        BankTable.ajax.reload(response => {
            refreshButton.disabled = false;
        }, false);
    });

    const accessList = await _Layout.getAccessRight('bank'); 
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

    await _Layout.populateLookup([
        {
            selector: document.querySelector('#active_status'),
            lookupName: 'active-status'
        }
    ]);

    _Layout.loadingCard(card, false);

    newButton.addEventListener('click', () => {
        Bank.new();
    });

    saveButton.addEventListener('click', async () => {
        await Bank.save();
    });

    excelButton.addEventListener('click', () => {
        // $('#modalExport').modal('show');
    });
    
    refreshButton.addEventListener('click', () => {
        refreshButton.disabled = true;
        BankTable.ajax.reload(response => {
            refreshButton.disabled = false;
        }, false);
    });
});