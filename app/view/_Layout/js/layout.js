const __ToastSwal = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

/**
 * 
 */
async function getAccessRight(module) {
    const result = {
        success: false,
        message: '',
        accessRight: null
    };

    try {
        const setup = {
            method: 'POST',
            body: JSON.stringify({
                userId: USER_DATA.UserId,
                userName: USER_DATA.UserName
            })
        };
        if(USE_JWT) {
            setup.headers = new Headers({
                'Authorization': `Bearer ${getCookieValue(QUERY_STRING_AUTH)}`
            });
        }
        const request = await fetch(`${SITE_URL}${module}/get/access-right`, setup);
        const data = await request.json();

        result.accessRight = data;
        result.success = true;
    } 
    catch (error) {
        result.message = error;
    }

    return result;
}

/**
 * Method toast
 * Show toast swall in right top
 * @param {string} type default info. info | warning | success | error | question 
 * @param {string} message 
 * @param {string} toast_ default swal. swal | default
 */
function toast(type = 'info', message = '', toast_ = 'swal') {
    if(toast_ == 'swal') {
        __ToastSwal.fire({
            icon: type,
            title: message
        });
    }
    else {
        switch (type.toLowerCase()) {
            case 'info':
                toastr.info(message);
                break;

            case 'success':
                toastr.success(message);
                break;

            case 'error':
                toastr.error(message);
                break;

            case 'warning':
                toastr.warning(message);
                break;
        
            default:
                toastr.info(message);
                break;
        }
    }
}

/**
 * 
 */
function loadingCard(cardSelector, isLoading = true) {
    if(isLoading) {
        const nodeDiv = document.createElement("DIV");
        nodeDiv.className = 'overlay d-flex justify-content-center align-items-center';

        const nodeI = document.createElement("I");
        nodeI.className = 'fas fa-2x fa-sync fa-spin';

        nodeDiv.appendChild(nodeI);
        cardSelector.appendChild(nodeDiv);

        return;
    }

    cardSelector.removeChild(cardSelector.lastElementChild);
}

/**
 * Method loadingButton
 * Make button disable and show loading animation
 * @param {object} buttonSelector
 * @param {boolean} isLoading default is true
 */
function loadingButton(buttonSelector, isLoading = true) {
    if(isLoading) {
        const node = document.createElement("SPAN");
        const role = document.createAttribute("role");
        const ariaHidden = document.createAttribute("aria-hidden");

        role.value = "status";
        ariaHidden.value = "true";
        
        node.className = 'spinner-grow spinner-grow-sm';
        node.setAttributeNode(role);
        node.setAttributeNode(ariaHidden);

        buttonSelector.disabled = true;
        buttonSelector.appendChild(node);    

        return;
    }
    
    buttonSelector.disabled = false;
    buttonSelector.removeChild(buttonSelector.children[0]);
}

/**
 * Method setSidebar
 */
function setSidebar() {
    if(!SIDEBAR_LIST || SIDEBAR_LIST.length < 1) {
        return;
    }

    const _siteUrl = SITE_URL.substring(0, (SITE_URL.length-1));
    const sidebar = document.querySelector('#__sidebar');
    SIDEBAR_LIST.forEach(item => {
        const isActive = window.location.href == (_siteUrl+item.router) ? true : false;
        const liClassName = isActive ? 'nav-item menu-open' : 'nav-item';
        const aClassName = isActive ? 'nav-link active' : 'nav-link';
        const icon = (!item.icon || item.icon.trim() == '') ? 'far fa-circle' : item.icon;
        let li = document.createElement('li');
        li.className = liClassName;
        let liValue =   `<a href="${_siteUrl}${item.router}" class="${aClassName}">` +
                                `<i class="nav-icon ${icon}"></i>` +
                                `<p>${item.title}</p></a>`;
        li.innerHTML = liValue;
        sidebar.appendChild(li);
    });
}

/**
 * Method getCookieValue
 * Get cookies value by cookie name
 * @param {string} cookieName
 * @return {string} cookieValue
 */
function getCookieValue(cookieName) {
    const ccokie = document.cookie.match('(^|[^;]+)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
    
    return ccokie ? ccokie.pop() : '';
}

/**
 * 
 */
function setLookupValue(lookup) {
    let result = '';
    if(!lookup.id || !lookup.value) {
        return result;
    }
    
    if(lookup.target && lookup.target.trim() != '') {
        result = `<a target="_blank" href="${SITE_URL}${lookup.target}/${lookup.id}">${lookup.value}</a>`;
    }
    else {
        result = lookup.value;
    }

    return result;
}

/**
 * 
 */
function setButtonAction(access) {
    let result = '';
    if(!access.id || !access.accessList) {
        return result;
    }

    if(access.id.trim() == '') {
        return result;
    }

    const buttonView = access.accessList.isCanRead ? `<button type="button" class="btn btn-sm btn-flat btn-primary btn-view" value="${access.id}"><i class="far fa-eye"></i></button>` : '';
    const buttonEdit = access.accessList.isCanUpdate ? `<button type="button" class="btn btn-sm btn-flat btn-success btn-edit" value="${access.id}"><i class="far fa-edit"></i></button>` : '';
    const buttonDelete = access.accessList.isCanDelete ? `<button type="button" class="btn btn-sm btn-flat btn-danger btn-delete" value="${access.id}"><i class="far fa-trash-alt"></i></button>` : '';
    result = `<div class="btn-group">${buttonView}${buttonEdit}${buttonDelete}</div>`;

    return result;
}

/**
 * Method populateLookup
 * @param {array} lookupList
 *                      lookupList.selector {object}
 *                      lookupList.lookupName {string}
 *                      lookupList.filter {object}
 */
async function populateLookup(lookupList) {
    const requestList = [];
    lookupList.forEach(item => {
        const setup = {
            method: 'POST',
            body: JSON.stringify(item.filter ? item.filter : {})
        };
        if(USE_JWT) {
            setup.headers = new Headers({
                'Authorization': `Bearer ${getCookieValue(QUERY_STRING_AUTH)}`
            });
        }

        const request = fetch(`${SITE_URL}lookup/${item.lookupName}`, setup)
        .then(res => res.json());
        
        requestList.push(request);
    });
    const response = await Promise.all(requestList);

    response.forEach((item, index) => {
        const selector = lookupList[index].selector;
        item.forEach(element => {
            const opt = document.createElement('option');
            opt.innerHTML = element.name;
            opt.value = element.id;
            selector.appendChild(opt);
        });
        $(`#${selector.id}`).val(null).trigger('change');
    });
}

/**
 * Method goBack
 * Go to previous page
 */
function goBack() {
    window.history.go(-1);
}

export {getAccessRight, goBack, toast, loadingCard, loadingButton, setSidebar, getCookieValue, setLookupValue, setButtonAction, populateLookup};