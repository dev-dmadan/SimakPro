import * as _Layout from '../../_Layout/js/layout.js';
import * as _Bank from './bank.js';

const Bank = new _Bank.Bank();
Bank.listMutasi(_Layout.getCookieValue(QUERY_STRING_AUTH));
Bank.editMode = 'view';

const ChannelPusher = PUSHER.subscribe('Bank');
const dataTableSetup = Bank.dataTableMutasi;
const MutasiBankTable = $('#mutasi-bank-table').DataTable(dataTableSetup);
const card = document.querySelector('.card');

_Layout.loadingCard(card);
document.addEventListener('DOMContentLoaded', async () => {
    const editButton = document.querySelector('#edit');
    const closeButton = document.querySelector('#close');
    const excelButton = document.querySelector('#exportExcel');
    const refreshButton = document.querySelector('#refresh');
    const saveButton = document.querySelector('#save');

    $('.select2bs4').select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Status",
		allowClear: true
    });

    ChannelPusher.bind('reload-view', data => {
        console.log('%c Response subscribe channel: ', 'color: green', data);
        
        refreshButton.disabled = true;
        MutasiBankTable.ajax.reload(response => {
            refreshButton.disabled = false;
        }, false);
        Bank.loadView(Bank.id.value);
    });

    Bank.loadView(Bank.id.value);
    const accessList = await _Layout.getAccessRight('bank'); 
    if(accessList.success && accessList.accessRight) {
        if(!accessList.accessRight.isCanUpdate) {
            editButton.disabled = true;
            editButton.style.display = 'none';
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

    editButton.addEventListener('click', () => {
        Bank.edit(Bank.id.value);
    });

    closeButton.addEventListener('click', () => {
        _Layout.goBack();
    });

    saveButton.addEventListener('click', () => {
        Bank.save();
    });

    excelButton.addEventListener('click', () => {
        // $('#modalExport').modal('show');
    });
    
    refreshButton.addEventListener('click', () => {
        refreshButton.disabled = true;
        MutasiBankTable.ajax.reload(response => {
            refreshButton.disabled = false;
        }, false);
        Bank.loadView(Bank.id.value);
    });
});