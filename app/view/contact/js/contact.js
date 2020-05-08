import {toast, getCookieValue, loadingCard} from '../../_Layout/js/layout.js';
import * as _Datatable from '../../_Layout/js/datatable.js';

export class Contact {
    editMode = 'list';
    accessList = null;
    table = document.querySelector('#contact-table');
    tableTransactionHistory = document.querySelector('#transaction-history');
    dataTable = null;
    dataTableTransactionHistory = null;
    _contact_type = document.querySelector('#contact-type');
    id = document.querySelector('#id');
    name = document.querySelector('#name');
    birthdate = document.querySelector('#birthdate');
    gender = document.querySelector('#gender');
    address = document.querySelector('#address');
    email = document.querySelector('#email');
    phoneNumber = document.querySelector('#phoneNumber');
    image = document.querySelector('#image');
    active_status = document.querySelector('#active_status');
    modalCard = document.querySelector('#form-contact-modal .modal-content');

    constructor() {
        console.log('%c Contact constructor...', 'color: blue');
    }
    
    list(token) {
        const serverSideSetup = {
            ajax: {
                url: `${SITE_URL}contact/get/datatable`,
                type: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                },
                data: {
                    contact_type: this._contact_type.value
                }
            }
        };
        const columnDefsSetup = [
            {
                targets: this._contact_type.value != 'contact' && this._contact_type.value != 'kas-besar' ? [0, 8] : [0, 7],
                orderable: false
            }
        ];
        this.dataTable = _Datatable.getDefaultDatatable(serverSideSetup, null, columnDefsSetup, _Datatable.languageSetup.indonesia);
        this.dataTable.createdRow = (row, data) => {
            _Datatable.renderData(row, data);

            $('td:eq(0)', row).addClass('text-right');
            const status = $('td:eq(4)', row).text();
            const badge = status == 'Aktif' ? 'badge-success' : 'badge-danger';
            $('td:eq(4)', row).addClass('text-center').html(`<span class="badge ${badge}">${status}</span>`);
            
            if(this._contact_type.value != 'contact' && this._contact_type.value != 'kas-besar') {
                $('td:eq(5)', row).addClass('text-right');
            }

            const actionTd = (this._contact_type.value != 'contact' && this._contact_type.value != 'kas-besar') ? $('td:eq(8)', row)[0] : $('td:eq(7)', row)[0];
            if(actionTd.children.length > 0) {
                for (let i = 0; i < actionTd.children[0].children.length; i++) {
                    const button = actionTd.children[0].children[i];
                    const buttonValue = button.value;
                    const buttonType = button.classList;
                    button.addEventListener('click', () => {
                        if(buttonType.contains('btn-view')) {
                            this.view(buttonValue);
                        }
                        else if(buttonType.contains('btn-edit')) {
                            this.edit(buttonValue);
                        }
                        else if(buttonType.contains('btn-delete')) {
                            this.delete(buttonValue);
                        }
                    });
                }
            }
            
        };
    }

    listMutasi(token) {
        const serverSideSetup = {
            ajax: {
                url: `${SITE_URL}bank/get/datatable/mutasi/${this.id.value}`,
                type: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            }
        };
        const columnDefsSetup = [
            {
                targets: [0, 5],
                orderable: false
            }
        ];
        this.dataTableMutasi = _Datatable.getDefaultDatatable(serverSideSetup, null, columnDefsSetup, _Datatable.languageSetup.indonesia);
        this.dataTableMutasi.createdRow = (row, data) => {
            $('td:eq(0)', row).addClass('text-right');
            $('td:eq(2)', row).addClass('text-right');
            $('td:eq(3)', row).addClass('text-right');
            $('td:eq(4)', row).addClass('text-right');
        };
    }

    new() {
        this.reset();
        document.querySelector('#save').value = "add";

        $('#form-contact-modal').modal({backdrop: 'static'});
    }

    async save() {
        loadingCard(this.modalCard);

        let isHideModal = true;
        try {
            const action = document.querySelector('#save').value;
            const uriSave = action == 'add' ? `${SITE_URL}bank/save` : (action == 'edit' ? `${SITE_URL}bank/edit/${this.id.value}` : null);
            if(!uriSave) {
                throw "Action save is undifined";
            }

            const request = await fetch(uriSave, {
                method: action == 'add' ? 'POST' : 'UPDATE',
                headers: new Headers({
                    'Authorization': `Bearer ${getCookieValue(QUERY_STRING_AUTH)}`
                }),
                body: JSON.stringify({
                    id: this.id.value,
                    name: this.name.value,
                    saldo: isNaN(parseFloat(this.saldo.value)) ? 0 : parseFloat(this.saldo.value),
                    active_statusId: this.active_status.value,
                    created_by: USER_DATA.ContactId,
                    modified_by: USER_DATA.ContactId,
                    editMode: this.editMode
                })
            });
            const data = await request.json();
            console.log('%c Response save: ', 'color: green', data);

            if(!request.ok) {
                throw data.message;
            }

            toast((data.success ? 'success' : 'warning'), data.message);
            isHideModal = data.success;
        } 
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong: ${error}`,
            });
        }
        finally {
            loadingCard(this.modalCard, false);
            if(isHideModal) {
                $('#form-bank-modal').modal('hide');
            }
        }
    }

    view(id) {
        console.log('%c View Clicked...', 'color: blue', id);

        const url = this._contact_type.value == 'contact' ? `${SITE_URL}contact/view/${id}` : `${SITE_URL}contact/${this._contact_type.value}/view/${id}`;
        window.location.href = url;
    }

    async loadView(id) {
        console.log('%c Load View...', 'color: blue', id);

        try {
            const data = await this.getData(id);
            console.log('%c Response getData: ', 'color: green', data);

            document.querySelector('[name="label-name"]').textContent = data.name;
            document.querySelector('#label-name').textContent = data.name;
            document.querySelector('#label-saldo').textContent = data.saldo;
            document.querySelector('#label-active_status').textContent = data.active_status;
            document.querySelector('#label-created_on').textContent = data.created_on;
            document.querySelector('#label-created_by').textContent = data.created_by;
        } 
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong: ${error}`,
            });
        }
        finally {
            
        }
    }

    async edit(id) {
        console.log('%c Edit Clicked...', 'color: blue', id);
        
        this.reset();
        document.querySelector('#save').value = "edit";

        loadingCard(this.modalCard);
        try {
            const data = await this.getData(id);
            console.log('%c Response getData: ', 'color: green', data);

            $('#form-contact-modal').modal({backdrop: 'static'});
            this.loadEdit(data);
        } 
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong: ${error}`,
            });

            $('#form-contact-modal').modal('hide');
        }
        finally {
            loadingCard(this.modalCard, false);
        }
    }

    loadEdit(data) {
        this.id.value = data.id;
        this.name.value = data.id;
        this.birthdate = data.birthdate;
        this.address = data.address;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        $('#gender').val(data.genderId).trigger('change');
        $('#active_status').val(data.active_statusId).trigger('change');
    }

    getData(id) {
        return new Promise((resolve, reject) => {
            fetch(`${SITE_URL}contact/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${getCookieValue(QUERY_STRING_AUTH)}`
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    resolve(res.data[0])
                }

                reject(new Error(res.message));
            })
            .catch(error => reject(new Error(error)));
        });
    }

    delete(id) {
        console.log('%c Delete Clicked...', 'color: blue', id);

        let success = false;
        let isCancel = false;

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then(result => {
            if(!result.value) {
                isCancel = true;
                throw new Error('');
            }

            return fetch(`${SITE_URL}contact/delete/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${getCookieValue(QUERY_STRING_AUTH)}`
                })
            });
        })
        .then(res => res.json())
        .then(res => {
            if(!res.success) {
                throw new Error(res.message);
            }

            success = true;
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        })
        .catch(error => {
            if(!success && !isCancel) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Something went wrong: ${error}`,
                });
            }
        });
    }

    reset() {
        document.querySelector('#form-contact').reset();

        this.id.value = '';
        this.name.value = '';
        this.birthdate = '';
        this.address = '';
        this.email = '';
        this.phoneNumber = '';
        $('#gender').val(null).trigger('change');
        $('#active_status').val(null).trigger('change');
    }
}