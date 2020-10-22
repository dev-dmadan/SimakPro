import { Contact } from "./contact";
import { Modal } from "../../libraries/modal/modal";
import { AlertHelper } from "../../libraries/alert/alert";
import { HTTPClient } from "../../libraries/httpClient/httpClient";

const contact = new Contact(Contact.attribute.modal);
const modal = new Modal({
    modal: '#contact-modal',
    save: {
        element: '#contact-modal-save',
        onSave: async () => {
            return await saveModal();
        }
    },
    close: () => {
        contact.contact_type.set(null);
        contact.active_status.set(null);
    }
});

async function init() {
    try {
        contact.renderAllProperty();
        await renderLookup();
    } catch (error) {
        throw error;
    }
}

async function renderLookup() {
    try {
        const contactType = HTTPClient.Request({
            uri: `${APP_URL}/lookups/contact-type`,
            method: HTTPClient.Method.Get
        });
        const activeStatus = HTTPClient.Request({
            uri: `${APP_URL}/lookups/active-status`,
            method: HTTPClient.Method.Get
        });
    
        const lookupData = await Promise.all([
            contactType, activeStatus
        ]);
    
        contact.contact_type.plugin.sourceData = {
            static: lookupData[0].map(item => {
                return {
                    id: item.id,
                    text: item.name
                }
            })
        };
        contact.active_status.plugin.sourceData = {
            static: lookupData[1].map(item => {
                return {
                    id: item.id,
                    text: item.name
                }
            })
        };
    
        contact.contact_type.plugin.init();
        contact.active_status.plugin.init();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function saveModal() {
    let isSuccess = false;

    const confirm_ = await Confirm();
    if(!confirm_) {
        return false;
    }

    try {
        // modal.loading(true);

        const save = await contact.save();
        if(save && save.success) {
            isSuccess = true;
            Toastr({message: 'Kontak berhasil disimpan'});
        }
    } catch (error) {
        console.error(error);
        Alert({
            title: 'Terjadi kesalahan',
            message: error,
            type: AlertHelper.AlertType.Error
        });
    } finally {
        // modal.loading(false);
    }

    return isSuccess;
}

export {modal, init};