import {HTTPClient} from '../httpClient/httpClient';
export class DataTable {
    #_element;
    #_tableType;
    #_paginationType;
    #_mappingData;
    #_url;
    #_onClick;
    #_onDoubleClick;
    #_onRightClick;
    #_actionType;
    #_onEdit;
    #_onDelete;
    #_pagination;
    #_showMoreId;
    #_selected;

    constructor({
        element,
        tableType = DataTable.TABLE_DEFAULT,
        paginationType = DataTable.PAGINATION_SHOW_MORE, 
        mappingData,
        url,
        event = null,
        action = null,
        isAutoInit = true,
    }) {
        try {
            this.element = element;
            this.tableType = tableType;
            this.paginationType = paginationType;
            this.mappingData = mappingData;
            this.url = url;
            this.event = event;
            this.action = action;
            
            if(isAutoInit) {
                this.init();
            }
        } catch (error) {
            Alert({title: 'Error in DataTable', message: error, type: ALERT_TYPE.ERROR});
            throw error;
        }
    }

    static get TABLE_DEFAULT() {
        return 'LIST';
    }

    static get TABLE_TILE() {
        return 'TILE';
    }

    static get PAGINATION_DEFAULT() {
        return 'DEFAULT';
    }

    static get PAGINATION_SHOW_MORE() {
        return 'SHOW_MORE';
    }

    static get PAGINATION_INFINITE() {
        return 'INFINITE_SCROLL';
    }

    static get DEFAULT_ACTION_TYPE() {
        return 'DEFAULT';
    }

    static get MENU_ACTION_TYPE() {
        return 'MENU'
    }

    set element(value) {
        if(typeof value == 'string') {
            this.#_element = document.querySelector(value);
        } else if(value.nodeName && value.nodeName == 'TABLE') {
            this.#_element = value;
        } else {
            throw new Error('Element must be Id of table element or table element');
        }
    }

    set tableType(value) {
        if(typeof value != 'string' || (value != undefined && value.trim() == '')) {
            throw new Error('Table Type must be string');
        }

        const isCorrectTableType = [DataTable.TABLE_DEFAULT, DataTable.TABLE_TILE].filter(item => item == value).length > 0 ? true : false;
        if(!isCorrectTableType) {
            throw new Error('Table Type is not registered');
        }

        this.#_tableType = value;
    }

    set paginationType(value) {
        if(typeof value != 'string' || (value != undefined && value.trim() == '')) {
            throw new Error('Pagination Type must be string');
        }

        const isCorrectPaginationType = [
            DataTable.PAGINATION_DEFAULT, 
            DataTable.PAGINATION_SHOW_MORE, 
            DataTable.PAGINATION_INFINITE
        ].filter(item => item == value).length > 0 ? true : false;
        if(!isCorrectPaginationType) {
            throw new Error('Pagination Type is not registered');
        }

        this.#_paginationType = value;
    }

    set mappingData(value) {
        if(value == undefined || typeof value != 'object' || value.length < 1) {
            throw new Error('Mapping Data must be array');
        }

        this.#_mappingData = value;
    }

    set url(value) {
        if(typeof value != 'string') {
            throw new Error('Url must be string');
        }

        this.#_url = `${APP_URL}/${value.trim()}?page=`;
    }

    set event(value) {
        if(value != undefined && typeof value != 'object') {
            throw new Error('Event must be object');
        }

        if(value != undefined && typeof value == 'object') {
            if(value.hasOwnProperty('onClick') && value.hasOwnProperty('onDoubleClick')) {
                throw new Error("On click and Double click can't be declare together");
            }
    
            if(value.hasOwnProperty('onClick') && value.onClick != undefined) {
                this.onClick = value.onClick;
            }
    
            if(value.hasOwnProperty('onDoubleClick') && value.onDoubleClick != undefined) {
                this.onDoubleClick = value.onDoubleClick;
            }
    
            // if(value.hasOwnProperty('onRightClick') && value.onRightClick != undefined) {
            //     this.onRightClick = value.onRightClick;
            // }
        }
    }

