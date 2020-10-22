import { Lookup } from "../lookup/lookup";

export class FilterHelper {
    _element;
    _event;
    _listSelectColumn;
    _listFilter;
    _hideClass = 'd-none';
    _marginBottomClass = 'mb-2';
    _marginRightClass = 'mr-2';
    _marginLeftClass = 'ml-2';
    _selectColumnClass = 'form-control';
    _inputValueClass = 'form-control';
    _titleClass = 'small d-inline-block text-truncate align-middle';
    _buttonRemove = {
        class: 'close align-middle',
        icon: '<span aria-hidden="true">×</span>',
        iconMinimize: '<i class="fa fa-angle-double-left"></i>'
    };
    _buttonSearch = {
        class: 'close',
        icon: '<i class="fa fa-check small"></i>'
    };

    /**
     * @param {{
     *  element: {
     *      button: string;
     *      container: string;
     *  };
     *  event: void;
     *  searchColumns: [{
     *      text: string;
     *      value: string;
     *      type: string;
     *      source: object;
     *  }]
     * }}
     */
    constructor({
        element = {
            button: '#filters_folders_add_filters',
            container: '.filter_folder_list'
        },
        event = () => {},
        searchColumns = [],
        customClass = {
            hideClass: 'd-none',
            selectColumnClass: 'form-control',
            inputValueClass: 'form-control'
        },
        customButton = {
            remove: {
                close: '<span aria-hidden="true">×</span>',
                minimize: '<i class="fa fa-angle-double-left"></i>'
            },
            searh: '<i class="fa fa-check small"></i>'
        }
    } = {}) {
        this.element = element;
        this.event = event;
        this._listSelectColumn = searchColumns;
        this.customClass = customClass;
        this.customButton = customButton;
        
        this.init();
    }

    static get listOperator() {
        return {
            Equal: {
                value: 0,
                symbol: '='
            },
            NotEqual: {
                value: 1,
                symbol: '≠'
            },
            Contain: {
                value: 2,
                symbol: 'Contain'
            },
            NotContain: {
                value: 3,
                symbol: 'Not Contain'
            },
            Greater: {
                value: 4,
                symbol: '>'
            },
            GreateOrEqual: {
                value: 5,
                symbol: '≥'
            },
            Less: {
                value: 6,
                symbol: '<'
            },
            LessOrEqual: {
                value: 7,
                symbol: '≤'
            },
            Empty: {
                value: 8,
                symbol: 'Empty'
            },
        };
    }

    get element() {
        return this._element != undefined ? this._element : {
            button: '#filters_folders_add_filters',
            container: '.filter_folder_list'
        };
    }
    set element(value) {
        if(value != undefined && typeof value == 'object' && (value.hasOwnProperty('button') && value.hasOwnProperty('container'))) {
            this._element = value;
        }
    }

    set event(value) {
        if(value != undefined && typeof value == 'function') {
            this._event = value;
        }
    }

    set customClass(value) {

    }

    set customButton(value) {

    }

    get hideClass() {
        return this._hideClass;
    }
    get marginBottomClass() {
        return this._marginBottomClass;
    }
    get marginRightClass() {
        return this._marginRightClass;
    }
    get marginLeftClass() {
        return this._marginLeftClass;
    }
    get selectColumnClass() {
        return this._selectColumnClass;
    }
    get inputValueClass() {
        return this._inputValueClass;
    }
    get titleClass() {
        return this._titleClass;
    }
    get buttonRemove() {
        return this._buttonRemove;
    }
    get buttonSearch() {
        return this._buttonSearch;
    }

    init() {
        const filterElement = document.querySelector(this.element.button);
        filterElement.addEventListener('click', () => {
            this.addFilter();
        });
    }

    getListFilter() {
        return this._listFilter;
    }

    getOptionSelectColumn() {
        return this._listSelectColumn != undefined ? this._listSelectColumn : [];
    }

