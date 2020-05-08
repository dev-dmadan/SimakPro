import { setLookupValue, setButtonAction } from '../../_Layout/js/layout.js';

const languageSetup = {
    indonesia: {
        lengthMenu: "Tampilkan _MENU_ data/page",
        zeroRecords: "Data Tidak Ada",
        info: "Menampilkan _START_ s.d _END_ dari _TOTAL_ data",
        infoEmpty: "Menampilkan 0 s.d 0 dari 0 data",
        search: "Pencarian:",
        loadingRecords: "Loading...",
        processing: "Processing...",
        paginate: {
            first: "Pertama",
            last: "Terakhir",
            next: "Selanjutnya",
            previous: "Sebelumnya"
        }
    }
};

/**
 * Method getDefaultDatatable
 * @param {object} serverSideSetup default null
 *                  serverSideSetup.ajax {object}
 *                      ajax.url {string}
 *                      ajax.type {string}
 *                      ajax.data {object}
 * @param {object} lengthSetup default null
 *                  lengthSetup.lengthMenu {array} default [10, 25, 75, 100]
 *                  lengthSetup.pageLength {int} default 10
 * @param {array of object} columnDefsSetup default null
 * @param {object} languageSetup default null
 *                  languageSetup.lengthMenu {string}
 *                  languageSetup.zeroRecords {string}
 *                  languageSetup.info {string}
 *                  languageSetup.infoEmpty {string}
 *                  languageSetup.search {string}
 *                  languageSetup.loadingRecords {string}
 *                  languageSetup.processing {string}
 *                  languageSetup.paginate {object}
 *                      paginate.first {string}
 *                      paginate.last {string}
 *                      paginate.next {string}
 *                      paginate.previous {string}
 */
function getDefaultDatatable(serverSideSetup = null, lengthSetup = null, columnDefsSetup = null, languageSetup = null) {
    const config = {};
    
    try {
        if(serverSideSetup && typeof serverSideSetup == 'object') {
            config.processing = true;
            config.serverSide = true;
            config.ajax = {
                url: serverSideSetup.ajax.url,
                type: serverSideSetup.ajax.type,
                data: serverSideSetup.ajax.data ? serverSideSetup.ajax.data : {}
            }
        }

        if(lengthSetup && typeof lengthSetup == 'object') {
            config.lengthMenu = (lengthSetup.lengthMenu == 'object' && lengthSetup.lengthMenu.length > 0) ? lengthSetup.lengthMenu.length : [10, 25, 75, 100];
            config.pageLength = lengthSetup.pageLength ? lengthSetup.pageLength : 10;
        }
        else {
            config.lengthMenu = [10, 25, 75, 100];
            config.pageLength = 10;
        }

        if(columnDefsSetup && typeof columnDefsSetup == 'object' && columnDefsSetup.length > 0) {
            config.columnDefs = columnDefsSetup;
        }

        if(languageSetup && typeof languageSetup == 'object') {
            config.language = {};
            if(languageSetup.lengthMenu) {
                config.language.lengthMenu = languageSetup.lengthMenu;
            }

            if(languageSetup.zeroRecords) {
                config.language.zeroRecords = languageSetup.zeroRecords;
            }

            if(languageSetup.info) {
                config.language.info = languageSetup.info;
            }

            if(languageSetup.infoEmpty) {
                config.language.infoEmpty = languageSetup.infoEmpty;
            }

            if(languageSetup.search) {
                config.language.search = languageSetup.search;
            }

            if(languageSetup.loadingRecords) {
                config.language.loadingRecords = languageSetup.loadingRecords;
            }

            if(languageSetup.processing) {
                config.language.processing = languageSetup.processing;
            }

            if(languageSetup.paginate) {
                config.language.paginate = {};
                if(languageSetup.paginate.first) {
                    config.language.paginate.first = languageSetup.paginate.first;
                }

                if(languageSetup.paginate.last) {
                    config.language.paginate.last = languageSetup.paginate.last;
                }

                if(languageSetup.paginate.next) {
                    config.language.paginate.next = languageSetup.paginate.next;
                }

                if(languageSetup.paginate.previous) {
                    config.language.paginate.previous = languageSetup.paginate.previous;
                }
            }
        }

        config.autoWidth = false;
        config.responsive = true;
    } 
    catch (error) {
        console.error(new Error(error));    
    }
    
    return config;
}

/**
 * Method renderData
 */
function renderData(row, data) {
    data.forEach((item, index) => {
        if(item && typeof item === 'object') {
            let tdValue = '';
            if(item.lookup) {
                tdValue = setLookupValue(item.lookup);
            }
            else if(item.access) {
                tdValue = setButtonAction(item.access);
            }
            
            $(`td:eq(${index})`, row).html(tdValue);
        }
    });
}

export {languageSetup, getDefaultDatatable, renderData};