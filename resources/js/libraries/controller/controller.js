import { HTTPClient } from '../httpClient/httpClient';
import { AlertHelper } from '../alert/alert';
import { Lookup } from '../lookup/lookup';
import Slider from 'bootstrap-slider';

export class Controller {
    _data = null;
    _property = null;
    _routeName;

    /**
     * constructor
     * @param {string} routeName 
     */
    constructor(routeName) {
        if (this.constructor === Controller) {
            throw new Error("Can't instantiate this class");
        }

        this._routeName = routeName;
    }

    /**
     * routeName
     * @returns {string}
     */
    get routeName() {
        return this._routeName;
    }

    /**
     * addProperty
     * @param {string} name 
     * @param {any} value 
     */
    addProperty(name, value) {
        if(this._data == undefined || this._data == null) {
            this._data = {};
        }
        
        this._data[name] = (typeof value == 'object' && value != undefined) ? 
            value.id : value;
    }

    static get PluginType() {
        return {
            Lookup: 'lookup',
            Currency: 'currency',
            Number: 'number',
            Slider: 'slider',
            Date: 'date',
            DateTime: 'datetime',
            RangeDate: 'range-date'
        };
    }

    getProperty(name) {
        return this._property != undefined ? this._property[name] : null;
    }

    getAllProperty() {
        return this._property;
    }

    /**
     * renderProperty
     * @param {object} attributes 
     * @returns {object} data
     */
    renderProperty(attributes) {
        const data = {};
        for (const key in attributes) {
            if (!attributes.hasOwnProperty(key)) {
                continue;
            }

            let element;
            if(typeof attributes[key] == 'string') {
                element = document.querySelector(attributes[key]);
                if(element != undefined) {
                    data[key] = element;
                }
            } else if(typeof attributes[key] == 'object' && 
                (attributes[key].hasOwnProperty('element') && attributes[key].hasOwnProperty('plugin'))) {
                data[key] = this._pluginProperty(attributes[key].element, attributes[key].plugin);
            } else {
                throw "Element is not defined";
            }
        }

        this._property = data;
    }

    /**
     * _pluginProperty
     * @param {string | HTMLElement} element 
     * @param {{
     *  type: string;
     *  options: object | any;
     * }} plugin 
     * @return {object} data
     */
    _pluginProperty(element, plugin) {
        let data;
        const options = plugin.options || {};
        switch (plugin.type) {
            case Controller.PluginType.Lookup:
                data = this._lookupPlugin(element, options);
                break;

            case Controller.PluginType.Currency:
                data = this._currencyPlugin(element, options);
                break;

            case Controller.PluginType.Number:
                data = this._numberPlugin(element, options);
                break;

            case Controller.PluginType.Slider:
                data = this._sliderPlugin(element, options);
                break;

            case Controller.PluginType.Date:
                data = this._datePlugin(element, options);
                break;

            // case Controller.PluginType.DateTime:
            //     data = this._lookupPlugin(element, options);
            //     break;

            // case Controller.PluginType.RangeDate:
            //     data = this._lookupPlugin(element, options);
            //     break;
        
            default:
                throw 'Plugin is not registred';
        }

        return data;
    }

    /**
     * _lookupPlugin
     * @param {string | HTMLElement} element 
     * @param {object} options 
     * @return {Lookup} data
     */
    _lookupPlugin(element, options) {
        if(options == undefined || Object.keys(options).length < 1) {
            throw "Options can't be empty";
        }

        if(!options.element) {
            options.element = element;
        }
        
        const _elem = new Lookup(options);
        return _elem;
    }

    /**
     * _datePlugin
     * @param {string | HTMLElement} element 
     * @param {object} options 
     * @return {Datepicker} data
     */
    _datePlugin(element, options = {}) {
        const _element = typeof element == 'string' ? 
            document.querySelector(element) : 
            (typeof element == 'object' && element && element.nodeType ? element : null);
        if(!_element) {
            throw "Element can't be empty";
        }
        
        const _options = options == undefined || Object.keys(options).length < 1 ? {
            autohide: true,
            clearBtn: true,
            buttonClass: 'btn',
            format: 'dd/mm/yyyy'
        } : options;
        const _elem = new Datepicker(_element, _options);

        return _elem;
    }

