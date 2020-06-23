import * as _Layout from '../../_Layout/js/layout.js';
import * as _Proyek from './proyek.js';

const Proyek = new _Proyek.Proyek();
const ChannelPusher = PUSHER.subscribe('Proyek');
const card = document.querySelector('.card');

_Layout.loadingCard(card);
document.addEventListener('DOMContentLoaded', async () => {
    const saveButton = document.querySelector('#save');
    const closeButton = document.querySelector('#close');

    $('#project_status').select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Status",
		allowClear: true
    });

    await _Layout.populateLookup([
        {
            selector: document.querySelector('#project_status'),
            lookupName: 'project-status'
        }
    ]);

    _Layout.loadingCard(card, false);

    saveButton.addEventListener('click', () => {
        // Proyek.save();
    });

    closeButton.addEventListener('click', () => {
        _Layout.goBack();
    });
});