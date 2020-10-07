import { Controller } from "../../libraries/controller/controller";
export class Project extends Controller {
    _name;
    _birthplace;
    _birthdate;
    _gender;
    _address;
    _email;
    _phone_number;
    _image;
    _contact_type;
    _active_status;
    _saldo;
    // _created_by;
    // _updated_by;

    static get routeName() {
        return 'contacts';
    }

    constructor({
        name,
        birthplace,
        birthdate,
        gender,
        address,
        email,
        phone_number,
        contact_type,
        active_status,
        saldo
    } = {}) {
        super('contacts');

        if(arguments[0] != undefined && arguments.length > 0 && typeof arguments[0] == 'object') {
            this.name = name;
            this.birthplace = birthplace;
            this.birthdate = birthdate;
            this.gender = gender;
            this.address = address;
            this.email = email;
            this.phone_number = phone_number;
            this.contact_type = contact_type;
            this.active_status = active_status;
            this.saldo = saldo;
        }
    }

    static get attribute() {
        return {
            page: {
                name: '#contact-page-name',
                birthplace: '#contact-page-birthplace',
                birthdate: '#contact-page-birthdate',
                gender: '#contact-page-gender',
                address: '#contact-page-address',
                email: '#contact-page-email',
                phone_number: '#contact-page-phone_number',
                image: '#contact-page-image',
                contact_type: '#contact-page-contact_type',
                active_status: '#contact-page-active_status',
                saldo: '#contact-page-saldo'
            },
            modal: {
                name: '#contact-modal-name',
                birthplace: '#contact-modal-birthplace',
                birthdate: '#contact-modal-birthdate',
                gender: '#contact-modal-gender',
                address: '#contact-modal-address',
                email: '#contact-modal-email',
                phone_number: '#contact-modal-phone_number',
                contact_type: '#contact-modal-contact_type',
                active_status: '#contact-modal-active_status',
                saldo: '#contact-modal-saldo'
            }
        };
    }

    get name() {
        return this._name;
    }
    set name(value) {
        const _value = value != undefined ? value.trim() : null;
        this.addProperty('name', _value);
        this._name = _value;
    }

    get code() {
        return this._code;
    }
    set code(value) {
        const _value = value != undefined ? value.trim() : null;
        this.addProperty('code', _value);
        this._code = _value;
    }

    get owner() {
        return this._owner;
    }
    set owner(value) {
        const _value = value != undefined ? value.trim() : null;
        this.addProperty('owner', _value);
        this._owner = _value;
    }

    get date() {
        return this._date;
    }
    set date(value) {
        const _value = value != undefined ? value.trim() : null;
        this.addProperty('date', _value);
        this._date = _value;
    }

    get city() {
        return this._city;
    }
    set city(value) {
        const _value = value != undefined ? value.trim() : null;
        this.addProperty('city', _value);
        this._city = _value;
    }

    get address() {
        return this._address;
    }
    set address(value) {
        const _value = value != undefined ? value.trim() : null;
        this.addProperty('address', _value);
        this._address = _value;
    }

    get luas_area() {
        return this._luas_area;
    }
    set luas_area(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;
        this.addProperty('luas_area', _value);
        this._luas_area = _value;
    }

    get estimasi() {
        return this._estimasi;
    }
    set estimasi(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseInt(value.trim()) : 0;
        this.addProperty('estimasi', _value);
        this._estimasi = _value;
    }

    get sub_total() {
        return this._sub_total;
    }
    set sub_total(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;
        this.addProperty('sub_total', _value);
        this._sub_total = _value;
    }

    get cco() {
        return this._cco;
    }
    set cco(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;
        this.addProperty('cco', _value);
        this._cco = _value;
    }

    get total() {
        return this._total;
    }
    set total(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;
        this.addProperty('total', _value);
        this._total = _value;
    }

    get dp() {
        return this._dp;
    }
    set dp(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;
        this.addProperty('dp', _value);
        this._dp = _value;
    }

    get sisa() {
        return this._sisa;
    }
    set sisa(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;
        this.addProperty('sisa', _value);
        this._sisa = _value;
    }

    get progress() {
        return this._progress;
    }
    set progress(value) {
        const _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseInt(value.trim()) : 0;
        this.addProperty('progress', _value);
        this._progress = _value;
    }

    get project_status() {
        return this._project_status
    }
    set project_status(value) {
        const _value = value != undefined && typeof value == 'object' ? {
            id: value.id.trim(),
            name: value.name.trim()
        } : (value != undefined && typeof value == 'string' ? value.trim() : null);
        this.addProperty('project_status_id', _value);
        this._project_status = _value;
    }
}