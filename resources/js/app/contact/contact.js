import { Controller } from "../../libraries/controller/controller";
export class Contact extends Controller {
    _name;
    _birthplace;
    _birthdate;
    _gender;
    _address;
    _email;
    _phone_number;
    _contact_type;
    _active_status;
    _saldo;

    static get routeName() {
        return 'contacts';
    }

    constructor(attributes = null) {
        super(Contact.routeName, attributes);
    }

    static get attribute() {
        return {
            page: {
                name: '#contact-page-name',
                birthplace: '#contact-page-birthplace',
                birthdate: {
                    element: '#contact-page-birthdate',
                    plugin: {
                        type: Controller.PluginType.Date
                    }
                },
                gender: {
                    element: 'contact-page-gender',
                    choice: true,
                    isLookup: true
                },
                address: '#contact-page-address',
                email: '#contact-page-email',
                phone_number: {
                    element: '#contact-page-phone_number',
                    plugin: {
                        type: Controller.PluginType.Phone
                    }
                },
                contact_type: {
                    element: '#contact-page-contact_type',
                    plugin: {
                        type: Controller.PluginType.Lookup,
                        options: {
                            placeholder: 'Pilih Jenis Kontak',
                            isAutoInit: false
                        }
                    }
                },
                active_status: {
                    element: '#contact-page-active_status',
                    plugin: {
                        type: Controller.PluginType.Lookup,
                        options: {
                            placeholder: 'Pilih Jenis Kontak',
                            isAutoInit: false
                        }
                    }
                },
                saldo: {
                    element: '#contact-page-saldo',
                    plugin: {
                        type: Controller.PluginType.Currency
                    }
                }
            },
            modal: {
                name: '#contact-modal-name',
                birthplace: '#contact-modal-birthplace',
                birthdate: {
                    element: '#contact-modal-birthdate',
                    plugin: {
                        type: Controller.PluginType.Date
                    }
                },
                gender: {
                    element: 'contact-modal-gender',
                    choice: true,
                    isLookup: true
                },
                address: '#contact-modal-address',
                email: '#contact-modal-email',
                phone_number: {
                    element: '#contact-modal-phone_number',
                    plugin: {
                        type: Controller.PluginType.Phone
                    }
                },
                contact_type: {
                    element: '#contact-modal-contact_type',
                    plugin: {
                        type: Controller.PluginType.Lookup,
                        options: {
                            // dropdownParent: '#contact-modal',
                            placeholder: 'Pilih Jenis Kontak',
                            isAutoInit: false
                        }
                    }
                },
                active_status: {
                    element: '#contact-modal-active_status',
                    plugin: {
                        type: Controller.PluginType.Lookup,
                        options: {
                            // dropdownParent: '#contact-modal',
                            placeholder: 'Pilih Jenis Kontak',
                            isAutoInit: false
                        }
                    }
                },
                saldo: {
                    element: '#contact-modal-saldo',
                    plugin: {
                        type: Controller.PluginType.Currency
                    }
                }
            }
        };
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get name() {
        return this._name;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get birthplace() {
        return this._birthplace;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Datepicker
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get birthdate() {
        return this._birthdate;
    }

    /**
     * Gender - radio button choice
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(index: number, value: boolean): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get gender() {
        return this._gender;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get address() {
        return this._address;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get email() {
        return this._email;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get phone_number() {
        return this._phone_number;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Lookup;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get contact_type() {
        return this._contact_type;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Lookup;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get active_status() {
        return this._active_status;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): string;
     *  set(value: string): void;
     *  error(value: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get saldo() {
        return this._saldo;
    }

}