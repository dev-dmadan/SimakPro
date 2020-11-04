import { Lookup } from "../lookup/lookup";
import { Validation } from "../validation/validation";

export class FilterHelper {
    _element;
    _event;
    _listSelectColumn;
    _listFilter = [];
    _lookups = {};
    _isRenderFilter = false;
    _isShowFilter = false;
    _isFilterFromTitle = false;
    _activeTitle = null;

    /**
     * @param {{
     *  element: {
     *      button: string;
     *      container: string;
     *  };
     *  event: (filter) => void;
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
        event = null,
        searchColumns = []
    } = {}) {
        this.element = element;
        this.event = event;
        this._listSelectColumn = searchColumns;
        
        this.init();
    }

    static get buttonStyle() {
        return {
            remove: {
                class: 'btn btn-secondary',
                icon: '<i aria-hidden="true" class="fas fa-times"></i>'
            },
            search: {
                class: 'btn btn-secondary',
                icon: '<i class="fas fa-check"></i>'
            },
            title: {
                class: 'btn btn-link-dark btn-icon',
                icon: '<i aria-hidden="true" class="fas fa-times"></i>'
            }
        };
    }

    static get defaultStyle() {
        return {
            hide: 'd-none',
            selectColumn: 'form-control',
            inputValue: 'form-control',
            title: 'mr-3 text-truncate'
        }
    }

    static get Operator() {
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
    
    static get inputType() {
        return {
            number: 'number',
            lookup: 'lookup',
            date: 'date',
            text: 'text'
        };
    }

    /**
     * @return {{
     *  button: string;
     *  container: string
     * }}
     */
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

    /**
     * @param {void} value
     */
    set event(value) {
        if(value != undefined && typeof value == 'function') {
            this._event = value;
        }
    }

    init() {
        const filterButton = document.querySelector(this.element.button);
        const container = document.querySelector(this.element.container);

        const rowContainerTitle = document.createElement('div');
        rowContainerTitle.setAttribute('class', 'row');

        const colContainerTitle = document.createElement('div');
        colContainerTitle.setAttribute('class', 'col filter-helper-container-title mb-3');
        rowContainerTitle.appendChild(colContainerTitle);

        const rowContainerFilter = document.createElement('div');
        rowContainerFilter.setAttribute('class', 'row filter-helper-container-filter');

        container.appendChild(rowContainerTitle);
        container.appendChild(rowContainerFilter);
        
        filterButton.addEventListener('click', () => {
            this.addFilter();
        });
    }

    /**
     * @return {[
     *  text: string;
     *  value: string;
     *  type: string;
     *  source: object;
     * ]}
     */
    getOptionSelectColumn() {
        return this._listSelectColumn != undefined ? this._listSelectColumn : [];
    }

    addFilter() {        
        if(!this._isRenderFilter) {
            this._renderFilter();
            this._isRenderFilter = true;
        } else {
            if(!this._isShowFilter) {
                this.showFilter(true);
            }
        }
    }

    /**
     * setFilter
     * @param {number} indexFilter 
     * @param {string} selectColumn 
     * @param {string} operator 
     * @param {any} value 
     */
    setFilter(indexFilter, selectColumn, operator, value) {
        const _selectColumn = JSON.parse(selectColumn);
        this._listFilter[indexFilter].configFilter = {
            column: _selectColumn.value,
            value: value,
            operator: operator
        };
    }

    /**
     * @return {[{
     *  column: string;
     * value: any;
     * operator: number;
     * columnRAW: string;
     * isLookup: boolean;
     * }]}
     */
    getListFilter() {
        return this._listFilter;
    }

    /**
     * @return {[
     *  column: string;
     *  value: any;
     *  operator: number;
     * ]}
     */
    getFilters() {
        const listFilter = this.getListFilter().filter(item => item && item != undefined);
        const filters = listFilter.length > 0 ? listFilter.map(item => {
            const value = item.isLookup ? 
                (item.value ? item.value.id : item.value) : item.value;
            return {
                column: item.column,
                value: value,
                operator: item.operator
            };
        }) : [];

        return filters;
    }

