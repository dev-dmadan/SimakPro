import { HTTPClient } from '../httpClient/httpClient';
import { AlertHelper } from '../alert/alert';
import { Lookup } from '../lookup/lookup';
import { Validation } from "../validation/validation";
import Slider from 'bootstrap-slider';
import Cleave from 'cleave.js';
import moment from 'moment';
require('cleave.js/dist/addons/cleave-phone.id');

export class Controller {
    _data = null;
    _attributes;
    _routeName;

    /**
     * constructor
     * @param {string} routeName 
     * @param {object} attributes
     */
    constructor(routeName, attributes) {
        if (this.constructor === Controller) {
            throw new Error("Can't instantiate this class");
        }

        this._routeName = routeName;
        if(attributes != undefined) {
            this.setAttributes(attributes);
        }
    }

    /**
     * routeName
     * @returns {string}
     */
    get routeName() {
        return this._routeName;
    }

    static get PluginType() {
        return {
            Lookup: 'lookup',
            Currency: 'currency',
            Number: 'number',
            Phone: 'phone',
            Slider: 'slider',
            Date: 'date',
            DateTime: 'datetime',
            RangeDate: 'range-date'
        };
    }

    /**
     * setAttributes
     * @param {object} attributes 
     */
    setAttributes(attributes) {
        if(typeof attributes == 'object' && Object.keys(attributes).length < 1) {
            throw new Error("Attributes must be object and can't be empty");
        }

        this._attributes = attributes;
    }

    /**
     * addProperty
     * @param {string} name 
     * @param {any} value 
     */
    addProperty(name, value, isForceLookup = false) {
        if(this._data == undefined || this._data == null) {
            this._data = {};
        }

        const isAttribute = this._attributes && this._attributes[name] ? true : false;
        const isAttributeLookup = isAttribute && this._attributes[name].plugin && this._attributes[name].plugin.type == Controller.PluginType.Lookup;
        const isLookup = isAttributeLookup || Validation.isLookup(value) ? true : false;
        const setterName = isLookup || isForceLookup ? `${name}_id` : name;
        const _value = isLookup ? (value && value.id ? value.id : value) : value;

        this._data[setterName] = _value;
    }

    /**
     * getProperty
     * @param {string} name attribute name
     * @return {{
     *  element: any;
     *  get(): any;
     *  set(value: any): void
     * }} property
     */
    getProperty(name) {
        const property = this[`_${name}`];
        
        return property != undefined ? property : null;
    }

    /**
     * getAllProperty
     * @param {boolean} isSend
     * @return {object} data
     */
    getAllProperty(isSend = true) {
        const data = {};
        for (const key in this._attributes) {
            if (!this._attributes.hasOwnProperty(key)) {
                continue;
            }

            const temp = this.getProperty(key);
            if(isSend) {
                if(temp.isSend) {
                    data[key] = temp;
                } 
            } else {
                data[key] = temp;
            }
        }

        return data;
    }

