import Swal from 'sweetalert2';
export class AlertHelper {
    constructor() {
    }

    /** Alert Type */
        static get Success() {
            return 'success';
        }
        
        static get Error() {
            return 'error';
        }

        static get Warning() {
            return 'warning';
        }

        static get Info() {
            return 'info';
        }

        static get Question() {
            return 'question';
        }
    /** End Alert Type */

    /** Toastr Position */
        static get Top() {
            return 'top';
        }

        static get TopStart() {
            return 'top-start';
        }

        static get TopEnd() {
            return 'top-end';
        }

        static get Center() {
            return 'center'
        }

        static get CenterStart() {
            return 'center-start';
        }

        static get Bottom() {
            return 'bottom';
        }

        static get BottomStart() {
            return 'bottom-start';
        }

        static get BottomEnd() {
            return 'bottom-end';
        }
    /** End Toastr Position */
    
    /**
     * Alert with sweetAlert2 style
     * @param {string} title 
     * @param {string} message
     * @param {string} type
     * @returns {void}
     */
    static Alert({
        title = null,
        message,
        type = AlertHelper.Success
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
     * @param {string} message 
     * @param {string} type
     * @param {string} position
     * @returns {void}
     */
    static Toastr({
        message,
        type = AlertHelper.Success,
        position = AlertHelper.TopEnd
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
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        return Toast.fire({
            icon: type,
            title: message_
        })
    }

    /**
     * Confirm alert with sweetAlert2 style
     * @param {string} title
     * @param {string} message
     * @param {string} type 
     */
    static async Confirm({
        title = null,
        message = null,
        type = AlertHelper.Question
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