    /**
     * _numberPlugin
     * @param {string} element 
     * @param {object} options 
     * @return {Cleave} data
     */
    _numberPlugin(element, options = {}) {
        if(typeof element != 'string') {
            throw "Element must be string";
        }
        
        const _options = options == undefined || Object.keys(options).length < 1 ? {
            numeral: true,
            numeralDecimalMark: ',',
            delimiter: '.'
        } : options
        const _elem = new Cleave(element, _options);

        return _elem;
    }

    /**
     * _currencyPlugin
     * @param {string} element 
     * @param {object} options 
     * @return {Cleave} data
     */
    _currencyPlugin(element, options = {}) {
        if(typeof element != 'string') {
            throw "Element must be string";
        }

        const _options = options == undefined || Object.keys(options).length < 1 ? {
            numeral: true,
            prefix: 'Rp ',
            numeralDecimalMark: ',',
            delimiter: '.'
        } : options
        const _elem = new Cleave(element, _options);

        return _elem;
    }

    /**
     * _sliderPlugin
     * @param {HTMLElement} element 
     * @param {object} options 
     * @return {Slider} data
     */
    _sliderPlugin(element, options = {}) {
        if(typeof element != 'string') {
            throw "Element must be string";
        }

        const _elem = new Slider(element, options);
        return _elem;
    }