    /**
     * showFilter
     * @param {boolean} isShow 
     */
    showFilter(isShow = true) {
        const containerFilter = document.querySelector(`${this.element.container} .filter-helper-container-filter`);
        if(isShow) {
            this._isShowFilter = true;
            containerFilter.classList.remove(FilterHelper.defaultStyle.hide);
        } else {
            this._isShowFilter = false;
            containerFilter.classList.toggle(FilterHelper.defaultStyle.hide);
        }

        this.resetFilter();
    }

    resetFilter() {
        const parent = document.querySelector(`${this.element.container} .filter-helper-container-filter`);
        const parentSelectColumn = parent.firstElementChild;
        const parentGroupInput = parent.lastElementChild;

        // reset select column
        const selectColumn = parentSelectColumn.lastElementChild.querySelector('.form-control');
        selectColumn.selectedIndex = 0;
        selectColumn.dispatchEvent(new Event('change'));

        // reset select operator
        const selectOperator = parentGroupInput.lastElementChild.querySelector('.input-group .input-group-prepend');
        selectOperator.selectedIndex = 0;
        selectOperator.dispatchEvent(new Event('change'));

        // clear all lookup
        Object.keys(this._lookups).forEach(lookup => {
            this._lookups[lookup].setValue(null);
        });

        // clear input
        const inputValue = parentGroupInput.lastElementChild.querySelector('.input-group .input-value');
        if(inputValue) {
            inputValue.value = '';
        }
    }
    
    _renderFilter() {
        const containerFilter = document.querySelector(`${this.element.container} .filter-helper-container-filter`);
        const selectColumn = this._renderSelectColumn();
        const selectFirstOption = JSON.parse(selectColumn.querySelector('select').value);
        const optionLookup = selectFirstOption && selectFirstOption.source && selectFirstOption.type == FilterHelper.inputType.lookup ? 
            selectFirstOption : null;
        const groupInputValue = this._renderGroupInputValue(selectFirstOption.type, selectFirstOption.value);

        if(optionLookup) {
            const inputValue = groupInputValue.querySelector('.form-group .input-group .input-value');
            this._renderLookup(inputValue, selectFirstOption.value, optionLookup);
        }
        
        containerFilter.appendChild(selectColumn);
        containerFilter.appendChild(groupInputValue);
        this._isShowFilter = true;
    }

    /**
     * _renderSelectColumn
     * Render select column yang ingin difilter
     * @return {HTMLElement}
     */
    _renderSelectColumn() {
        const divCol = document.createElement('div');
        divCol.setAttribute('class', 'col-4');

        const divForm = document.createElement('div');
        divForm.setAttribute('class', 'form-group');

        const select = document.createElement('select');
        select.setAttribute('class', FilterHelper.defaultStyle.selectColumn);
        
        this.getOptionSelectColumn().forEach(item => {
            const option = new Option(item.text, JSON.stringify(item), false, false);
            select.append(option);
        });

        select.addEventListener('change', (e) => this._onChangeSelectColumn(e.target.value));

        divForm.appendChild(select);
        divCol.appendChild(divForm);

        return divCol;
    }

    /**
     * _onChangeSelectColumn
     * @param {string} selectValue
     */
    _onChangeSelectColumn(selectValue) {
        const value = JSON.parse(selectValue);
        const optionLookup = value && value.type == FilterHelper.inputType.lookup && value.source ? 
            value : null;

        const newSelectOperator = this._renderOperator(value.type);
        const newInputValue = this._renderInputValue(value.type, optionLookup ? optionLookup.value: null);
        const parentOldInput = document.querySelector(`${this.element.container} .filter-helper-container-filter`).lastElementChild;
        const divActionButton = parentOldInput.lastElementChild.lastElementChild.querySelector('.input-group-append');
        const oldDefaultInputValue = parentOldInput.lastElementChild.querySelector('.input-group .input-value');
        const oldSelectOperator = parentOldInput.lastElementChild.querySelector('.input-group .input-group-prepend .input-group-text');

        if(optionLookup) {
            if(!this._lookups.hasOwnProperty(optionLookup.value)) {
                if(oldDefaultInputValue) {
                    parentOldInput.lastElementChild.lastElementChild.replaceChild(newInputValue, oldDefaultInputValue);
                } else {
                    this._showLookupFilter(null, false);
                    parentOldInput.lastElementChild.lastElementChild.insertBefore(newInputValue, divActionButton);
                }

                this._renderLookup(newInputValue, optionLookup.value, optionLookup);
            } else {
                if(oldDefaultInputValue) {
                    oldDefaultInputValue.parentNode.removeChild(oldDefaultInputValue);
                }

                this._showLookupFilter(null, false);
                this._showLookupFilter(optionLookup.value, true);
            }   
        } else {
            if(!oldDefaultInputValue) {
                this._showLookupFilter(null, false);
                parentOldInput.lastElementChild.lastElementChild.insertBefore(newInputValue, divActionButton);
            } else {
                parentOldInput.lastElementChild.lastElementChild.replaceChild(newInputValue, oldDefaultInputValue);
            }
        }

        oldSelectOperator.removeEventListener('change', this._onChangeOperator);
        oldSelectOperator.parentNode.replaceChild(newSelectOperator, oldSelectOperator);
    }