    /**
     * setAllProperty
     * Set all property registred in attribute with isSend true
     */
    setAllProperty() {
        try {
            // this._data = null;
            for (const key in this._attributes) {
                if (!this._attributes.hasOwnProperty(key)) {
                    continue;
                }

                const temp = this.getProperty(key);
                if(temp.isSend) {
                    this.addProperty(key, temp.get(), temp.forceLookup ? true : false);
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * renderAllProperty
     * @returns {object} data
     */
    renderAllProperty() {
        for (const key in this._attributes) {
            if (!this._attributes.hasOwnProperty(key)) {
                continue;
            }

            let element, setter, getter, plugin, elementClass;
            const isPlugin = typeof this._attributes[key] == 'object' && 
                (this._attributes[key].hasOwnProperty('element') && this._attributes[key].hasOwnProperty('plugin')) ? true : false;
            const isChoice = typeof this._attributes[key] == 'object' && 
                (this._attributes[key].hasOwnProperty('element') && this._attributes[key].hasOwnProperty('choice')) ? true : false;
                
            if(typeof this._attributes[key] == 'string') {

                elementClass = this._attributes[key].substring(0, 1) == '#' ? `.${this._attributes[key].substring(1)}` : this._attributes[key];
                element = document.querySelector(this._attributes[key]);
                setter = (value) => this._setupSetProperty(key, value, 'default');
                getter = () => this._setupGetProperty(element, this._attributes[key], 'default');
            
            } else if(isPlugin) {
                
                elementClass = this._attributes[key].element.substring(0, 1) == '#' ? `.${this._attributes[key].element.substring(1)}` : this._attributes[key].element;
                plugin = this._pluginProperty(this._attributes[key].element, this._attributes[key].plugin);
                element = document.querySelector(this._attributes[key].element);
                setter = (value) => this._setupSetProperty(key, value, this._attributes[key].plugin.type);
                getter = () => this._setupGetProperty(plugin, this._attributes[key].element, this._attributes[key].plugin.type);
            
            } else if(isChoice) {

                elementClass = `.${this._attributes[key].element}`;
                element = document.querySelectorAll(`input[name=${this._attributes[key].element}]`);
                setter = (index, value) => this._setupSetChoiceProperty(key, index, value);

                if(element[0].type.toLowerCase() == 'checkbox') {
                    getter = (index = null) => this._setupGetChoiceProperty(key, index, element[0].type);
                } else {
                    getter = () => this._setupGetChoiceProperty(key, null, element[0].type);
                }

            } else {
                throw "Attribute is not defined";
            }

            if(element != undefined) {
                this[`_${key}`] = {
                    element: element,
                    get: getter,
                    set: setter,
                    error: (error) => this._setupErrorProperty(element, elementClass, error),
                    show: (isShow = true) => this._setupShowProperty(element, isShow),
                    enable: (isEnable = true) => this._setupEnableProperty(element, isEnable),
                    isSend: true 
                };

                if(isChoice && this._attributes[key].hasOwnProperty('isLookup') && this._attributes[key].isLookup) {
                    this[`_${key}`].forceLookup = true;
                }

                if(isPlugin) {
                    this[`_${key}`].plugin = plugin;

                    switch (this._attributes[key].plugin.type) {
                        case Controller.PluginType.Date:
                            $(this._attributes[key].element).datepicker().on('changeDate', (e) => {
                                this._resetError(element, elementClass);
                                this[`_${key}`].element.dispatchEvent(new Event('change'));
                            });

                            break;

                        case Controller.PluginType.Lookup:
                            this[`_${key}`].plugin.onChange = () => {
                                this._resetError(element, elementClass);
                            };

                            break;

                        case Controller.PluginType.Number:
                        case Controller.PluginType.Currency:
                        case Controller.PluginType.Phone:
                            element.addEventListener('change', () => {
                                this._resetError(element, elementClass);
                            });

                            break;

                        case Controller.PluginType.Slider:
                            this[`_${key}`].plugin.on("change", () => {
                                this._resetError(element, elementClass);
                            });

                            break;
                    
                        default:
                            break;
                    }
                } else {
                    if(isChoice) {
                        element.forEach(item => {
                            item.addEventListener('change', () => {
                                this._resetError(item, elementClass);
                            }); 
                        });
                    } else {
                        element.addEventListener('change', () => {
                            this._resetError(element, elementClass);
                        }); 
                    }  
                }
            }
        }
    }

    /**
     * _setupGetProperty
     * @param {object} property 
     * @param {string} element
     * @param {string} pluginType 
     * @return {any} value
     */
    _setupGetProperty(property, element, pluginType) {
        return pluginType != 'default' ? 
            this._getValueFromPlugin(property, element, pluginType) :
            this._getValueFromElement(property);
    }
    
    /**
     * _setupSetProperty
     * @param {string} propertyName 
     * @param {any} value 
     * @param {string} pluginType 
     */
    _setupSetProperty(propertyName, value, pluginType) {
        if(pluginType != 'default') {
            switch (pluginType) {
                case Controller.PluginType.Lookup:
                    value = Validation.isLookup(value) ? value : (
                        Validation.isString(value) && !Validation.isStringNullOrEmpty(value) ? value : null
                    );
                    this[`_${propertyName}`].plugin.setValue(value);
                    break;
    
                case Controller.PluginType.Currency:    
                case Controller.PluginType.Number:
                    value = Validation.isNumber(value) ? value.toString() : (
                        Validation.isString(value) && !Validation.isStringNullOrEmpty(value) ? 
                            (value == '0.00' ? '0' : value ) : '0'
                    );
                    this[`_${propertyName}`].plugin.setRawValue(value);
                    this[`_${propertyName}`].element.dispatchEvent(new Event('change'));

                    break;
    
                case Controller.PluginType.Phone:
                    value = Validation.isNumber(value) ? value.toString() : (Validation.isString(value) ? value : '');
                    this[`_${propertyName}`].plugin.setRawValue(value);
                    this[`_${propertyName}`].element.dispatchEvent(new Event('change'));

                    break;
    
                case Controller.PluginType.Slider:
                    value = Validation.isNumber(value) ? value : 0;
                    this[`_${propertyName}`].plugin.setValue(value, false, true);

                    break;
    
                case Controller.PluginType.Date:
                    try {
                        if(value) {
                            const checkDate = new Date(value);
                            const isDate = checkDate instanceof Date && !isNaN(checkDate);
                            value = isDate ? checkDate : null;
                        }
                    } catch(e) {
                        console.warn(e);
                        value = null;
                    }

                    if(value) {
                        $(this[`_${propertyName}`].element).datepicker('setDate', value);
                    } else {
                        $(this[`_${propertyName}`].element).datepicker('clearDates');
                    }

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
        } else {
            this._setValueToElement(this[`_${propertyName}`].element, value);
        }
    }

    /**
     * _setupSetChoiceProperty
     * @param {string} propertyName 
     * @param {number} index 
     * @param {boolean} value 
     */
    _setupSetChoiceProperty(propertyName, index, value) {
        this[`_${propertyName}`].element[index].checked = Validation.isBoolean(value) ? value : false;
        this[`_${propertyName}`].element[index].dispatchEvent(new Event('change'));
    }

    /**
     * _setupGetChoiceProperty
     * @param {string} propertyName 
     * @param {number} index 
     * @return {boolean | [{
     *  name: string;
     *  value: boolean;
     * }]}
     */
    _setupGetChoiceProperty(propertyName, index, type) {
        if(index != null) {
            return this[`_${propertyName}`].element[index].checked;
        } 

        const choiceLength = this[`_${propertyName}`].element.length;
        let value = type == 'checkbox' ? [] : null;
        for(let i=0; i<choiceLength; i++) {
            if(type == 'checkbox') {
                value.push({
                    name:  this[`_${propertyName}`].element[i].value,
                    value:  this[`_${propertyName}`].element[i].checked
                });
            } else {
                if(this[`_${propertyName}`].element[i].checked) {
                    value = this[`_${propertyName}`].element[i].value;
                    break;
                }
            }
        }

        return value;
    }

    /**
     * _setupErrorProperty
     * @param {HTMLElement} element
     * @param {string} elementClassName 
     * @param {string | [string]} error 
     */ 
    _setupErrorProperty(element, elementClassName, error) {
        const errorString = Validation.isString(error) && !Validation.isStringNullOrEmpty(error) ? 
            error : (error.length > 0 ? error.join("<br>") : '');

        if(!Validation.isStringNullOrEmpty(errorString)) {
            // radio / checkbox group
            if(element.length && element.length > 0 && element[0] != undefined && element[0].type != undefined) {
                if(element[0].type.toLowerCase() == 'checkbox' || element[0].type.toLowerCase() == 'radio') {
                    const invalidChoice = document.querySelector(`div.invalid-feedback${elementClassName}`);
                    invalidChoice.innerHTML = errorString;
                    invalidChoice.style.display = 'block';
                } 
            } else {
                element.classList.toggle('is-invalid', true);
                document.querySelector(elementClassName).innerHTML = errorString;
            }
        } else {
            this._resetError(element, elementClassName);
        }
    }

    _setupShowProperty(element, isShow) {

    }

    _setupEnableProperty(element, isEnable) {

    }

    _resetIsSend() {
        for (const key in this._attributes) {
            if (!this._attributes.hasOwnProperty(key)) {
                continue;
            }

            this.getProperty(key).isSend = true;
        }
    }

    /**
     * _resetError
     * @param {HTMLElement} element 
     * @param {string} elementClassName 
     */
    _resetError(element, elementClassName) {
        if(element.type.toLowerCase() == 'checkbox' || element.type.toLowerCase() == 'radio') {
            const invalidChoice = document.querySelector(`div.invalid-feedback${elementClassName}`);
            invalidChoice.innerHTML = '';
            invalidChoice.style.removeProperty('display');
        } else {
            element.classList.remove('is-invalid');
            document.querySelector(elementClassName).innerHTML = '';
        }
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

            case Controller.PluginType.Phone:
                data = this._phonePlugin(element, options);
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
     * _getValueFromPlugin
     * @param {object} property 
     * @param {string} element 
     * @param {string} pluginType 
     */
    _getValueFromPlugin(property, element, pluginType) {
        let value;
        switch (pluginType) {
            case Controller.PluginType.Lookup:
                value = this._lookupValuePlugin(property);
                break;

            case Controller.PluginType.Currency:
                value = this._currencyValuePlugin(property);
                break;

            case Controller.PluginType.Number:
                value = this._numberValuePlugin(property);
                break;

            case Controller.PluginType.Slider:
                value = this._sliderValuePlugin(property);
                break;

            case Controller.PluginType.Phone:
                value = this._phoneValuePlugin(property);
                break;

            case Controller.PluginType.Date:
                value = this._dateValuePlugin(property);
                break;

            // case Controller.PluginType.DateTime:
            //     value = this._lookupPlugin(element, options);
            //     break;

            // case Controller.PluginType.RangeDate:
            //     value = this._lookupPlugin(element, options);
            //     break;
        
            default:
                throw 'Plugin is not registred';
        }

        return value;
    }

    /**
     * _lookupPlugin
     * using Lookup library
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
        
        return new Lookup(options);
    }

    /**
     * _lookupValuePlugin
     * using Lookup library
     * @param {Lookup} property 
     * @return {{
     *  id: string;
     *  name: string;
     * }} value
     */
    _lookupValuePlugin(property) {
        return property.getValue();
    }

    /**
     * _datePlugin
     * using bootstrap-datepicker library
     * @param {string} element 
     * @param {object} options 
     * @return {datepicker} data
     */
    _datePlugin(element, options = {}) {
        const valid = Validation.isString(element) && !Validation.isStringNullOrEmpty(element);
        if(!valid) {
            throw "Element must be string and can't be empty";
        }
        
        const _options = options == undefined || Object.keys(options).length < 1 ? {
            format: "dd/mm/yyyy",
            maxViewMode: 2,
            clearBtn: true,
            autoclose: true,
            todayHighlight: true
        } : options;

        return $(element).datepicker(_options);
    }

    /**
     * _dateValuePlugin
     * using bootstrap-datepicker library
     * @param {string} element 
     */
    _dateValuePlugin(element) {
        const value = $(element).datepicker('getDate');
        return value != undefined ? moment(value).format('YYYY-MM-DD') : null;
    }

    /**
     * _numberPlugin
     * using cleave library
     * @param {string} element 
     * @param {object} options 
     * @return {Cleave} data
     */
    _numberPlugin(element, options = {}) {
        const valid = Validation.isString(element) && !Validation.isStringNullOrEmpty(element);
        if(!valid) {
            throw "Element must be string and can't be empty";
        }
        
        const _options = options == undefined || Object.keys(options).length < 1 ? {
            numeral: true,
            numeralDecimalMark: ',',
            delimiter: '.'
        } : options;
        
        return new Cleave(element, _options);
    }

    /**
     * _numberValuePlugin
     * using cleave library
     * @param {Cleave} property 
     * @return {number} value
     */
    _numberValuePlugin(property) {
        const nominal = property.getRawValue();
        const value = Validation.isNumber(nominal, true) ? nominal : 0;
        
        return parseFloat(value);
    }

    /**
     * _currencyPlugin
     * using cleave library
     * @param {string} element 
     * @param {object} options 
     * @return {Cleave} data
     */
    _currencyPlugin(element, options = {}) {
        const valid = Validation.isString(element) && !Validation.isStringNullOrEmpty(element);
        if(!valid) {
            throw "Element must be string and can't be empty";
        }

        const _options = options == undefined || Object.keys(options).length < 1 ? {
            numeral: true,
            prefix: 'Rp ',
            numeralDecimalMark: ',',
            delimiter: '.'
        } : options;
        const _elem = new Cleave(element, _options);

        return _elem;
    }

    /**
     * _currencyValuePlugin
     * using cleave library
     * @param {Cleave} property 
     * @return {number} value
     */
    _currencyValuePlugin(property) {
        const splitMask = property.getRawValue().split('Rp ');
        const nominal = splitMask.length > 1 ? splitMask[1] : 0;
        const value = Validation.isNumber(nominal, true) ? nominal : 0;

        return parseFloat(value);
    }

    /**
     * _phonePlugin
     * using cleave library
     * @param {string} element 
     * @param {object} options 
     * @return {Cleave} data
     */
    _phonePlugin(element, options = {}) {
        const valid = Validation.isString(element) && !Validation.isStringNullOrEmpty(element);
        if(!valid) {
            throw "Element must be string and can't be empty";
        }
        
        const _options = options == undefined || Object.keys(options).length < 1 ? {
            phone: true,
            phoneRegionCode: 'id'
        } : options

        return new Cleave(element, _options);
    }

    /**
     * _phoneValuePlugin
     * using cleave library
     * @param {Cleave} property 
     * @return {string} value
     */
    _phoneValuePlugin(property) {
        return property.getRawValue();
    }

    /**
     * _sliderPlugin
     * using bootstrap-slider
     * @param {string} element 
     * @param {object} options 
     * @return {Slider} data
     */
    _sliderPlugin(element, options = {}) {
        const valid = Validation.isString(element) && !Validation.isStringNullOrEmpty(element);
        if(!valid) {
            throw "Element must be string and can't be empty";
        }

        const _elem = new Slider(element, options);
        return _elem;
    }

    /**
     * _sliderValuePlugin
     * using bootstrap-slider
     * @param {Slider} property 
     * @return {number} value
     */
    _sliderValuePlugin(property) {
        return property.getValue();
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
     * _setValueToElement
     * @param {HTMLElement} element 
     * @param {any} value 
     */
    _setValueToElement(element, value) {
        const elementType = element.nodeName;
        switch (elementType) {
            case 'SELECT':
                this._setValueSelectElement(element, value);

                break;

            case 'TEXTAREA':
                this._setValuTextAreaElement(element, value);

                break;

            case 'INPUT':
            default:
                this._setValueInputElement(element, value);

                break;
        }
    }

    /**
     * _getValueInputElement
     * @param {HTMLElement} element
     * @return {string | number | boolean} value
     */
    _getValueInputElement(element) {
        let value;
        const inputType = element.type;

        switch (inputType.toLowerCase()) {
            case 'checkbox':
                value = element.checked;

                break;

            case 'text':
            case 'number':
            case 'email':
                value = element.value;

                break;

            default:
                value = null;
                
                break;
        }

        return value;
    }

    /**
     * _setValueInputElement
     * @param {HTMLElement} element 
     * @param {string | boolean} value string for default input, boolean for checkbox
     */
    _setValueInputElement(element, value) {
        const inputType = element.type;
        switch (inputType) {
            case 'checkbox':
                element.checked = Validation.isBoolean(value) ? value : false;
                element.dispatchEvent(new Event('change'));

                break;

            case 'text':
            case 'number':
                element.value = value;

                break;

            default:
                break;
        }
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
     * _setValueSelectElement
     * @param {HTMLElement} element 
     * @param {{
     *  id: string;
     *  name: string;
     * } | string | null} value 
     */
    _setValueSelectElement(element, value) {
        if(Validation.isLookup(value)) {
            element.value = value.id;
        } else if(Validation.isString(value) && !Validation.isStringNullOrEmpty(value)) {
            element.value = value;
        } else {
            elements.selectedIndex = -1;
        }
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
     * _setValuTextAreaElement
     * @param {HTMLElement} element 
     * @param {string} value 
     */
    _setValuTextAreaElement(element, value) {
        element.value = value;
    }

    /**
     * getCSRF
     * @return {string} CSRF
     */
    static getCSRF() {
        return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }

    /**
     * setAllError
     * @param {object} errors 
     */
    setAllError(errors) {
        Object.keys(errors).forEach(key => {
            const isLookup = key.slice(-3).toLowerCase() == '_id' ? true : false;
            const propertyName = isLookup ? key.substring(0, key.length - 3) : key;

            if(this[`_${propertyName}`] != undefined) {
                this[`_${propertyName}`].error(errors[key]);
            }
        });
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
        const _method = method || HTTPClient.Method.Post;
        const _headers = headers || {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": Controller.getCSRF()
        };
        
        this.setAllProperty();
        const _body = this._data;
        this._data = null;
        this._resetIsSend();

        try {
            if(body != undefined && typeof body == 'object') {
                Object.keys(body).forEach(key => {
                    _body[key] = body[key];
                });
            }
            const res = await HTTPClient.Request({
                uri: _uri,
                method: _method,
                headers: _headers,
                body: _body
            });

            if(res && !res.success && res.errors) {
                this.setAllError(res.errors);
            }

            return res;
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
        const _method = method || HTTPClient.Method.Put;
        const _headers = headers || {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": Controller.getCSRF()
        };
        
        this.setAllProperty();
        const _body = this._data;
        this._data = null;
        this._resetIsSend();

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
            const res = await HTTPClient.Request({
                uri: _uri,
                method: _method,
                headers: _headers,
                body: _body
            });

            if(res && !res.success && res.errors) {
                this.setAllError(res.errors);
            }

            return res;
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
        const _method = method || HTTPClient.Method.Delete;
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
                const res = await HTTPClient.Request({
                    uri: _uri,
                    method: _method,
                    headers: _headers,
                    body: _body
                });

                if(Validation.isBoolean(res)) {
                    return res;
                }
                else {
                    if(res && !res.success) {
                        throw {message: res.message, errors: res.errors};
                    }
            
                    return res.success;
                }
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

            if(!Validation.isBoolean(deleteRecord) && deleteRecord && !deleteRecord.success) {
                throw {message: deleteRecord.message, errors: deleteRecord.errors};
            }

            AlertHelper.Alert({message: afterDeleteMessage});
            isSuccess = true;
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
        const _method = method || HTTPClient.Method.Get;
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