    set action(value) {
        if(value != undefined && typeof value != 'object') {
            throw new Error('Action must be object');
        }

        if(value != undefined && typeof value == 'object') {
            if(value.hasOwnProperty('type') && value.type != undefined && typeof value.type == 'string') {
                if(value.type != DataTable.DEFAULT_ACTION_TYPE && value.type != DataTable.MENU_ACTION_TYPE) {
                    throw new Error('Action Type must be object DEFAULT or MENU');
                }

                this.#_actionType = value.type;
            } else {
                this.#_actionType = DataTable.DEFAULT_ACTION_TYPE;
            }

            if(value.hasOwnProperty('onEdit') && value.onEdit != undefined) {
                this.onEdit = value.onEdit;
            }
    
            if(value.hasOwnProperty('onDelete') && value.onDelete != undefined) {
                this.onDelete = value.onDelete;
            }
        }
    }

    set onClick(value) {
        if(typeof value != 'function') {
            throw new Error('Event onClick must be function');
        }

        this.#_onClick = value;
    }

    set onDoubleClick(value) {
        if(typeof value != 'function') {
            throw new Error('Event onDoubleClick must be function');
        }

        this.#_onDoubleClick = value;
    }

    // set onRightClick() {

    // }

    set onEdit(value) {
        if(typeof value != 'function') {
            throw new Error('Action onEdit must be function');
        }

        this.#_onEdit = value;
    }

    set onDelete(value) {
        if(typeof value != 'function') {
            throw new Error('Action onDelete must be function');
        }

        this.#_onDelete = value;
    }

    get selected() {
        return this.#_selected;
    }

    async init() {
        const totalHeading = this.#_element.tHead.children[0].childElementCount;
        const totalMappingData = this.#_mappingData.length;

        try {
            if(totalHeading != totalMappingData) {
                throw "The number of column don't match the number of headings";
            }

            switch (this.#_paginationType) {
                case DataTable.PAGINATION_DEFAULT:
                    
                    break;

                case DataTable.PAGINATION_SHOW_MORE:
                    this.#renderShowMore();   
                    break;

                case DataTable.PAGINATION_INFINITE:
                
                    break;
            
                default:
                    break;
            }
            
            if(this.#_actionType == DataTable.DEFAULT_ACTION_TYPE) {
                this.#renderTheadAction();
            } else {
                this.#renderMenuAction();
            }
            
            const data = await this.getData(1);
            this.addRows(data);
        } catch (error) {
            throw new Error(error);
        }
    }