    /**
     * _renderGroupInputValue
     * Render group element operator dan input value untuk filter
     * Jika inputType lookup maka akan memanggil library lookup
     * @param {string} inputType 
     * @param {object} lookupOption 
     */
    _renderGroupInputValue(inputType, lookupName = null) {
        const divCol = document.createElement('div');
        divCol.setAttribute('class', 'col-8');

        const divForm = document.createElement('div');
        divForm.setAttribute('class', 'form-group');
        
        const divGroupInput = document.createElement('div');
        divGroupInput.setAttribute('class', 'input-group');

        const divSelectOperator = document.createElement('div');
        divSelectOperator.setAttribute('class', 'input-group-prepend');

        const selectOperator = this._renderOperator();
        divSelectOperator.appendChild(selectOperator);

        const inputValue = this._renderInputValue(inputType, lookupName);

        const divActionButton = document.createElement('div');
        divActionButton.setAttribute('class', 'input-group-append');

        const actionButton = this._renderActionButton();
        divActionButton.appendChild(actionButton.remove);
        divActionButton.appendChild(actionButton.search);

        divGroupInput.appendChild(divSelectOperator);
        divGroupInput.appendChild(inputValue);
        divGroupInput.appendChild(divActionButton);
        
        divForm.appendChild(divGroupInput);
        divCol.appendChild(divForm);

        return divCol;
    }
    
    /**
     * _renderOperator
     * @param {string} inputType 
     */
    _renderOperator(inputType) {
        const select = document.createElement('select');
        select.setAttribute('class', `${FilterHelper.defaultStyle.inputValue} input-group-text`);
        select.setAttribute('style', 'background-color: unset');

        let listOptions;
        switch (inputType) {
            case 'number':
                listOptions = [
                    FilterHelper.Operator.Equal, FilterHelper.Operator.NotEqual,
                    FilterHelper.Operator.Greater, FilterHelper.Operator.GreateOrEqual,
                    FilterHelper.Operator.Less, FilterHelper.Operator.LessOrEqual
                ];
                break;

            case 'lookup':
                listOptions = [
                    FilterHelper.Operator.Equal, FilterHelper.Operator.NotEqual,
                    FilterHelper.Operator.Empty
                ];
                break;

            case 'date':
                listOptions = [
                    FilterHelper.Operator.Equal, FilterHelper.Operator.NotEqual,
                    FilterHelper.Operator.Greater, FilterHelper.Operator.GreateOrEqual,
                    FilterHelper.Operator.Less, FilterHelper.Operator.LessOrEqual,
                    FilterHelper.Operator.Empty
                ];
                break;
            
            case 'text':
            default:
                listOptions = [
                    FilterHelper.Operator.Equal, FilterHelper.Operator.NotEqual,
                    FilterHelper.Operator.Contain, FilterHelper.Operator.NotContain,
                    FilterHelper.Operator.Empty
                ];
                break;
        }

        listOptions.forEach(item => {
            const option = new Option(item.symbol, item.value, false, false);
            select.append(option);
        });

        select.addEventListener('change', (e) => this._onChangeOperator(e.target));

        return select;
    }

