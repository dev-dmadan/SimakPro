export class HTTPClient {

    static get Method() {
        return {
            Get: 'GET',
            Post: 'POST',
            Put: 'PUT',
            Patch: 'PATCH',
            Delete: 'DELETE'
        };
    }
    
    static get ContentType() {
        return {
            Json: 'application/json',
            Form: 'application/x-www-form-urlencoded'
        };
    }

    /**
     * isContentTypeJSON
     * @param {Headers} headers 
     * @return {boolean}
     */
    static isContentTypeJSON(headers) {
        return headers.has('Content-Type') && headers.get('Content-Type') == HTTPClient.ContentType.Json;
    }

    /**
     * isContentTypeForm
     * @param {Headers} headers 
     * @return {boolean}
     */
    static isContentTypeForm(headers) {
        return headers.has('Content-Type') && headers.get('Content-Type') == HTTPClient.ContentType.Form;
    }

    /**
     * isContentTypeFormData
     * @param {object} body 
     * @return {boolean}
     */
    static isContentTypeFormData(body) {
        return typeof body == 'object' && body instanceof FormData;
    }

    /**
     * Request
     * @param {{
     *  uri: string;
     *  method: string;
     *  headers: object;
     *  body: object;
     *  isSelfHandling: boolean;
     * }} options 
     * @returns {Promise} result
     */
    static async Request({
        uri = null, 
        method, 
        headers = null, 
        body = null,
        isSelfHandling = false
    }) {
        try {
            let req;
            let options;
            switch (method) {
                case HTTPClient.Method.Get:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.Method.Get,
                        headers: headers
                    });
                    break;

                case HTTPClient.Method.Post:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.Method.Post,
                        headers: headers,
                        body: body
                    });
                    break;

                case HTTPClient.Method.Put:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.Method.Put,
                        headers: headers,
                        body: body
                    });
                    break;

                case HTTPClient.Method.Patch:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.Method.Patch,
                        headers: headers,
                        body: body
                    });
                    break;

                case HTTPClient.Method.Delete:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.Method.Delete,
                        headers: headers
                    });
                    break;
            
                default:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.Method.Get,
                        headers: headers
                    });
                    break;
            }

            req = await fetch(uri, options);
            return isSelfHandling ? req : await HTTPClient.handlingResponse(req);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * handlingResponse
     * @param {promise} response 
     * @return {Promise<string | object>} result
     */
    static async handlingResponse(response) {
        try {
            if(!response.ok) {
                throw `HTTP Request Error: ${response.status}`;
            }

            const contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return await response.json();
            } else if(contentType && (contentType.indexOf("text/html") !== -1 || contentType.indexOf("text/plain") !== -1)) {
                return await response.text();
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * handlingDownload
     * @param {promise} response 
     * @param {string} filename 
     */
    static async handlingDownload(response, filename) {
        try {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            throw error;
        }
    }

    /**
     * buildOptions
     * @param {{
     *  method: string;
     *  headers: object;
     *  body: object;
     * }} options 
     */
    static buildOptions({method, headers = null, body = null}) {
        const options = {};

        try {
            switch (method) {
                case HTTPClient.Method.Get:
                    options.method = HTTPClient.Method.Get;
                    break;
    
                case HTTPClient.Method.Post:
                    options.method = HTTPClient.Method.Post;
                    break;
    
                case HTTPClient.Method.Put:
                    options.method = HTTPClient.Method.Put;
                    break;
    
                case HTTPClient.Method.Patch:
                    options.method = HTTPClient.Method.Patch;
                    break;
    
                case HTTPClient.Method.Delete:
                    options.method = HTTPClient.Method.Delete;
                    break;
            
                default:
                    options.method = HTTPClient.Method.Get;
                    break;
            }
    
            options.headers = new Headers();
            if(headers != undefined && typeof headers == 'object') {
                Object.keys(headers).forEach(key => {
                    if(!options.headers.has(key)) {
                        options.headers.append(key, headers[key]);
                    }
                });
            }
    
            if(method == HTTPClient.Method.Post || method == HTTPClient.Method.Put || method == HTTPClient.Method.Patch) {
                if(body != undefined && typeof body == 'object') {
                    if(HTTPClient.isContentTypeJSON(options.headers)) {
                        options.body = JSON.stringify(body);
                    } else if(HTTPClient.isContentTypeForm(options.headers)) {
                        const urlencoded = new URLSearchParams();
                        Object.keys(body).forEach(key => {
                            urlencoded.append(key, body[key]);
                        });
                        options.body = urlencoded;
                    } else if(HTTPClient.isContentTypeFormData(body)) {
                        const formdata = new FormData();
                        Object.keys(body).forEach(key => {
                            formdata.append(key, body[key]);
                        });
                        options.body = formdata;
                        delete options.headers;
                    }
                }
            }   
        } catch (error) {
            throw error;
        }

        return options;
    }
}