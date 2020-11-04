import { HTTPClient } from '../../libraries/httpClient/httpClient';
import { AlertHelper } from '../../libraries/alert/alert';
import { Contact } from './contact';

Shimmer(true);
const id = document.querySelector('#contact-page-id') ? document.querySelector('#contact-page-id').value : null;
const pageMode = document.querySelector('#page-mode') ? document.querySelector('#page-mode').value : ADD_MODE;
const contact = new Contact(Contact.attribute.page);

const detailContent = document.querySelector('#layout-detail-content');
const operationalTab = {
    tab: document.querySelector('#contact-operational-tab'),
    content: document.querySelector('#contact-operational-content')
};
const transactionHistoryTab = {
    tab: document.querySelector('#contact-history-transaksi-tab'),
    content: document.querySelector('#contact-history-transaksi-content')
};
const submissionHistoryTab = {
    tab: document.querySelector('#contact-history-pengajuan-tab'),
    content: document.querySelector('#contact-history-pengajuan-content')
};
const kasKecilSubmissionTable = document.querySelector('#contact-table-kas-kecil-submission-history-detail');
const subKasKecilSubmissionTable = document.querySelector('#contact-table-sub-kas-kecil-submission-history-detail');

document.addEventListener('DOMContentLoaded', async (e) => {
    let isError = false;
    try {
        await init();
    } catch (error) {
        AlertHelper.Alert({
            title: 'Terjadi kesalahan',
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

    document.querySelector('#contact-page-save').addEventListener('click', async (e) => {
        try {
            const res = await save();
            if(res.success) {
                if(res.id && pageMode == ADD_MODE) {
                    AlertHelper.Alert({title: `${_title} berhasil disimpan`}).then(res => window.location.href = `${APP_URL}/${Contact.routeName}`);
                } else {
                    AlertHelper.Toastr({message: `${_title} berhasil disimpan`});
                    reloadPage();
                }
            } else {
                AlertHelper.Toastr({
                    message: 'Terdapat kesalahan, silahkan check kembali form',
                    type: AlertHelper.AlertType.Warning
                });
            }
        } catch (error) {
            console.error(error);
            AlertHelper.Alert({
                title: 'Terjadi kesalahan',
                message: error,
                type: AlertHelper.AlertType.Error
            });
        }
    });
});

async function init() {
    try {
        contact.renderAllProperty();

        await renderLookup();
        await renderDetail();
        handlingNewButtonDetails();
        handlingAfterSaveModals();

        if(pageMode == EDIT_MODE && id != undefined) {
            const data = await Contact.show({id: id});
            renderPage(data);
        }

        if(!_isContact) {
            contact.contact_type.show(false);

            if(_isKasBesar) {
                contact.saldo.show(false);
            }

            let tempContactType;
            if(_isKasBesar) {
                tempContactType = _contactType.KasBesar;
            } else if(_isKasKecil) {
                tempContactType = _contactType.KasKecil;
            } else {
                tempContactType = _contactType.SubKasKecil;
            }
            handlingDetailContent(tempContactType);
        } else {
            contact.saldo.show(false);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function renderPage(data) {
    contact.name.set(data.name);
    contact.birthplace.set(data.birthplace);
    contact.birthdate.set(data.birthdate);
    contact.address.set(data.address);
    contact.email.set(data.email);
    contact.phone_number.set(data.phone_number);
    contact.saldo.set(data.saldo);

    const contactTypeValue = data.contact_type ? {
        id: data.contact_type.id,
        name: data.contact_type.name
    } : null;
    const activeStatusValue = data.active_status ? {
        id: data.active_status.id,
        name: data.active_status.name
    } : null;
    contact.contact_type.set(contactTypeValue);
    contact.active_status.set(activeStatusValue);

    if(data.gender) {
        contact.gender.set(data.gender == _gender.male ? 0 : 1, true)
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
        
        if(_isContact) {
            contact.contact_type.plugin.onChange = (value) => {
                contact.contact_type.error(null);
                const isSaldoShow = [_contactType.SubKasKecil, _contactType.KasKecil].filter(item => {
                    if(value && value.id) {
                        return item == value.id;
                    }

                    return false;
                }).length > 0 ? true : false;

                contact.saldo.show(isSaldoShow);

                handlingDetailContent(value.id);
            };
        }

        contact.contact_type.plugin.init();
        contact.active_status.plugin.init();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function handlingAfterSaveModals() {

}

async function renderDetail() {

}

function handlingNewButtonDetails() {

}

async function reloadDetail({name = null, reloadAll = false}) {
    const listDetail = {
        
    };

    try {
        if(reloadAll) {
            const promiseList = [];
            for (var key in listDetail) {
                if (!listDetail.hasOwnProperty(key)) {
                    continue;
                }
            
                promiseList.push(listDetail[key].reload());
            }

            await Promise.all(promiseList);
        } else if(name != undefined) {
            listDetail[name].reload();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function reloadPage() {
    let isError = false;

    Shimmer(true);
    try {
        const data = await Contact.show({id: id});
        renderPage(data);
        await reloadDetail({reloadAll: true});
    } catch (error) {
        console.error(error);
    } finally {
        Shimmer(false);

        if(isError) {
            throw error;
        }
    }
}

async function save() {
    try {
        const conf = await AlertHelper.Confirm();
        if(!conf) {
            return;
        }

        if(_isKasBesar) {
            contact.contact_type.set(_contactType.KasBesar);
            contact.saldo.isSend = false;
        } else if(_isKasKecil) {
            contact.contact_type.set(_contactType.KasKecil);
        } else if(_isSubKasKecil) {
            contact.contact_type.set(_contactType.SubKasKecil);
        } else {
            const listContactTypeWithSaldo = [_contactType.SubKasKecil, _contactType.KasKecil];
            const isSaldoSend = listContactTypeWithSaldo.filter(item => {
                const contactType = contact.contact_type.get();
                return contactType && contactType.id == item;
            }).length > 0 ? true : false;
            contact.saldo.isSend = isSaldoSend;
        }

        if(pageMode == ADD_MODE) {
            return await contact.save();
        } else if(pageMode == EDIT_MODE) {
            return await contact.update({id: id});
        }   
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function handlingDetailContent(contactType) {
    const isShowDetailContent = [_contactType.SubKasKecil, _contactType.KasKecil].filter(item => {
        if(contactType) {
            return item == contactType;
        }

        return false;
    }).length > 0 ? true : false;
    
    if(isShowDetailContent) {
        detailContent.classList.remove('d-none');
        operationalTab.tab.classList.remove('d-none');
        operationalTab.content.classList.remove('d-none');

        transactionHistoryTab.tab.classList.remove('d-none');
        transactionHistoryTab.content.classList.remove('d-none');

        submissionHistoryTab.tab.classList.remove('d-none');
        submissionHistoryTab.content.classList.remove('d-none');

        if(contactType && contactType == _contactType.KasKecil) {
            kasKecilSubmissionTable.classList.remove('d-none');
            subKasKecilSubmissionTable.classList.toggle('d-none', true);
        } else if(contactType && contactType == _contactType.SubKasKecil) {
            kasKecilSubmissionTable.classList.toggle('d-none', true);
            subKasKecilSubmissionTable.classList.remove('d-none');
        }
    } else {
        detailContent.classList.toggle('d-none', true);
        operationalTab.tab.classList.toggle('d-none', true);
        operationalTab.content.classList.toggle('d-none', true);

        transactionHistoryTab.tab.classList.toggle('d-none', true);
        transactionHistoryTab.content.classList.toggle('d-none', true);

        submissionHistoryTab.tab.classList.toggle('d-none', true);
        submissionHistoryTab.content.classList.toggle('d-none', true);

        kasKecilSubmissionTable.classList.toggle('d-none', true);
        subKasKecilSubmissionTable.classList.toggle('d-none', true);
    }
}