    /**
     * setAllProperty
     * @param {object} attributes 
     */
    setAllProperty(attributes) {
        try {
            for (const key in attributes) {
                if (!attributes.hasOwnProperty(key)) {
                    continue;
                }

                let element;
                if(typeof attributes[key] == 'string') {
                    element = document.querySelector(attributes[key]);
                    if(element != undefined) {
                        this[key] = this._getValueFromElement(element);
                    }
                } else if(typeof attributes[key] == 'object' && 
                    (attributes[key].hasOwnProperty('id') && attributes[key].hasOwnProperty('plugin'))) {
                    this[key] = this._getValueFromPlugin(attributes[key].element, attributes[key].plugin);
                } else {
                    throw 'Attribute value is invalid';
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    _getValueFromPlugin() {

    }

    _lookupValuePlugin() {

    }

    _dateValuePlugin() {

    }

    _numberValuePlugin() {

    }

    _currencyValuePlugin() {

    }

    _sliderValuePlugin() {
        
    }

    /**
     * _getValueFromElement
     * @param {HTMLElement} element 
     * @return {string | number | object} value
     */
    _getValueFromElement(element) {
        let value;
        const elementType = element.nodeName;
        switch (elementType) {
            case 'SELECT':
                value = this._getValueSelectElement(element);
                break;
            case 'TEXTAREA':
                value = this._getValuTextAreaElement(element);
                break;
            case 'INPUT':
            default:
                value = this._getValueInputElement(element);
                break;
        }

        return value;
    }

    /**
     * _getValueInputElement
     * @param {HTMLElement} element
     * @return {string | number | object} value
     */
    _getValueInputElement(element) {
        let value;
        const inputType = element.type;
        switch (inputType) {
            case 'radio':

                break;
            case 'checkbox':
                
                break;
            case 'text':
            case 'number':
            default:
                value = element.value;
                break;
        }

        return value;
    }

    /**
     * _getValueSelectElement
     * @param {HTMLElement} element 
     * @return {object} value
     */
    _getValueSelectElement(element) {
        let value;
        value = element.value == null || element.value.trim() == '' ? 
            null : {
                id: value.value,
                name: value.selectedOptions[0].text
            };

        return value;
    }

    /**
     * _getValuTextAreaElement
     * @param {HTMLElement} element 
     * @return {string} value
     */
    _getValuTextAreaElement(element) {
        return element.value;
    }

    /**
     * getCSRF
     * @return {string} CSRF
     */
    static getCSRF() {
        return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }

    /**
     * save
     * @param {{
     *  uri: string;
     *  method: string;
     *  headers: object;
     *  body: object;
     * }} options 
     * @return {promise} result
     */
    async save({
        uri = null, 
        method = null, 
        headers = null, 
        body = null
    } = {}) {
        const _uri = uri || `${APP_URL}/${this.routeName}`;
        const _method = method || HTTPClient.POST;
        const _headers = headers || {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": Controller.getCSRF()
        };
        const _body = this._data;
        try {
            if(body != undefined && typeof body == 'object') {
                Object.keys(body).forEach(key => {
                    _body[key] = body[key];
                });
            }
            return await HTTPClient.Request({
                uri: _uri,
                method: _method,
                headers: _headers,
                body: _body
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * update
     * @param {{
     *  id: string;
     *  uri: string;
     *  method: string;
     *  headers: object;
     *  body: object;
     * }} options 
     * @return {promise} result
     */
    async update({
        id,
        uri = null, 
        method = null, 
        headers = null, 
        body = null
    }) {
        const _method = method || HTTPClient.PUT;
        const _headers = headers || {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": Controller.getCSRF()
        };
        const _body = this._data;
        try {
            if(id == undefined || id.trim() == '') {
                throw `Id must required and can't be empty`;
            }

            const _uri = uri || `${APP_URL}/${this.routeName}/${id}`;
            if(body != undefined && typeof body == 'object') {
                Object.keys(body).forEach(key => {
                    _body[key] = body[key];
                });
            }
            return await HTTPClient.Request({
                uri: _uri,
                method: _method,
                headers: _headers,
                body: _body
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * delete
     * @param {{
     *  id: string;
     *  method: string;
     *  headers: object;
     *  body: object;
     *  withConfirm: {
     *      confirmMessage: string;
     *      afterMessage: string;  
     *  } | boolean
     * }} options 
     * @return {promise} result
     */
    static async delete({
        id,
        uri = null,
        method = null,
        headers = null, 
        body = null,
        withConfirm = null
    }) {
        const _method = method || HTTPClient.DELETE;
        const _headers = headers || {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": Controller.getCSRF()
        };
        const _body = body || {};

        let isSuccess = false;
        const isWithConfirmBoolean = typeof withConfirm == 'boolean' ? true : false;
        const isWithConfirmObject = withConfirm != undefined && typeof withConfirm == 'object' && 
            (withConfirm.hasOwnProperty('afterMessage') || withConfirm.hasOwnProperty('confirmMessage')) ? true : false;
        const isWithConfirmValid = isWithConfirmBoolean || isWithConfirmObject ? true : false;

        try {
            if(id == undefined || id.trim() == '') {
                throw `Id must required and can't be empty`;
            }

            const _uri = uri || `${APP_URL}/${this.routeName}/${id}`;
            if(withConfirm == null || withConfirm == false) {
                return await HTTPClient.Request({
                    uri: _uri,
                    method: _method,
                    headers: _headers,
                    body: _body
                });
            }

            if(!isWithConfirmValid) {
                throw 'With Confirm is Not Valid';
            }

            let afterDeleteMessage = isWithConfirmBoolean ? 'Delete is successfully' : (
                isWithConfirmObject ? withConfirm.afterMessage : 'Delete is successfully'
            );
            const confirm_ = isWithConfirmObject && withConfirm.confirmMessage ? 
                await AlertHelper.Confirm({title: withConfirm.confirmMessage}) : 
                await AlertHelper.Confirm();
            if(!confirm_) {
                return false;
            }

            const deleteRecord = await HTTPClient.Request({
                uri: _uri,
                method: _method,
                headers: _headers,
                body: _body
            });
            if(deleteRecord) {
                AlertHelper.Alert({message: afterDeleteMessage});
                isSuccess = true;
            }
        } catch (error) {
            console.error(error);
            if(withConfirm != undefined) {
                AlertHelper.Alert({
                    title: 'Something wrong happen',
                    message: error,
                    type: AlertHelper.AlertType.Error
                }); 
            }

            throw error;
        }

        if(isWithConfirmValid) {
            return isSuccess;
        }
    }

    /**
     * show
     * @param {{
     *  id: string;
     *  uri: string;
     *  method: string;
     *  headers: object;
     *  body: object;
     * }} options 
     * @return {promise} result
     */
    static async show({
        id,
        uri = null,
        method = null,
        headers = null, 
        body = null
    }) {
        const _method = method || HTTPClient.GET;
        const _headers = headers || {"Content-Type": "application/json"};
        const _body = body || {};
        try {
            if(id == undefined || id.trim() == '') {
                throw `Id must required and can't be empty`;
            }

            const _uri = uri || `${APP_URL}/${this.routeName}/${id}`;
            return await HTTPClient.Request({
                uri: _uri,
                method: _method,
                headers: _headers,
                body: _body
            });
        } catch (error) {
            throw error;
        }
    }
}