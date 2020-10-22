import Swal from 'sweetalert2';
export class AlertHelper {
    constructor() {
    }

    static get AlertType() {
        return {
            Success: 'success',
            Error: 'error',
            Warning: 'warning',
            Info: 'info',
            Question: 'question'
        };
    }

    static get ToastrPosition() {
        return {
            Top: 'top',
            TopStart: 'top-start',
            TopEnd: 'top-end',
            Center: 'center',
            CenterStart: 'center-start',
            Bottom: 'bottom',
            BottomStart: 'bottom-start',
            BottomEnd: 'bottom-end'
        };
    }
    
    /**
     * Alert with sweetAlert2 style
     * @param {{
     *  title: string;
     *  message: string;
     *  type: string;
     * } | string} options
     * @returns {promise}
     */
    static Alert({
        title = null,
        message,
        type = AlertHelper.AlertType.Success
    } = {}) {
        let message_ = '';
        if(arguments.length > 0 && typeof arguments[0] === 'string') {
            message_ = arguments[0];
        } else if(arguments.length > 0 && typeof arguments[0] === 'object') {
            message_ = message;
        }

        return Swal.fire({
            icon: type,
            title: title != undefined ? title : 'Information',
            text: message_
        });
    }

    /**
     * Toastr with sweetAlert2 mixin style
     * @param {{
     *  message: string;
     *  type: string;
     *  position: string
     * } | string} options
     * @returns {promise}
     */
    static Toastr({
        message,
        type = AlertHelper.AlertType.Success,
        position = AlertHelper.ToastrPosition.TopEnd
    } = {}) {
        let message_ = '';
        if(arguments.length > 0 && typeof arguments[0] === 'string') {
            message_ = arguments[0];
        } else if(arguments.length > 0 && typeof arguments[0] === 'object') {
            message_ = message;
        }

        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        return Toast.fire({
            icon: type,
            title: message_
        });
    }

    /**
     * Confirm alert with sweetAlert2 style
     * @param {{
     *  title: string;
     *  message: string;
     *  type: string;
     * }} options 
     * @returns {promise}
     */
    static async Confirm({
        title = null,
        message = null,
        type = AlertHelper.AlertType.Question
    } = {}) {
        const confirmALert = await Swal.fire({
            title: title != undefined ? title : 'Are you sure?',
            text: message != undefined ? message : '',
            icon: type,
            showCancelButton: true,
            confirmButtonColor: '#3490dc',
            cancelButtonColor: '#e3342f',
            confirmButtonText: 'Yes'
        });
    
        return confirmALert.value != undefined ? confirmALert.value : false;
    };
}