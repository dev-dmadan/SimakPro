require('./bootstrap');

import { AlertHelper } from './libraries/alert/alert';

/** Init Global Function */
    window.Alert = (args) => AlertHelper.Alert(args);
    window.Toastr = (args) => AlertHelper.Toastr(args);
    window.Confirm = (args) => AlertHelper.Confirm(args);
/** End Init Global Function */