require('./bootstrap');

import { LoadingHelper } from './libraries/loading/loading';
import { init as CollapseDetail } from './libraries/collapseDetail';

/** Init Global Function */
    window.Loading = (args) => LoadingHelper.showLoading(args);
    window.Shimmer = (args) => LoadingHelper.showShimmer(args);
/** End Init Global Function */

window.ADD_MODE = 'Add';
window.EDIT_MODE = 'Edit';

document.addEventListener('DOMContentLoaded', function(e) {
    CollapseDetail();
});