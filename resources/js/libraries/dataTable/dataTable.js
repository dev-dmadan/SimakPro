import { HTTPClient } from '../httpClient/httpClient';
import { AlertHelper } from '../alert/alert';

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
    #_renderRow;
    #_renderTile;
    #_pagination;
    #_showMoreId;
    #_selected;
    #_filter;
    #_icons = {
        menu: '<i class="fa fa-ellipsis-v"></i>',
        showMore: '<i class="fas fa-angle-double-down"></i>',
        edit: '<i class="far fa-edit"></i>',
        delete: '<i class="far fa-trash-alt"></i>',
        view: '',
        asc: '',
        desc: ''
    };

    constructor({
        element,
        tableType = DataTable.TableType.List,
        paginationType = DataTable.PaginationType.ShowMore, 
        mappingData,
        url,
        event = null,
        action = null,
        renderRow = null,
        renderTile = null,
        isAutoInit = true,
    }) {
        try {
            this.tableType = tableType;
            this.element = element;

            if(tableType == DataTable.TableType.List) {
                this.mappingData = mappingData;
                this.renderRow = renderRow;
            } else {
                this.renderTile = renderTile;
            }

            this.paginationType = paginationType;
            this.url = url;
            this.event = event;
            this.action = action;
            
            if(isAutoInit) {
                this.init();
            }
        } catch (error) {
            Alert({title: 'Error in DataTable', message: error, type: AlertHelper.Error});
            throw error;
        }
    }

    static get TableType() {
        return {
            List: 'List',
            Tile: 'Tile'
        };
    }

    static get PaginationType() {
        return {
            Default: 'Default',
            ShowMore: 'Show More',
            Infinite: 'Infinite Scroll'
        };
    }

    static get ActionType() {
        return {
            Default: 'Default',
            Menu: 'Menu',
            Custom: 'Custom'
        };
    }

    /**
     * @param {string} value
     */
    set tableType(value) {
        if(typeof value != 'string' || (value != undefined && value.trim() == '')) {
            throw new Error('Table Type must be string');
        }

        const isCorrectTableType = [DataTable.TableType.List, DataTable.TableType.Tile].filter(item => item == value).length > 0 ? true : false;
        if(!isCorrectTableType) {
            throw new Error('Table Type is not registered');
        }

        this.#_tableType = value;
    }

    /**
     * @param {string} value
     */
    set element(value) {
        if(typeof value == 'string') {
            this.#_element = document.querySelector(value);
        } else if(this.#_tableType == DataTable.TableType.Default) {
            if(value.nodeName && value.nodeName == 'TABLE') {
                this.#_element = value;
            } else {
                throw new Error('Element must be Id of table element or table element');
            }
        } else if(this.#_tableType == DataTable.TableType.Tile) {
            if(value.nodeName && value.nodeName != 'TABLE') {
                this.#_element = value;
            } else {
                throw new Error('Element must be Id of tile element or tile element (not table)');
            }
        } else {
            throw new Error("Element can't be empty");
        }
    }

    /**
     * @param {string} value
     */
    set paginationType(value) {
        if(typeof value != 'string' || (value != undefined && value.trim() == '')) {
            throw new Error('Pagination Type must be string');
        }

        const isCorrectPaginationType = [
            DataTable.PaginationType.Default, 
            DataTable.PaginationType.ShowMore, 
            DataTable.PaginationType.Infinite
        ].filter(item => item == value).length > 0 ? true : false;
        if(!isCorrectPaginationType) {
            throw new Error('Pagination Type is not registered');
        }

        this.#_paginationType = value;
    }

    /**
     * @param {[string]} value
     */
    set mappingData(value) {
        if(value == undefined || typeof value != 'object' || value.length < 1) {
            throw new Error('Mapping Data must be array');
        }

        this.#_mappingData = value;
    }

    /**
     * @param {string} value
     */
    set url(value) {
        if(typeof value != 'string') {
            throw new Error('Url must be string');
        }
        
        this.#_url = value.includes(APP_URL) ? value : `${APP_URL}/${value.trim()}?page=`;
    }

    /**
     * @param {{ onClick: void; onDoubleClick: void; }} value
     */
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

    /**
     * @param {{ type: string; onEdit: void; onDelete: promise; }} value
     */
    set action(value) {
        if(value != undefined && typeof value != 'object') {
            throw new Error('Action must be object');
        }

        if(value != undefined && typeof value == 'object') {
            if(value.hasOwnProperty('type') && value.type != undefined && typeof value.type == 'string') {
                const actionList = [
                    DataTable.ActionType.Default, DataTable.ActionType.Menu, DataTable.ActionType.Menu
                ];
                const isExist = actionList.filter(item => item = value.type).length > 0 ? true : false;
                if(!isExist) {
                    throw new Error('Action Type must be object Default or Menu or Custom');
                }

                this.#_actionType = value.type;
            } else {
                this.#_actionType = DataTable.ActionType.Default;
            }

            if(value.hasOwnProperty('onEdit') && value.onEdit != undefined) {
                this.onEdit = value.onEdit;
            }
    
            if(value.hasOwnProperty('onDelete') && value.onDelete != undefined) {
                this.onDelete = value.onDelete;
            }
        }
    }

    /**
     * @param {void} value
     */
    set onClick(value) {
        if(typeof value != 'function') {
            throw new Error('Event onClick must be function');
        }

        this.#_onClick = value;
    }

    /**
     * @param {void} value
     */
    set onDoubleClick(value) {
        if(typeof value != 'function') {
            throw new Error('Event onDoubleClick must be function');
        }

        this.#_onDoubleClick = value;
    }

    // set onRightClick() {

    // }

    /**
     * @param {void} value
     */
    set onEdit(value) {
        if(typeof value != 'function') {
            throw new Error('Action onEdit must be function');
        }

        this.#_onEdit = value;
    }

    /**
     * @param {promise} value
     */
    set onDelete(value) {
        if(typeof value != 'function') {
            throw new Error('Action onDelete must be function');
        }

        this.#_onDelete = value;
    }

    /**
     * @param {void} value
     */
    set renderRow(value) {
        if(value != undefined && typeof value != 'object') {
            if(typeof value != 'function') {
                throw new Error('Render Row must be function');
            }
        }

        this.#_renderRow = value;
    }

    /**
     * @param {void} value
     */
    set renderTile(value) {
        if(typeof value != 'function') {
            throw new Error('Render Tile must be function');
        }

        this.#_renderTile = value;
    }

    get selected() {
        return this.#_selected;
    }

    async init() {
        try {
            switch (this.#_paginationType) {
                case DataTable.PaginationType.Default:
                    
                    break;

                case DataTable.PaginationType.ShowMore:
                    this.#renderShowMore();   
                    break;

                case DataTable.PaginationType.Infinite:
                
                    break;
            
                default:
                    break;
            }

            const data = await this.getData(1);
            if(this.#_tableType == DataTable.TableType.List) {
                const totalHeading = this.#_element.tHead.children[0].childElementCount;
                const totalMappingData = this.#_mappingData.length;
                if(totalHeading != totalMappingData) {
                    throw "The number of column don't match the number of headings";
                }

                if(this.#_actionType == DataTable.ActionType.Default) {
                    this.#renderTheadAction();
                } else {
                    this.#renderMenuAction();
                }
            } 

            this.addRows(data);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * addRow
     * @param {object} data 
     */
    addRow(data) {
        const tbody = this.#_element.tBodies[0];
        const tr = document.createElement('tr');
        // const tr_data_id = document.createAttribute("data-id");
        // tr_data_id.value = data.Id || data.id;
        // tr.setAttributeNode(tr_data_id);
        
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

                if(this.#_onEdit != undefined && this.#_actionType == DataTable.ActionType.Menu) {
                    this.#setDisableEditAction(false);
                }

                if(this.#_onDelete != undefined && this.#_actionType == DataTable.ActionType.Menu) {
                    this.#setDisableDeleteAction(false);
                }
            });

            tr.appendChild(td);
        });
        
        if(this.#_onEdit != undefined || this.#_onDelete != undefined) {
            if(this.#_actionType == DataTable.ActionType.Default) {
                tr.appendChild(this.#renderButtonAction(data.Id || data.id));
            }
        }

        tbody.appendChild(tr);
        if(this.#_renderRow != undefined) {
            this.#_renderRow(tr, tr.cells, data);
        }
        
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

    /**
     * addTile
     * @param {object} data 
     */
    addTile(data) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card card-custom-shadow-tile');
        
        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        const renderTile = this.#_renderTile(data, {edit: this.#_onEdit, delete: this.#_onDelete});
        if(this.#_onEdit != undefined || this.#_onDelete != undefined) {
            if(this.#_actionType == DataTable.ActionType.Custom) {
                if(typeof renderTile == 'string') {
                    cardBody.innerHTML += renderTile;
                } else {
                    cardBody.appendChild(renderTile);
                }
            } else {
                const contentCardBody = document.createElement('div');
                contentCardBody.setAttribute('class', 'row align-items-md-center');
                contentCardBody.appendChild(this.#renderTileAction());
                
                if(typeof renderTile == 'string') {
                    contentCardBody.innerHTML += '<div class="col">' + renderTile + '</div>';
                } else {
                    const _div = document.createElement('div');
                    _div.setAttribute('class', 'col');
                    _div.appendChild(renderTile);
                    contentCardBody.appendChild(_div);
                }

                if(this.#_onEdit != undefined) {
                    contentCardBody.querySelector('.action-edit').addEventListener('click', () => {
                        if(!data.id) {
                            return; 
                        }
    
                        this.#_onEdit(data.id);
                    });
                }

                if(this.#_onDelete != undefined) {
                    contentCardBody.querySelector('.action-delete').addEventListener('click', () => {
                        if(!data.id) {
                            return; 
                        }
    
                        this.#_onDelete(data.id).then(res => {
                            if(res) {
                                this.reload();
                            }
                        });
                    });
                }

                cardBody.appendChild(contentCardBody);
            }
        } else {
            if(typeof renderTile == 'string') {
                cardBody.innerHTML += renderTile;
            } else {
                cardBody.appendChild(renderTile);
            }
        }

        card.appendChild(cardBody);
        card.addEventListener('click', () => {
            this.#removeSelectedRow();
            card.classList.toggle('selected-row');
            this.#_selected = data.Id || data.id;
        });
        this.#_element.appendChild(card);

        if(this.#_onClick != undefined) {            
            card.classList.toggle('clickable-row', true);
            card.addEventListener('click', (event) => {
                this.#_onClick(event, data.Id || data.id);
            });
        }

        if(this.#_onDoubleClick != undefined) {
            card.classList.toggle('clickable-row', true);
            card.addEventListener('dblclick', (event) => {
                this.#_onDoubleClick(event, data.Id || data.id);
            });
        }
    }

    /**
     * addRows
     * @param {[object]} data 
     */
    addRows(data) {
        data.forEach(item => {
            if(this.#_tableType == DataTable.TableType.List) {
                this.addRow(item);
            } else {
                this.addTile(item);
            }
        });
    }
    
    #renderTheadAction() {
        if((this.#_onEdit != undefined || this.#_onDelete != undefined) && this.#_actionType == DataTable.ActionType.Default) {
            const tHead = this.#_element.tHead.children[0];
            const th = document.createElement('th');
            th.textContent = 'Action';
            tHead.appendChild(th);
        }
    }

    #renderMenuAction() {
        if((this.#_onEdit != undefined || this.#_onDelete != undefined) && this.#_actionType == DataTable.ActionType.Menu) {
            const btnGroup = this.#_element.parentElement.parentElement.previousElementSibling;
            
            const icon = this.#_icons.menu;
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

    #renderTileAction() {
        const groupAction = document.createElement('div');
        if((this.#_onEdit != undefined || this.#_onDelete != undefined) && this.#_tableType == DataTable.TableType.Tile) {
            groupAction.setAttribute('class', 'col-3 col-md-auto order-md-last text-right');
            
            const listAction = [];
            if(this.#_onEdit != undefined) {
                const aEdit = document.createElement('a');
                const aEditClass = 'dropdown-item action-edit';
                aEdit.setAttribute('class', aEditClass);
                aEdit.href = 'javascript:void(0)';
                aEdit.textContent = 'Edit';

                listAction.push(aEdit);
            }

            if(this.#_onDelete != undefined) {
                const aDelete = document.createElement('a');
                const aDeleteClass = 'dropdown-item action-delete';
                aDelete.setAttribute('class', aDeleteClass);
                aDelete.href = 'javascript:void(0)';
                aDelete.textContent = 'Delete';

                listAction.push(aDelete);
            }

            const menuAction = document.createElement('button');
            menuAction.setAttribute('class', 'btn btn-icons btn-rounded btn-light');
            menuAction.setAttribute('data-toggle', 'dropdown');
            menuAction.setAttribute('aria-haspopup', 'true');
            menuAction.setAttribute('aria-expanded', "false");
            menuAction.innerHTML = '<i class="fa fa-ellipsis-v pt-1"></i>';

            const dropdownAction = document.createElement('div');
            dropdownAction.setAttribute('class', 'dropdown-menu');
            dropdownAction.setAttribute('aria-labelledby', 'menuAction');
            listAction.forEach(item => {
                dropdownAction.appendChild(item);
            });

            groupAction.appendChild(menuAction);
            groupAction.appendChild(dropdownAction);
        } else {
            return null;
        }

        return groupAction;
    }

    /**
     * setDisableEditAction
     * @param {boolean} isDisable 
     */
    #setDisableEditAction(isDisable) {
        const actionMenu = this.#_element.parentElement.parentElement.previousElementSibling.lastElementChild;
        const actionEdit = actionMenu.querySelector('.action-edit');
        
        if(isDisable) {
            actionEdit.classList.toggle('disabled', true);
        } else {
            actionEdit.classList.remove('disabled');
        }
    }

    /**
     * setDisableDeleteAction
     * @param {boolean} isDisable 
     */
    #setDisableDeleteAction(isDisable) {
        const actionMenu = this.#_element.parentElement.parentElement.previousElementSibling.lastElementChild;
        const actionDelete = actionMenu.querySelector('.action-delete');
        
        if(isDisable) {
            actionDelete.classList.toggle('disabled', true);
        } else {
            actionDelete.classList.remove('disabled');
        }
    }

    /**
     * renderButtonAction
     * @param {string} id 
     */
    #renderButtonAction(id) {
        const td = document.createElement('td');
        const editIcon = this.#_icons.edit;
        const deleteIcon = this.#_icons.delete;

        if(this.#_onEdit != undefined) {
            const aEdit = document.createElement('a');
            aEdit.setAttribute('class', 'mr-2');
            aEdit.setAttribute('href', 'javascript:void(0)');
            aEdit.setAttribute('style', 'color: #28A745');
            aEdit.innerHTML = editIcon;
            aEdit.addEventListener('click', () => {
                this.#_onEdit(id);
            });

            td.appendChild(aEdit);
        }

        if(this.#_onDelete != undefined) {
            const aDelete = document.createElement('a');
            aDelete.setAttribute('class', 'mr-2');
            aDelete.setAttribute('href', 'javascript:void(0)');
            aDelete.setAttribute('style', 'color: red');
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
        
        const icon = this.#_icons.showMore;

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
        const row = this.#_tableType == DataTable.TableType.List ? 
            document.querySelectorAll(`#${this.#_element.id} tr`) : document.querySelectorAll(`#${this.#_element.id} .card`);
        const rowLength = row.length;

        for(let i = 0; i < rowLength; i++) {
            row[i].classList.remove('selected-row');
        }
    }

    #handlingNextPage() {
        let nextPage;
        switch (this.#_paginationType) {
            case DataTable.PaginationType.Default:
                
                break;

            case DataTable.PaginationType.ShowMore:
                nextPage = document.querySelector(`#${this.#_showMoreId}`);   
                break;

            case DataTable.PaginationType.Infinite:
            
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
            let res;
            const filter = this.#_filter != undefined ? this.#_filter : null;
            if(filter) {
                res = await HTTPClient.Request({
                    uri: this.#_url + page,
                    method: HTTPClient.POST,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        filters: filter
                    }
                });
            } else {
                res = await HTTPClient.Request({
                    uri: this.#_url + page,
                    method: HTTPClient.GET
                });
            }

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
        if(this.#_tableType == DataTable.TableType.List) {
            this.#_element.replaceChild(document.createElement('tbody'), this.#_element.tBodies[0]);
        } else {
            while (this.#_element.firstChild) {
                this.#_element.removeChild(this.#_element.firstChild);
            }
        }
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
            if(this.#_paginationType == DataTable.PaginationType.Default) {
                this.clearData();
            }

            page += 1;
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

            if(this.#_actionType == DataTable.ActionType.Menu) {
                this.#setDisableEditAction(true);
                this.#setDisableDeleteAction(true);
            }

            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}