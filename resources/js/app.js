require('./bootstrap');

import { LoadingHelper } from './libraries/loading/loading';
import { init as CollapseDetail } from './libraries/collapseDetail';
import { AlertHelper } from './libraries/alert/alert';

/** Init Global Function */
    window.Loading = (args) => LoadingHelper.showLoading(args);
    window.Shimmer = (args) => LoadingHelper.showShimmer(args);

    window.Alert = (args) => AlertHelper.Alert(args);
    window.Toastr = (args) => AlertHelper.Toastr(args);
    window.Confirm = (args) => AlertHelper.Confirm(args);
/** End Init Global Function */

window.ADD_MODE = 'Add';
window.EDIT_MODE = 'Edit';

document.addEventListener('DOMContentLoaded', function(e) {
    CollapseDetail();
});