    /**
     * _onChangeOperator
     * @param {HTMLElement} scope 
     */
    _onChangeOperator(scope) {
        const emptyOperator = FilterHelper.Operator.Empty.value;
        const parent = document.querySelector(`${this.element.container} .filter-helper-container-filter`);
        const parentGroupInput = parent.lastElementChild;
        const defaultInputValue = parentGroupInput.lastElementChild.querySelector('.input-group .input-value');
        const isLookup = defaultInputValue == null ? true : false;
        
        let inputValue;
        if(isLookup) {
            const temp = this._getActiveLookup();
            inputValue = temp.element;
            if(scope.value == emptyOperator) {
                temp.lookup.setValue(null);
                inputValue.disabled = true;
            } else {
                inputValue.disabled = false;
            }
        } else {
            inputValue = defaultInputValue;
            if(scope.value == emptyOperator) {
                inputValue.value = '';
                inputValue.disabled = true;
            } else {
                inputValue.disabled = false;
            } 
        }
    }

    /**
     * _renderInputValue
     * @param {string} inputType 
     * @param {string} lookupName
     * @return {HTMLElement} 
     */
    _renderInputValue(inputType, lookupName = null) {
        let inputColumn;  
        switch (inputType) {
            case FilterHelper.inputType.number:
                inputColumn = document.createElement('input');
                inputColumn.setAttribute('type', 'number');
                inputColumn.setAttribute('class', `${FilterHelper.defaultStyle.inputValue} input-value`);

                break;

            case FilterHelper.inputType.lookup:
                inputColumn = document.createElement('select');
                inputColumn.setAttribute('class', `${FilterHelper.defaultStyle.inputValue} input-value-lookup input-value-${lookupName ? lookupName : ''}`);

                break;

            case FilterHelper.inputType.date:
            case FilterHelper.inputType.text:
            default:
                inputColumn = document.createElement('input');
                inputColumn.setAttribute('type', 'text');
                inputColumn.setAttribute('class', `${FilterHelper.defaultStyle.inputValue} input-value`);
                break;
        }

        return inputColumn;
    }

    /**
     * _renderLookup
     * @param {string} inputValue 
     * @param {string} lookupName 
     * @param {{
     *  text: string;
     *  source: object;
     * }} lookupOption 
     */
    _renderLookup(inputValue, lookupName, lookupOption) {        
        if(!this._lookups.hasOwnProperty(lookupName)) {
            this._lookups[lookupName] = new Lookup({
                element: inputValue,
                placeholder: `Choose ${lookupOption.text}`,
                sourceData: lookupOption.source
            });
        }
    }

    /**
     * @return {{
     *  remove: HTMLElement
     *  search: HTMLElement
     * }}
     */
    _renderActionButton() {
        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', FilterHelper.buttonStyle.remove.class);
        removeButton.setAttribute('type', 'button');
        removeButton.innerHTML = FilterHelper.buttonStyle.remove.icon;
        removeButton.addEventListener('click', () => this._onClickActionRemove());

        const searchButton = document.createElement('button');
        searchButton.setAttribute('class', FilterHelper.buttonStyle.search.class);
        searchButton.setAttribute('type', 'button');
        searchButton.innerHTML = FilterHelper.buttonStyle.search.icon;
        searchButton.addEventListener('click', () => this._onClickActionSearch());

        return {
            remove: removeButton,
            search: searchButton
        };
    }

    _onClickActionRemove() {        
        this.showFilter(false);
        if(this._isFilterFromTitle) {
            document.querySelector(`${this.element.container} .filter-helper-container-title .${this._activeTitle}`).classList.remove(FilterHelper.defaultStyle.hide);
        }

        this._isFilterFromTitle = false;
    }

