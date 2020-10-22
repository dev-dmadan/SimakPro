# Filter Helper

## How to Use
```js
import { FilterHelper } from "../libraries/Filter/filterHelper.js";

new FilterHelper({

    /**
     * Optional
     * Secara otomatis sudah terdeclare jika penggunaan filter ada di section
     * Jika ingin menerapkan di detail, harap disesuaikan
     * @param {string} element.button Element untuk trigger Add Filter
     * @param {string} element.container Element untuk penampung filter
     */
    element: {
        button: '#filters_folders_add_filters'
        container: '.filter_folder_list'
    },
    
    /**
     * Optional
     * Event trigger saat button remove / search filters di click
     * @param {array} filters
     */
    event: (filters) => {

        // contoh kasus, saat ada pencarian / penambahan / penghapusan di filter maka dataTable akan direload dan disesuaikan filternya
        dataTable.setFilter(filters);
    },

    /**
     * List search kolum
     * Berupa array of object
     * @param {string} searchColumn.text Nama yang dimunculkan di option
     * @param {string} searchColumn.value Value di option
     * @param {string} searchColumn.type Jenis input untuk kolom yang dipilih (text, number, date, dan lookup)
     * @param {object} searchColumn.source Khusus untuk type lookup. Option untuk integrasi dengan library lookup
     */
    searchColumns: [
        {
            text: 'Name',
            value: 'name',
            type: 'text'
        },
        {
            text: 'Primary Phone',
            value: 'primary_phone',
            type: 'text'
        },
        {
            text: 'Type',
            value: 'account_type_id',
            type: 'lookup',
            source: {
                serverSide: {
                    uri: 'lookups/account-type'
                }
            }
        }
    ]
});
```