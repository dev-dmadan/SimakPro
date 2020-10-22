import { Controller } from "../../libraries/controller/controller";
export class Project extends Controller {
    _name;
    _code;
    _owner;
    _date;
    _city;
    _address;
    _luas_area;
    _estimasi;
    _sub_total;
    _cco;
    _total;
    _dp;
    _sisa;
    _progress;
    _project_status;

    static get routeName() {
        return 'projects';
    }

    /**
     * constructor
     * @param {object} attributes 
     */
    constructor(attributes = null) {
        super(Project.routeName, attributes);
    }

    static get attribute() {
        return {
            page: {
                name: '#project-page-name',
                code: '#project-page-code',
                owner: '#project-page-owner',
                date: {
                    element: '#project-page-date',
                    plugin: {
                        type: Controller.PluginType.Date
                    }
                },
                city: '#project-page-city',
                address: '#project-page-address',
                luas_area: {
                    element: '#project-page-luas_area',
                    plugin: {
                        type: Controller.PluginType.Number
                    }
                },
                estimasi: {
                    element: '#project-page-estimasi',
                    plugin: {
                        type: Controller.PluginType.Number
                    }
                },
                sub_total: {
                    element: '#project-page-sub_total',
                    plugin: {
                        type: Controller.PluginType.Currency
                    }
                },
                cco: {
                    element: '#project-page-cco',
                    plugin: {
                        type: Controller.PluginType.Currency
                    }
                },
                total: {
                    element: '#project-page-total',
                    plugin: {
                        type: Controller.PluginType.Currency
                    }
                },
                dp: {
                    element: '#project-page-dp',
                    plugin: {
                        type: Controller.PluginType.Currency
                    }
                },
                sisa: {
                    element: '#project-page-sisa',
                    plugin: {
                        type: Controller.PluginType.Currency
                    }
                },
                progress: {
                    element: '#project-page-progress',
                    plugin: {
                        type: Controller.PluginType.Slider
                    }
                },
                project_status: {
                    element: '#project-page-project_status',
                    plugin: {
                        type: Controller.PluginType.Lookup,
                        options: {
                            placeholder: 'Pilih Status',
                            isAutoInit: false
                        }
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
     *  error(error: string | null): void;
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
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get code() {
        return this._code;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get owner() {
        return this._owner;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Datepicker;
     *  get(): string;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get date() {
        return this._date;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get city() {
        return this._city;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  get(): string;
     *  set(value): void;
     *  error(error: string | null): void;
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
     *  plugin: Cleave;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get luas_area() {
        return this._luas_area;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get estimasi() {
        return this._estimasi;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get sub_total() {
        return this._sub_total;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get cco() {
        return this._cco;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get total() {
        return this._total;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get dp() {
        return this._dp;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get sisa() {
        return this._sisa;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Slider;
     *  get(): number;
     *  set(value): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get progress() {
        return this._progress;
    }

    /**
     * @return {{
     *  element: HTMLElement;
     *  plugin: Cleave;
     *  get(): {
     *      id: string;
     *      name: string;
     *  };
     *  set(value: {
     *      id: string;
     *      name: string;
     *  } | string): void;
     *  error(error: string | null): void;
     *  show(isShow: boolean): void;
     *  enable(isEnable: boolean): void;
     *  isSend: boolean;
     * }} value
     */
    get project_status() {
        return this._project_status
    }
}