    addFilter() {
        this._listFilter = this._listFilter == undefined ? [] : this._listFilter;
        const isCanAddFilter = this.getListFilter().filter(item => item && item.isActive).length > 0 ? false : true;
        if(isCanAddFilter) {
            this.renderFilter();
        }
    }

    setFilter(indexFilter, selectColumn, operator, value) {
        const _selectColumn = JSON.parse(selectColumn);
        this._listFilter[indexFilter].configFilter = {
            column: _selectColumn.value,
            value: value,
            operator: operator
        };
    }

    getFilters() {
        const listFilter = this.getListFilter().filter(item => item && item != undefined);
        const filters = listFilter.length > 0 ? listFilter.map(item => item.configFilter) : [];

        return filters;
    }

    renderFilter(inputType) {
        const container = document.querySelector(this.element.container);
        const indexFilter = this.getListFilter().length;
        const selectColumn = this._renderSelectColumn();
        const groupInputValue = this._renderInputValue(inputType);
        const titleFilter = this._renderTitleFilter(indexFilter);
        
        const selectOperator = groupInputValue.querySelector('.input-group .input-group-prepend .form-control');
        const inputValue = groupInputValue.querySelector('.input-group').lastElementChild.previousSibling;

        const divGroup = document.createElement('div');
        divGroup.setAttribute('class', `col-lg-6 col-md-12 col-sm-12 ${this.marginBottomClass} index-filter-${indexFilter}`);

        const formGroup = document.createElement('div');
        formGroup.setAttribute('class', 'form-row');

        formGroup.appendChild(selectColumn);
        formGroup.appendChild(groupInputValue);
        divGroup.appendChild(formGroup);

        container.appendChild(divGroup);
        container.appendChild(titleFilter);

        if(this.getListFilter().filter(item => item).length < 1 && container.querySelector('.button-search-filter') == null) {
            container.appendChild(this._renderSearchButton());
        } else {
            const btnSearchFilter = container.querySelector('.button-search-filter');
            container.appendChild(btnSearchFilter);
            btnSearchFilter.classList.remove(this.hideClass);
        }

        this._listFilter.push({
            groupFilter: divGroup,
            selectColumn: selectColumn.lastElementChild,
            selectOperator: selectOperator,
            inputValue: inputValue,
            titleFilter: titleFilter.firstElementChild,
            isActive: true,
            isSearch: false
        });
        this._onChangeSelectColumn(formGroup.firstElementChild.lastElementChild);
    }

    _renderSelectColumn() {
        const divSelect = document.createElement('div');
        divSelect.setAttribute('class', 'col-4');

        const select = document.createElement('select');
        select.setAttribute('class', `${this.selectColumnClass}`);
        
        this.getOptionSelectColumn().forEach(item => {
            const option = new Option(item.text, JSON.stringify(item), false, false);
            select.append(option);
        });

        divSelect.appendChild(select);

        select.addEventListener('change', (e) => {
            this._onChangeSelectColumn(e.target);
        });

        return divSelect;
    }

    _renderInputValue(inputType, lookupOption = null) {
        const divInput = document.createElement('div');
        divInput.setAttribute('class', 'col-8');

        let inputColumnHTML;  
        switch (inputType) {
            case 'number':
                inputColumnHTML = `<input type="number" class="${this.inputValueClass}">`;
                break;

            case 'lookup':
                inputColumnHTML = `<select class="${this.inputValueClass}"></select>`;
                break;

            case 'date':
            case 'text':
            default:
                inputColumnHTML = `<input type="text" class="${this.inputValueClass}">`;
                break;
        }
        
        const divGroupInput = document.createElement('div');
        divGroupInput.setAttribute('class', 'input-group');
        // if(inputType == 'lookup') {
        //     divGroupInput.setAttribute('style', 'font-size: 0.75rem');
        // }

        divGroupInput.appendChild(this._renderOperator(inputType));
        divGroupInput.innerHTML += inputColumnHTML;
        divGroupInput.appendChild(this._renderRemoveButton('form'));
        
        divInput.appendChild(divGroupInput);

        // operator value
        divGroupInput.firstElementChild.lastElementChild.addEventListener('change', (e) => {
            this._onChangeOperator(e.target);
        });

        // input value
        const inputValue = divGroupInput.lastElementChild.previousElementSibling;
        if(lookupOption) {
            new Lookup({
                element: inputValue,
                placeholder: `Choose ${lookupOption.text}`,
                sourceData: lookupOption.source
            });
        } else {
            inputValue.addEventListener('change', (e) => {
                this._onChangeInput(e.target);
            });
        }

        return divInput;
    }

