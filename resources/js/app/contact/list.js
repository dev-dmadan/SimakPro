import { Contact } from "./contact";
import * as contactModal from "./modal";
import { DataTable } from "../../libraries/dataTable/dataTable";
import { AlertHelper } from "../../libraries/alert/alert";

Shimmer(true);
const mappingData = _isKasBesar ? [
    'name', 'email', 'phone_number', 'active_status'
] : (_isKasKecil || _isSubKasKecil ? [
    'name', 'email', 'phone_number', 'saldo', 'active_status'
] : [
    'name', 'email', 'phone_number', 'contact_type', 'active_status'
]);
const dataTable = new DataTable({
    element: '#contact-table',
    mappingData: mappingData,
    url: 'contacts/list',
    event: {
        onDoubleClick: (e, id) => {
            editRecord(id);
        }
    },
    action: {
        onEdit: (id) => {
            editRecord(id);
        },
        onDelete: async (id) => {
            return await Contact.delete({
                id: id,
                withConfirm: true
            });
        }
    },
    isAutoInit: false
});

document.addEventListener('DOMContentLoaded', async (e) => {
    let isError = false;
    try {
        await init();
    } catch (error) {
        Alert({
            title: 'Something wrong happen',
            message: error,
            type: AlertHelper.AlertType.Error
        });
        isError = true;
    } finally {
        Shimmer(false);
        if(isError) {
            return;
        }
    }
    
    document.querySelector('#contact-new-button').addEventListener('click', () => {
        contactModal.modal.showModal();
    });
    document.querySelector('#refresh-button').addEventListener('click', function() {
        const btn = this;
        btn.disabled = true;
        dataTable.reload().then(res => btn.disabled = false);
    });
});

async function init() {
    try {
        if(!_isContact) {
            let contactType;
            if(_isKasBesar) {
                contactType = _contactType.KasBesar;
            } else if(_isKasKecil) {
                contactType = _contactType.KasKecil;
            } else {
                contactType = _contactType.SubKasKecil;
            }

            dataTable.setDefaultFilter([
                {
                    column: 'contact_type_id',
                    value: contactType,
                    operator: 0
                }
            ]);
        }

        await dataTable.init();
        await renderModal();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function renderModal() {
    try {
        await Promise.all([
            contactModal.init()
        ]);

        contactModal.modal.afterSave = () => {
            dataTable.reload();
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function editRecord(id) {
    let uri;
    if(_isKasBesar) {
        uri = 'kas-besar';
    } else if(_isKasKecil) {
        uri = 'kas-kecil';
    } else if(_isSubKasKecil) {
        uri = 'sub-kas-kecil';
    } else {
        uri = 'contacts';
    }

    window.location.href = `${APP_URL}/${uri}/${id}/edit`;
}