    _onClickActionSearch() {
        // get data
        const parent = document.querySelector(`${this.element.container} .filter-helper-container-filter`);
        const parentGroupInput = parent.lastElementChild;
        const selectColumn = parent.firstElementChild.lastElementChild.querySelector(`.${FilterHelper.defaultStyle.selectColumn}`);
        const selectOperator = parentGroupInput.lastElementChild.querySelector('.input-group .input-group-prepend .input-group-text');
        const defaultInputValue = parentGroupInput.lastElementChild.querySelector('.input-group .input-value');
        const isLookup = defaultInputValue == null ? true : false;
        const activeLookup = isLookup ? this._getActiveLookup() : null;
        const lookupValue = activeLookup ? activeLookup.lookup.getValue() : null;
        
        const selectColumnValue = JSON.parse(selectColumn.value);
        const column = selectColumnValue.value;
        const operator = selectOperator.value;
        const operatorText = selectOperator.options[selectOperator.selectedIndex].text;
        const value = defaultInputValue ? defaultInputValue.value : lookupValue;
        
        let isValid = true;
        if(operator != FilterHelper.Operator.Empty.value) {
            if(isLookup) {
                isValid = Validation.isLookup(value) ? true : false;
            } else {
                isValid = Validation.isString(value) && !Validation.isStringNullOrEmpty(value) ? true : false;
            }
        }

        if(!isValid) {
            return;
        }

        if(this._isFilterFromTitle) {
            // edit data list
            const activeTitleSplit = this._activeTitle.split('-');
            const indexFilter = activeTitleSplit.length > 1 ? activeTitleSplit[2] : null;
            if(indexFilter) {
                this._listFilter[parseInt(indexFilter)] = {
                    columnRAW: selectColumn.value,
                    column: column,
                    operator: operator,
                    value: value,
                    isLookup: isLookup
                };
            }

            // edit title
            const titleActive = document.querySelector(`${this.element.container} .filter-helper-container-title .${this._activeTitle}`);
            titleActive.firstChild.textContent = FilterHelper.Operator.Empty.symbol != operatorText ? 
                `${selectColumnValue.text} ${operatorText} ${lookupValue ? lookupValue.name : value}` : 
                `${selectColumnValue.text} is ${operatorText}`;
            titleActive.classList.remove(FilterHelper.defaultStyle.hide);
        } else {
            // push data ke list
            this._listFilter.push({
                columnRAW: selectColumn.value,
                column: column,
                operator: operator,
                value: value,
                isLookup: isLookup
            });

            // render title
            const containerTitle = document.querySelector(`${this.element.container} .filter-helper-container-title`);
            containerTitle.appendChild(this._renderTitleFilter(selectColumnValue.text, operatorText, lookupValue ? lookupValue.name : value));
        }

        // hide filter
        this.showFilter(false);
        this._isFilterFromTitle = false;
        this._event(this.getFilters());
    }

    /**
     * _renderTitleFilter
     * @param {string} column 
     * @param {string} operator 
     * @param {string} value 
     * @return {HTMLElement}
     */
    _renderTitleFilter(column, operator, value) {
        const indexFilter = this._listFilter && this._listFilter.length > 0 ? this._listFilter.length - 1 : 0;

        const span = document.createElement('span');
        span.setAttribute('class', `index-filter-${indexFilter} ${FilterHelper.defaultStyle.title}`);
        span.setAttribute('style', 'max-width: 200px');
        span.innerText = FilterHelper.Operator.Empty.symbol != operator ? `${column} ${operator} ${value}` : `${column} is ${operator}`;
        span.addEventListener('click', (e) => this._onClickTitleFilter(e.target));
        
        const button = document.createElement('button');
        button.setAttribute('class', FilterHelper.buttonStyle.title.class);
        button.innerHTML = FilterHelper.buttonStyle.title.icon;
        button.addEventListener('click', (e) => this._onClickRemoveTitle(e.target));

        span.appendChild(button);

        return span;
    }

