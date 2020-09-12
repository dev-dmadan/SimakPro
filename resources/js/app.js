require('./bootstrap');

import { AlertHelper } from './libraries/alert/alert';
import { LoadingHelper } from './libraries/loading/loading';
import { init as CollapseDetail } from './libraries/collapseDetail';

/** Init Global Function */
    window.Alert = (args) => AlertHelper.Alert(args);
    window.Toastr = (args) => AlertHelper.Toastr(args);
    window.Confirm = (args) => AlertHelper.Confirm(args);

    window.Loading = (args) => LoadingHelper.showLoading(args);
    window.Shimmer = (args) => LoadingHelper.showShimmer(args);
/** End Init Global Function */

window.ADD_MODE = 'Add';
window.EDIT_MODE = 'Edit';

document.addEventListener('DOMContentLoaded', function(e) {
    CollapseDetail();
});