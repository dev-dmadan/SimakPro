export class Modal {
    _element;
    _afterSave;

    /**
     * 
     * @param {{
     *  modal: string | HTMLElement;
     *  save: {
     *      element: string;
     *      onSave: () => boolean;
     *      afterSave: () => void;
     *  },
     *  close: () => void;
     * }} options 
     */
    constructor({
        modal, 
        save = {
            element: '',
            onSave: async () => {
                return false;
            },
            afterSave: async () => {
                return false;
            }
        }, 
        close = () => {
            return false;
        }
    }) {
        this.modal = modal;
        this.save = save;
        this.close = close;
    }

    set modal(value) {
        if(typeof value == 'string' && value.trim() != '') {
            this._element = document.querySelector(value);
        } else if(value.nodeName && value.nodeName == 'DIV') {
            this._element = value;
        } else {
            throw new Error('Modal must be Id of div element or modal element');
        }
    }

    set save(value) {
        if(value == undefined || typeof value != 'object') {
            throw Error('Save must must be object');
        }

        if(!value.hasOwnProperty('element') || !value.hasOwnProperty('onSave')) {
            throw Error('Save must have element and event onSave property');
        }

        if(typeof value.element != 'string' || value.element.trim() == '') {
            throw Error('Element Save must be string');
        }

        if(typeof value.onSave != 'function') {
            throw Error('Event onSave must be function');
        }

        if(value.hasOwnProperty('afterSave')) {
            this.afterSave = value.afterSave;
        }

        document.querySelector(`${value.element}`).addEventListener('click', () => {
            value.onSave()
            .then(res => {
                if(res) {
                    this.closeModal();
                }

                return res;
            })
            .then(res => {
                if(this._afterSave != undefined && res) {
                    this._afterSave();
                }
            })
        });
    }

    set afterSave(value) {
        if(value != undefined) {
            if(typeof value != "function") {
                throw Error('Event afterSave must be function');
            }

            this._afterSave = value;
        }
    }

    set close(value) {
        if(typeof value != 'function') {
            throw Error('Close must be function');
        }

        $(`#${this._element.id}`).on('hidden.bs.modal', (e) => {
            document.querySelector(`#${this._element.id} form`).reset();
            value();
        });
    }

    async showModal(renderFunction = null) {
        if(renderFunction != undefined && typeof renderFunction == 'function') {
            try {
                await renderFunction();
                $(`#${this._element.id}`).modal({backdrop: 'static'});   
            } catch (error) {
                console.error(error);
                throw Error(error);
            }
        } else {
            $(`#${this._element.id}`).modal({backdrop: 'static'});
        }
    }

    closeModal() {
        $(`#${this._element.id}`).modal('hide');
    }
}