    addRow(data) {
        const tbody = this.#_element.tBodies[0];
        const tr = document.createElement('tr');
        const tr_data_id = document.createAttribute("data-id");
        tr_data_id.value = data.Id || data.id;
        tr.setAttributeNode(tr_data_id);
        
        this.#_mappingData.forEach(item => {
            const td = document.createElement('td');
            const valueTd = data[item] && typeof data[item] == 'object' ? 
                (data[item].hasOwnProperty('id') || data[item].hasOwnProperty('Id') ? 
                    data[item]['name'] || data[item]['Name'] : '') : (data[item] || '');
            td.textContent = valueTd;
            td.addEventListener('click', () => {
                this.#removeSelectedRow();
                tr.classList.toggle('selected-row');
                this.#_selected = data.Id || data.id;

                if(this.#_onEdit != undefined && this.#_actionType == DataTable.MENU_ACTION_TYPE) {
                    this.#setDisableEditAction(false);
                }

                if(this.#_onDelete != undefined && this.#_actionType == DataTable.MENU_ACTION_TYPE) {
                    this.#setDisableDeleteAction(false);
                }
            });

            tr.appendChild(td);
        });
        
        if(this.#_onEdit != undefined || this.#_onDelete != undefined) {
            if(this.#_actionType == DataTable.DEFAULT_ACTION_TYPE) {
                tr.appendChild(this.#renderButtonAction(data.Id || data.id));
            }
        }

        tbody.appendChild(tr);

        if(this.#_onClick != undefined) {
            tr.classList.toggle('clickable-row', true);
            tr.addEventListener('click', (event) => {
                this.#_onClick(event, data.Id || data.id);
            });
        }

        if(this.#_onDoubleClick != undefined) {
            tr.classList.toggle('clickable-row', true);
            tr.addEventListener('dblclick', (event) => {
                this.#_onDoubleClick(event, data.Id || data.id);
            });
        }
    }

    addRows(data) {
        data.forEach(item => {
            this.addRow(item);
        });
    }

    #renderTheadAction() {
        if((this.#_onEdit != undefined || this.#_onDelete != undefined) && this.#_actionType == DataTable.DEFAULT_ACTION_TYPE) {
            const tHead = this.#_element.tHead.children[0];
            const th = document.createElement('th');
            th.textContent = 'Action';
            tHead.appendChild(th);
        }
    }

    #renderMenuAction() {
        if((this.#_onEdit != undefined || this.#_onDelete != undefined) && this.#_actionType == DataTable.MENU_ACTION_TYPE) {
            const btnGroup = this.#_element.parentElement.parentElement.previousElementSibling;
            
            const icon = '<i class="fa fa-ellipsis-v"></i>';
            const listAction = [];
            if(this.#_onEdit != undefined) {
                const aEdit = document.createElement('a');
                const aEditClass = 'dropdown-item disabled action-edit';
                aEdit.setAttribute('class', aEditClass);
                aEdit.href = 'javascript:void(0)';
                aEdit.textContent = 'Edit';
                aEdit.addEventListener('click', () => {
                    const id = this.selected || null;
                    if(!id) {
                        return; 
                    }

                    this.#_onEdit(id);
                });

                listAction.push(aEdit);
            }

            if(this.#_onDelete != undefined) {
                const aDelete = document.createElement('a');
                const aDeleteClass = 'dropdown-item disabled action-delete';
                aDelete.setAttribute('class', aDeleteClass);
                aDelete.href = 'javascript:void(0)';
                aDelete.textContent = 'Delete';
                aDelete.addEventListener('click', () => {
                    const id = this.selected || null;
                    if(!id) {
                       return; 
                    }

                    this.#_onDelete(id).then(res => {
                        if(res) {
                            this.reload();
                        }
                    });
                });

                listAction.push(aDelete);
            }

            const menuAction = document.createElement('button');
            menuAction.setAttribute('class', 'btn');
            menuAction.setAttribute('data-toggle', 'dropdown');
            menuAction.setAttribute('aria-haspopup', 'true');
            menuAction.setAttribute('aria-expanded', "false");
            menuAction.innerHTML = icon;

            const dropdownAction = document.createElement('div');
            dropdownAction.setAttribute('class', 'dropdown-menu');
            dropdownAction.setAttribute('aria-labelledby', 'menuAction');
            listAction.forEach(item => {
                dropdownAction.appendChild(item);
            });

            btnGroup.appendChild(menuAction);
            btnGroup.appendChild(dropdownAction);
        }
    }

    #setDisableEditAction(isDisable) {
        const actionMenu = this.#_element.parentElement.parentElement.previousElementSibling.lastElementChild;
        const actionEdit = actionMenu.querySelector('.action-edit');
        
        if(isDisable) {
            actionEdit.classList.toggle('disabled', true);
        } else {
            actionEdit.classList.remove('disabled');
        }
    }

    #setDisableDeleteAction(isDisable) {
        const actionMenu = this.#_element.parentElement.parentElement.previousElementSibling.lastElementChild;
        const actionDelete = actionMenu.querySelector('.action-delete');
        
        if(isDisable) {
            actionDelete.classList.toggle('disabled', true);
        } else {
            actionDelete.classList.remove('disabled');
        }
    }

    #renderButtonAction(id) {
        const td = document.createElement('td');
        const editIcon = '<i class="fa fa-pencil-square-o"></i>';
        const deleteIcon = '<i class="fa fa-trash-o"></i>';

        if(this.#_onEdit != undefined) {
            const aEdit = document.createElement('a');
            aEdit.setAttribute('class', 'mr-2');
            aEdit.setAttribute('href', 'javascript:void(0)');
            aEdit.innerHTML = editIcon;
            aEdit.addEventListener('click', () => {
                this.#_onEdit(id);
            });

            td.appendChild(aEdit);
        }

        if(this.#_onDelete != undefined) {
            const aDelete = document.createElement('a');
            aDelete.setAttribute('class', 'mr-2');
            aDelete.setAttribute('style', 'javascript:void(0)');
            aDelete.innerHTML = deleteIcon;
            aDelete.addEventListener('click', () => {
                this.#_onDelete(id).then(res => {
                    if(res) {
                        this.reload();
                    }
                });
            });

            td.appendChild(aDelete);
        }

        return td;
    }

    #renderShowMore() {
        const showMoreId = `${this.#_element.id}-dataTable-show-more`;
        this.#_showMoreId = showMoreId;
        
        const icon = '<i class="fa fa-angle-double-down"></i>';

        const span = document.createElement('span');
        span.setAttribute('class', 'd-flex justify-content-center');
        span.setAttribute('style', 'display:none;');
        span.innerHTML = `<a href="javascript:void(0)" style="display:none" id="${showMoreId}"><p>${icon} Show more</p></a>`;
        this.#_element.parentElement.appendChild(span);

        document.querySelector(`#${showMoreId}`).addEventListener('click', (e) => {
            this.nextPage();
        });
    }
    
    // renderPagination() {

    // }

    #removeSelectedRow() {
        const row = document.querySelectorAll(`#${this.#_element.id} tr`);
        const rowLength = row.length;
        for(let i = 0; i < rowLength; i++) {
            row[i].classList.remove('selected-row');
        }
    }

    #handlingNextPage() {
        let nextPage;
        switch (this.#_paginationType) {
            case DataTable.PAGINATION_DEFAULT:
                
                break;

            case DataTable.PAGINATION_SHOW_MORE:
                nextPage = document.querySelector(`#${this.#_showMoreId}`);   
                break;

            case DataTable.PAGINATION_INFINITE:
            
                break;
        
            default:
                break;
        }

        nextPage.style.display = this.isCanNextPage ? 'block' : 'none';
    }

    #isSelected() {
        return this.#_selected != null && this.#_selected.trim() != '' ? true : false;
    }

    async getData(page = 1) {
        try {
            const res = await HTTPClient.Request({
                uri: this.#_url + page,
                method: HTTPClient.GET
            });

            this.#setPagination({
                total: res.total,
                perPage: res.per_page,
                currentPage: res.current_page,
                lastPage: res.last_page,
                from: res.from,
                to: res.to,
                isCanNext: res.next_page_url != null ? true : false
            });

            return res.data;
        } catch (error) {
            throw error;
        }
    }

    clearData() {
        this.#_element.replaceChild(document.createElement('tbody'), this.#_element.tBodies[0]);
    }

    #setPagination({
        total,
        perPage,
        currentPage,
        lastPage,
        from,
        to,
        isCanNext
    }) {
        this.#_pagination = {
            total: total,
            perPage: perPage,
            currentPage: currentPage,
            lastPage: lastPage,
            from: from,
            to: to,
            isCanNext: isCanNext
        };

        this.#handlingNextPage();
    }

    get currentPage() {
        return this.#_pagination && this.#_pagination.currentPage ? this.#_pagination.currentPage : 1;
    }

    get lastPage() {
        return this.#_pagination && this.#_pagination.lastPage ? this.#_pagination.lastPage : 1;
    }

    get totalData() {
        return this.#_pagination && this.#_pagination.total ? this.#_pagination.total : 0;
    }

    get isCanNextPage() {
        return this.#_pagination && this.#_pagination.isCanNext ? this.#_pagination.isCanNext : false; 
    }

    async nextPage() {
        try {
            let page = this.currentPage;
            if(this.#_paginationType == DataTable.PAGINATION_DEFAULT) {
                page = 1;
                this.clearData();
            } else {
                page += 1;
            }

            if(this.currentPage < this.lastPage) {
                const data = await this.getData(page);
                this.addRows(data);

                return true;
            }

            return false;
        } catch (error) {
            throw new Error(error);
        }
    }

    async reload(resetPaging = true) {
        try {
            this.#removeSelectedRow();
            this.#_selected = null;

            let page = this.currentPage;
            if(resetPaging) {
                page = 1;
                this.clearData();
            }

            const data = await this.getData(page);
            this.addRows(data);

            if(this.#_actionType == DataTable.MENU_ACTION_TYPE) {
                this.#setDisableEditAction(true);
                this.#setDisableDeleteAction(true);
            }

            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}