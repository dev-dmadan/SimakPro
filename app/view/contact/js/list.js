import * as _Layout from '../../_Layout/js/layout.js';
import * as _Contact from './contact.js';

const Contact = new _Contact.Contact();
Contact.list(_Layout.getCookieValue(QUERY_STRING_AUTH));

const ChannelPusher = PUSHER.subscribe('Contact');
const dataTableSetup = Contact.dataTable;
const ContactTable = $('#contact-table').DataTable(dataTableSetup);
const card = document.querySelector('.card');

_Layout.loadingCard(card);
document.addEventListener('DOMContentLoaded', async () => {
    const newButton = document.querySelector('#new');
    const excelButton = document.querySelector('#exportExcel');
    const refreshButton = document.querySelector('#refresh');
    const saveButton = document.querySelector('#save');

    $('#gender').select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Jenis Kelamin",
		allowClear: true
    });

    $('#active_status').select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Status",
		allowClear: true
    });

    $('#contact_type').select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Jenis Kontak",
		allowClear: true
    });

    $('#birthdate').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        "autoUpdateInput": true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10)
    });

    bsCustomFileInput.init();

    ChannelPusher.bind('reload-datatable', data => {
        console.log('%c Response subscribe channel: ', 'color: green', data);
        
        refreshButton.disabled = true;
        ContactTable.ajax.reload(response => {
            refreshButton.disabled = false;
        }, false);
    });

    const accessList = await _Layout.getAccessRight('contact'); 
    if(accessList.success && accessList.accessRight) {
        if(!accessList.accessRight[Contact._contact_type.value].isCanInsert) {
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
        },
        {
            selector: document.querySelector('#gender'),
            lookupName: 'gender'
        },
        {
            selector: document.querySelector('#contact_type'),
            lookupName: 'contact-type'
        },
    ]);

    _Layout.loadingCard(card, false);

    newButton.addEventListener('click', () => {
        Contact.new();
    });

    saveButton.addEventListener('click', () => {
        Contact.save();
    });

    excelButton.addEventListener('click', () => {
        // $('#modalExport').modal('show');
    });
    
    refreshButton.addEventListener('click', () => {
        refreshButton.disabled = true;
        ContactTable.ajax.reload(response => {
            refreshButton.disabled = false;
        }, false);
    });
});