import {HTTPClient} from '../httpClient/httpClient';
import { AlertHelper } from '../../libraries/alert/alert';

export class Controller {
    #data = null;
    #routeName;
    constructor(routeName) {
        if (this.constructor === Controller) {
            throw new Error("Can't instantiate this class");
        }

        this.#routeName = routeName;
    }

    get routeName() {
        return this.#routeName;
    }
    
    addProperty(name, value) {
        if(this.#data == undefined || this.#data == null) {
            this.#data = {};
        }
        
        this.#data[name] = (typeof value == 'object' && value != undefined) ? 
            value.id : value;
    }

    getAllProperty() {
        return this.#data;
    }

    static getCSRF() {
        return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }

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
        const _body = this.#data;;
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
        const _body = this.#data;
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
                    type: AlertHelper.Error
                }); 
            }

            throw error;
        }

        if(isWithConfirmValid) {
            return isSuccess;
        }
    }

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