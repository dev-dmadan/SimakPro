const COLLAPSE_DOWN = {
    ICON: 'far fa-caret-square-down',
    COLOR: 'black'
};
const COLLAPSE_RIGHT = {
    ICON: 'far fa-caret-square-right',
    COLOR: 'black'
};

export function init() {
    const collapse_detail = document.querySelectorAll('.collapse-detail');
    if(collapse_detail && collapse_detail.length > 0) {
        const collapseLength = collapse_detail.length;
        for (let i = 0; i < collapseLength; i++) {
            collapse_detail[i].addEventListener('click', function(e) {
                e.preventDefault();

                const icon = this.children[0];
                const iconClassName = icon.className;
                
                const addButton = this.nextElementSibling != null ? this.nextElementSibling : null;
                const menuAction = addButton != null ? (addButton.nextElementSibling != null ? addButton.nextElementSibling : this.nextElementSibling) : null;

                icon.className = iconClassName.includes(COLLAPSE_DOWN.ICON) ? `${COLLAPSE_RIGHT.ICON} mr-2` : `${COLLAPSE_DOWN.ICON} mr-2`;
                icon.style.color = iconClassName.includes(COLLAPSE_DOWN.ICON) ? `${COLLAPSE_RIGHT.COLOR} mr-2` : `${COLLAPSE_DOWN.COLOR} mr-2`;

                if(addButton != null && iconClassName.includes(COLLAPSE_DOWN.ICON)) {
                    addButton.classList.add('d-none');
                } else if(addButton != null && !iconClassName.includes(COLLAPSE_DOWN.ICON)) {
                    addButton.classList.remove('d-none');
                }

                if(menuAction != null && iconClassName.includes(COLLAPSE_DOWN.ICON)) {
                    menuAction.classList.add('d-none');
                } else if(menuAction != null && !iconClassName.includes(COLLAPSE_DOWN.ICON)) {
                    menuAction.classList.remove('d-none');
                }
            });
            
        }
    }   
}