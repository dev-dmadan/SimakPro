export class HTTPClient {

    /** Available Method */
        static get GET() {
            return 'GET';
        }

        static get POST() {
            return 'POST';
        }

        static get PUT() {
            return 'PUT';
        }

        static get PATCH() {
            return 'PATCH';
        }

        static get DELETE() {
            return 'DELETE';
        }
    /** End Available Method */
    
    /** Available Content Type */
        static get CONTENT_TYPE_JSON() {
            return "application/json";
        }

        static get CONTENT_TYPE_FORM() {
            return "application/x-www-form-urlencoded";
        }
    /** End Available Content Type */

    static isContentTypeJSON(headers) {
        return headers.has('Content-Type') && headers.get('Content-Type') == HTTPClient.CONTENT_TYPE_JSON;
    }

    static isContentTypeForm(headers) {
        return headers.has('Content-Type') && headers.get('Content-Type') == HTTPClient.CONTENT_TYPE_FORM;
    }

    static isContentTypeFormData(body) {
        return typeof body == 'object' && body instanceof FormData;
    }

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
                case HTTPClient.GET:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.GET,
                        headers: headers
                    });
                    break;

                case HTTPClient.POST:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.POST,
                        headers: headers,
                        body: body
                    });
                    break;

                case HTTPClient.PUT:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.PUT,
                        headers: headers,
                        body: body
                    });
                    break;

                case HTTPClient.PATCH:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.PATCH,
                        headers: headers,
                        body: body
                    });
                    break;

                case HTTPClient.DELETE:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.DELETE,
                        headers: headers
                    });
                    break;
            
                default:
                    options = HTTPClient.buildOptions({
                        method: HTTPClient.GET,
                        headers: headers
                    });
                    break;
            }

            req = await fetch(uri, options);
            if(isSelfHandling) {
                return req;
            } else {
                return await HTTPClient.handlingResponse(req);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

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

    static buildOptions({method, headers = null, body = null}) {
        const options = {};

        try {
            switch (method) {
                case HTTPClient.GET:
                    options.method = HTTPClient.GET;
                    break;
    
                case HTTPClient.POST:
                    options.method = HTTPClient.POST;
                    break;
    
                case HTTPClient.PUT:
                    options.method = HTTPClient.PUT;
                    break;
    
                case HTTPClient.PATCH:
                    options.method = HTTPClient.PATCH;
                    break;
    
                case HTTPClient.DELETE:
                    options.method = HTTPClient.DELETE;
                    break;
            
                default:
                    options.method = HTTPClient.GET;
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
    
            if(method == HTTPClient.POST || method == HTTPClient.PUT || method == HTTPClient.PATCH) {
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