    /**
     * _onClickTitleFilter
     * @param {HTMLElement} scope 
     */
    _onClickTitleFilter(scope) {
        if(scope.nodeName != 'SPAN') {
            return;
        }

        if(this._isShowFilter) {
            document.querySelector(`${this.element.container} .filter-helper-container-title .${this._activeTitle}`).classList.remove(FilterHelper.defaultStyle.hide);
        }

        let indexFilter;
        const classList = scope.classList;
        classList.forEach(_class => {
            if(_class.includes('index-filter-')) {
                let _classSplit = _class.split('-');
                indexFilter = _classSplit.length > 1 ? _classSplit[2] : null;
            }
        });
        
        scope.classList.toggle(FilterHelper.defaultStyle.hide, true);
        this._activeTitle = indexFilter ? `index-filter-${indexFilter}` : null;
        this._isFilterFromTitle = true;
        this.showFilter(true);

        const indexFilterValue = this._listFilter[parseInt(indexFilter)];
        const parent = document.querySelector(`${this.element.container} .filter-helper-container-filter`);
        const selectColumn = parent.firstElementChild.lastElementChild.querySelector(`.${FilterHelper.defaultStyle.selectColumn}`);

        for(let i = 0, j = selectColumn.options.length; i < j; ++i) {
            const parseValue = JSON.parse(selectColumn.options[i].value);
            if(parseValue.value === indexFilterValue.column) {
                selectColumn.selectedIndex = i;
                break;
            }
        }
        this._onChangeSelectColumn(indexFilterValue.columnRAW);

        const parentGroupInput = parent.lastElementChild;
        const selectOperator = parentGroupInput.lastElementChild.querySelector('.input-group .input-group-prepend .input-group-text');
        selectOperator.value = indexFilterValue.operator;

        // set input value
        if(indexFilterValue.isLookup) {
            this._lookups[indexFilterValue.column].setValue(indexFilterValue.value);
        } else {
            parentGroupInput.lastElementChild.querySelector('.input-group .input-value').value = indexFilterValue.value;
        }
    }

    /**
     * _onClickRemoveTitle
     * @param {HTMLElement} scope 
     */
    _onClickRemoveTitle(scope) {
        if(!(scope.nodeName == 'BUTTON' || scope.nodeName == 'I')) {
            return;
        }

        let indexFilter;
        const classList = scope.nodeName == 'BUTTON' ? scope.parentNode.classList : scope.parentNode.parentNode.classList;
        classList.forEach(_class => {
            if(_class.includes('index-filter-')) {
                let _classSplit = _class.split('-');
                indexFilter = _classSplit.length > 1 ? _classSplit[2] : null;
            }
        });

        // hapus event listener ti title dan button
        const isButton = scope.nodeName == 'BUTTON' ? true : false;
        const button = isButton ? scope : scope.parentNode;
        const title = isButton ? scope.parentNode : scope.parentNode.parentNode;

        button.removeEventListener('click', this._onClickRemoveTitle);
        title.removeEventListener('click', this._onClickTitleFilter);
        title.remove(title);

        // hapus di list
        delete this._listFilter[parseInt(indexFilter)];
        this._event(this.getFilters());
    }

    /**
     * _showLookupFilter
     * @param {string} lookupName 
     * @param {boolean} isShow 
     */
    _showLookupFilter(lookupName = null, isShow = true) {
        const inputValueLookup = !lookupName ? 
            document.querySelectorAll(`${this.element.container} .filter-helper-container-filter .input-value-lookup`) : 
            document.querySelector(`${this.element.container} .filter-helper-container-filter .input-value-${lookupName}`);
        if(!lookupName) {
            inputValueLookup.forEach(item => {
                if(isShow) {
                    item.nextElementSibling.classList.remove(FilterHelper.defaultStyle.hide);
                } else {
                    item.nextElementSibling.classList.toggle(FilterHelper.defaultStyle.hide, true);
                }
            });
        } else {
            if(isShow) {
                inputValueLookup.nextElementSibling.classList.remove(FilterHelper.defaultStyle.hide);
            } else {
                inputValueLookup.nextElementSibling.classList.toggle(FilterHelper.defaultStyle.hide, true);
            }
        }
    }

    /**
     * @return {{
     *  element: HTMLElement
     *  lookup: Lookup
     * }}
     */
    _getActiveLookup() {
        const inputValueLookup = document.querySelectorAll(`${this.element.container} .filter-helper-container-filter .input-value-lookup`);
        let lookupName;

        inputValueLookup.forEach(item => {
            const isShow = item.nextElementSibling.classList.contains(FilterHelper.defaultStyle.hide) ? false : true;

            if(isShow) {
                const classList = item.classList;
                classList.forEach(_class => {
                    if(_class.includes('input-value-')) {
                        let _classSplit = _class.split('-');
                        lookupName = _classSplit.length > 1 ? _classSplit[2] : null;
                    }
                });
            }
        });

        return {
            element: document.querySelector(`${this.element.container} .filter-helper-container-filter .input-value-${lookupName}`),
            lookup: this._lookups[lookupName]
        };
    }
}