    _renderOperator(inputType) {
        const divSelectOperator = document.createElement('div');
        divSelectOperator.setAttribute('class', 'input-group-prepend');
        const select = document.createElement('select');
        select.setAttribute('class', this.inputValueClass);

        let listOptions;
        switch (inputType) {
            case 'number':
                listOptions = [
                    FilterHelper.listOperator.Equal, FilterHelper.listOperator.NotEqual,
                    FilterHelper.listOperator.Greater, FilterHelper.listOperator.GreateOrEqual,
                    FilterHelper.listOperator.Less, FilterHelper.listOperator.LessOrEqual
                ];
                break;

            case 'lookup':
                listOptions = [
                    FilterHelper.listOperator.Equal, FilterHelper.listOperator.NotEqual,
                    FilterHelper.listOperator.Empty
                ];
                break;

            case 'date':
                listOptions = [
                    FilterHelper.listOperator.Equal, FilterHelper.listOperator.NotEqual,
                    FilterHelper.listOperator.Greater, FilterHelper.listOperator.GreateOrEqual,
                    FilterHelper.listOperator.Less, FilterHelper.listOperator.LessOrEqual,
                    FilterHelper.listOperator.Empty
                ];
                break;
            
            case 'text':
            default:
                listOptions = [
                    FilterHelper.listOperator.Equal, FilterHelper.listOperator.NotEqual,
                    FilterHelper.listOperator.Contain, FilterHelper.listOperator.NotContain,
                    FilterHelper.listOperator.Empty
                ];
                break;
        }

        listOptions.forEach(item => {
            const option = new Option(item.symbol, item.value, false, false);
            select.append(option);
        });

        divSelectOperator.appendChild(select);

        return divSelectOperator;
    }

    _renderTitleFilter(index) {
        const divTitle = document.createElement('div');
        divTitle.setAttribute('class', `${this.marginBottomClass} mr-3 index-filter-${index} ${this.hideClass}`);
        
        const span = document.createElement('span');
        span.setAttribute('class', this.titleClass);
        span.setAttribute('style', 'max-width: 200px');
        divTitle.appendChild(span);
        divTitle.appendChild(this._renderRemoveButton('title'));

        divTitle.firstElementChild.addEventListener('click', (e) => {
            this._onClickTitle(divTitle);
        });

        return divTitle;
    }

    _renderSearchButton() {
        const divButton = document.createElement('div');
        divButton.setAttribute('class', `${this.marginBottomClass} mr-3 button-search-filter`);

        const button = `<button type="button" aria-label="Close" class="${this.buttonSearch.class}" style="float: none">${this.buttonSearch.icon}</button>`;        
        divButton.innerHTML = button;

        const buttonSearch = divButton.querySelector('button');
        buttonSearch.addEventListener('click', () => {
            this._onClickSearch(buttonSearch);
        });

        return divButton;
    }

    _renderRemoveButton(type) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('aria-label', 'Close');
        button.setAttribute('style', 'float: none');
        button.setAttribute('class', `${this.buttonRemove.class} ${this.marginLeftClass}`);

        const iconButton = this.buttonRemove.icon;     
        button.innerHTML = iconButton;        

        button.addEventListener('click', () => {
            this._onClickRemove(button, type);
        });
        
        return button;
    }

    _onChangeSelectColumn(scope) {
        let indexFilter;
        const classList = scope.parentElement.parentElement.parentElement.classList;
        for(const item in classList) {
            const _class = classList[item].toString();
            if(_class.includes('index-filter-')) {
                indexFilter = _class.split('-')[2];
                break;
            }
        }

        const typeJSON = JSON.parse(scope.value);
        const type = typeJSON.type;
        
        const newInput = this._renderInputValue(type, (type == 'lookup' ? typeJSON : null));
        const parentOldInput = scope.parentElement.parentElement.lastElementChild;
        const oldInput = parentOldInput.lastElementChild;

        parentOldInput.replaceChild(newInput.lastElementChild, oldInput);

        if(indexFilter != undefined && indexFilter != -1) {
            this._listFilter[parseInt(indexFilter)].selectOperator = parentOldInput.querySelector('.input-group .input-group-prepend .form-control');
            this._listFilter[parseInt(indexFilter)].inputValue = type == 'lookup' ? 
                parentOldInput.querySelector('.input-group').lastElementChild.previousElementSibling.previousElementSibling :
                parentOldInput.querySelector('.input-group').lastElementChild.previousElementSibling;
        }
    }

    _onChangeOperator(scope) {
        const emptyOperator = FilterHelper.listOperator.Empty.value;
        const input = scope.parentElement.nextSibling;
        if(scope.value == emptyOperator) {
            input.disabled = true;
        } else {
            input.disabled = false;
        }
    }

    _onChangeInput(scope) {
        console.log(scope.value);
    }

    _onClickTitle(title) {
        const btnSearch = document.querySelector('.button-search-filter');

        let indexFilter = null;
        const classList = title.classList;

        for(const item in classList) {
            const _class = classList[item].toString();
            if(_class.includes('index-filter-')) {
                indexFilter = _class.split('-')[2];
                break;
            }
        }

        if(indexFilter) {
            const listDelete = [];
            for(const item in this._listFilter) {
                this._hideInputFilter(this._listFilter[item]);
                this._listFilter[item].titleFilter.parentElement.classList.remove(this.hideClass);
                this._listFilter[item].isActive = false;

                if(!this._listFilter[item].isSearch) {
                    listDelete.push(item);
                }
            }

            this._listFilter[parseInt(indexFilter)].inputValue.parentElement.lastElementChild.lastElementChild.innerHTML = this.buttonRemove.iconMinimize;

            const titleParent = this._listFilter[parseInt(indexFilter)].titleFilter.parentElement;
            document.querySelector(this.element.container).insertBefore(btnSearch, titleParent.nextSibling);
            btnSearch.classList.remove(this.hideClass);

            this._hideInputFilter(this._listFilter[parseInt(indexFilter)], false);
            this._listFilter[parseInt(indexFilter)].titleFilter.parentElement.classList.toggle(this.hideClass, true);
            this._listFilter[parseInt(indexFilter)].isActive = true;
            
            if(this.getListFilter().filter(item => item).length < 1) {
                this._listFilter[parseInt(indexFilter)].groupFilter.parentElement.classList.remove('ml-0');
            }

            listDelete.forEach(i => {
                console.log(i);

                this._listFilter[parseInt(i)].groupFilter.remove();
                this._listFilter[parseInt(i)].titleFilter.parentElement.remove();

                delete this._listFilter[parseInt(i)];
            });
        }
    }

    _onClickRemove(btn, type) {
        let indexFilter = null;
        const classList = type == 'form' ? 
            btn.parentElement.parentElement.parentElement.parentElement.classList : 
            btn.parentElement.classList;

        for(const item in classList) {
            const _class = classList[item].toString();
            if(_class.includes('index-filter-')) {
                indexFilter = _class.split('-')[2];
                break;
            }
        }

        if(indexFilter != undefined && indexFilter != -1) {
            const isCanRemove = this._listFilter[parseInt(indexFilter)].isSearch == false ? true : false;

            const parentGroupFilter = this._listFilter[parseInt(indexFilter)].groupFilter.parentElement;
            if(isCanRemove || type == 'title') {
                this._listFilter[parseInt(indexFilter)].groupFilter.remove();
                this._listFilter[parseInt(indexFilter)].titleFilter.parentElement.remove();

                delete this._listFilter[indexFilter];

                if(this.getListFilter().filter(item => item).length < 1) {
                    parentGroupFilter.classList.remove('ml-0');
                }

                this._event(this.getFilters());
            } else {
                this._hideInputFilter(this._listFilter[parseInt(indexFilter)]);
                // this._listFilter[parseInt(indexFilter)].groupFilter.parentElement.classList.toggle('ml-0');
                this._listFilter[parseInt(indexFilter)].titleFilter.parentElement.classList.remove(this.hideClass);
                this._listFilter[parseInt(indexFilter)].isActive = false;

                if(this.getListFilter().filter(item => item).length < 1) {
                    parentGroupFilter.classList.toggle('ml-0', true);
                }
            }
            
            if(type != 'title') {
                document.querySelector('.button-search-filter').classList.toggle(this.hideClass);
            }
        }
    }

    _onClickSearch(btn) {
        const indexFilterActive = this.getListFilter().findIndex(item => item && item.isActive);
        const filterActive = this._listFilter[indexFilterActive];
        const inputType = indexFilterActive != -1 ? filterActive.inputValue.nodeName : null;
        
        console.log({
            indexFilterActive: indexFilterActive,
            filterActive: filterActive,
            inputType: inputType
        });
        
        if(!inputType) {
            return;
        }

        const isValid = this._validationInput(filterActive);
        if(isValid) {
            const selectColumn = this._getSelectColumn(filterActive.selectColumn);
            const operator = this._getOperator(filterActive.selectOperator);
            const input = this._getInputValue(filterActive.inputValue);

            filterActive.titleFilter.innerHTML = `${selectColumn.text} ${operator.text} ${typeof input == 'object' ? input.text : input}`;
            this._hideInputFilter(filterActive);
            filterActive.titleFilter.parentElement.classList.remove(this.hideClass);
            this._listFilter[indexFilterActive].isActive = false;
            this._listFilter[indexFilterActive].isSearch = true;
            this._listFilter[indexFilterActive].groupFilter.parentElement.classList.toggle('ml-0', true);

            this.setFilter(indexFilterActive, selectColumn.value, operator.value, (typeof input == 'object' ? input.value : input));
            
            btn.parentElement.classList.toggle(this.hideClass);
            this._event(this.getFilters());
        }
    }

    _validationInput(element) {
        console.log(element);

        const value = element.inputValue.value;
        const operator = element.selectOperator.value;

        if(operator == FilterHelper.listOperator.Empty.value) {
            return true;
        }

        if(typeof value != 'string' || value.trim() == '') {
            return false;
        }

        return true;
    }

    _hideInputFilter(element, isHide = true) {
        if(isHide) {
            element.groupFilter.classList.toggle(this.hideClass, true);
        } else {
            element.groupFilter.classList.remove(this.hideClass);
        }
    }

    _getSelectColumn(selectColumnElement) {
        return {
            value: selectColumnElement.value,
            text: selectColumnElement.selectedOptions[0] ?  selectColumnElement.selectedOptions[0].text : 'Filter'
        }
    }

    _getOperator(operatorElement) {
        return {
            value: operatorElement.value,
            text: operatorElement.selectedOptions[0] ? operatorElement.selectedOptions[0].text : '='
        }
    }

    _getInputValue(inputValueElement) {
        return inputValueElement.nodeName == 'SELECT' ? {
            text: inputValueElement.selectedOptions[0].text,
            value: inputValueElement.value
        } : inputValueElement.value;
    }
    
}