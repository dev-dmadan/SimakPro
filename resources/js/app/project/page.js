import Slider from 'bootstrap-slider';
import { HTTPClient } from '../../libraries/httpClient/httpClient';
import { Lookup } from '../../libraries/lookup/lookup';
import { Project } from './project';

Shimmer(true);
const projectId = document.querySelector('#project-page-id') ? document.querySelector('#project-page-id').value : null;
const pageMode = document.querySelector('#page-mode') ? document.querySelector('#page-mode').value : ADD_MODE;
const projectData = Project.getAllProperty(Project.attribute.page);

/** Lookup */
    const projectStatusLookup = new Lookup({
        element: '#project-page-project_status',
        placeholder: 'Pilih Status',
        isAutoInit: false
    });
/** End Lookup */

/** DataTable */
/** End DataTable */

const projectSubTotal = new Cleave('#project-page-sub_total', {
    numeral: true,
    prefix: 'Rp ',
    numeralDecimalMark: ',',
    delimiter: '.'
});
const projectCCO = new Cleave('#project-page-cco', {
    numeral: true,
    prefix: 'Rp ',
    numeralDecimalMark: ',',
    delimiter: '.'
});
const projectTotal = new Cleave('#project-page-total', {
    numeral: true,
    prefix: 'Rp ',
    numeralDecimalMark: ',',
    delimiter: '.'
});
const projectDP = new Cleave('#project-page-dp', {
    numeral: true,
    prefix: 'Rp ',
    numeralDecimalMark: ',',
    delimiter: '.'
});
const projectSisa = new Cleave('#project-page-sisa', {
    numeral: true,
    prefix: 'Rp ',
    numeralDecimalMark: ',',
    delimiter: '.'
});
const progressProject = new Slider('#project-page-progress');
const projectDate = new Datepicker(projectData.date, {
    autohide: true,
    clearBtn: true,
    buttonClass: 'btn',
    format: 'dd/mm/yyyy'
});

document.addEventListener('DOMContentLoaded', async (e) => {
    let isError = false;
    try {
        await init();
    } catch (error) {
        Alert({
            title: 'Terjadi kesalahan',
            message: error,
            type: AlertHelper.Error
        });
        isError = true;
    } finally {
        Shimmer(false);
        if(isError) {
            return;
        }
    }

    progressProject.on("slide", function(sliderValue) {
        document.querySelector("#project-page-progress-value").textContent = `${sliderValue}%`;
    });
    progressProject.on("change", function(sliderValue) {
        document.querySelector("#project-page-progress-value").textContent = `${sliderValue.newValue}%`;
    });

    document.querySelector('#project-page-save').addEventListener('click', async (e) => {
        try {
            const res = await save();
            if(res) {
                if(res.status && res.id && pageMode == ADD_MODE) {
                    Alert({title: 'Project berhasil disimpan'}).then(res => window.location.href = `${APP_URL}/projects`);
                } else {
                    Toastr({message: 'Project berhasil disimpan'});
                    reloadPage();
                }
            }
        } catch (error) {
            console.error(error);
            Alert({
                title: 'Terjadi kesalahan',
                message: error,
                type: AlertHelper.Error
            });
        }
    });
});

async function init() {
    try {
        await renderLookup();
        await renderModal();
        await renderDetail();
        handlingNewButtonDetails();
        handlingAfterSaveModals();

        if(pageMode == EDIT_MODE && projectId != undefined) {
            const data = await Project.show({id: projectId});
            renderPage(data);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function renderPage(data) {
    projectData.name.value = data.name ? data.name : '';
    projectData.code.value = data.code ? data.code : '';
    projectData.owner.value = data.owner ? data.owner : '';
    // projectData.date.value = data.date ? data.date : '';
    projectDate.setDate(data.date ? new Date(data.date) : null);
    projectData.city.value = data.city ? data.city : '';
    projectData.address.value = data.address ? data.address : '';
    projectData.luas_area.value = data.luas_area ? parseFloat(data.luas_area) : 0;
    projectData.estimasi.value = data.estimasi ? data.estimasi : 0;
    // projectData.sub_total.value = data.sub_total ? parseFloat(data.sub_total) : 0;
    // projectData.cco.value = data.cco ? parseFloat(data.cco) : 0;
    // projectData.total.value = data.total ? parseFloat(data.total) : 0;
    // projectData.dp.value = data.dp ? parseFloat(data.dp) : 0;
    // projectData.sisa.value = data.sisa ? parseFloat(data.sisa) : 0;
    
    projectSubTotal.setRawValue(data.sub_total ? data.sub_total : '0');
    projectCCO.setRawValue(data.cco ? data.cco : '0');
    projectTotal.setRawValue(data.total ? data.total : '0');
    projectDP.setRawValue(data.dp ? data.dp : '0');
    projectSisa.setRawValue(data.sisa ? data.sisa : '0');

    progressProject.setValue(data.progress ? data.progress : 0, false, true);
    document.querySelector("#project-page-progress-value").textContent = `${data.progress ? data.progress : 0}%`;

    const projectStatusValue = data.project_status ? {
        id: data.project_status.id,
        name: data.project_status.name
    } : null;
    projectStatusLookup.setValue(projectStatusValue);
}

async function renderLookup() {
    try {
        // const projectStatusData = HTTPClient.Request({
        //     uri: `${APP_URL}/lookups/project-status`,
        //     method: HTTPClient.GET
        // });

        // const lookupData = await Promise.all([
        //     projectStatusData,
        // ]);

        // projectStatusLookup.sourceData = {
        //     static: lookupData[0].map(item => {
        //         return {
        //             id: item.id,
        //             text: item.name
        //         }
        //     })
        // };

        projectStatusLookup.init();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function renderModal() {
    try {
        await Promise.all([

        ]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function handlingAfterSaveModals() {

}

async function renderDetail() {

}

function handlingNewButtonDetails() {

}

async function reloadDetail({name = null, reloadAll = false}) {
    const listDetail = {
        
    };

    try {
        if(reloadAll) {
            const promiseList = [];
            for (var key in listDetail) {
                if (!listDetail.hasOwnProperty(key)) {
                    continue;
                }
            
                promiseList.push(listDetail[key].reload());
            }

            await Promise.all(promiseList);
        } else if(name != undefined) {
            listDetail[name].reload();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function reloadPage() {
    let isError = false;

    Shimmer(true);
    try {
        const data = await Project.show({id: projectId});
        renderPage(data);
        await reloadDetail({reloadAll: true});
    } catch (error) {
        console.error(error);
    } finally {
        Shimmer(false);

        if(isError) {
            throw error;
        }
    }
}

async function save() {
    try {
        const conf = await Confirm();
        if(!conf) {
            return;
        }

        const project = new Project();
        project.setAllProperty(Project.attribute.page);
        project.date = projectData.date.value ? projectDate.getDate('yyyy-mm-dd') : null;
        project.sub_total = projectSubTotal.getRawValue().split('Rp ')[1];
        project.cco = projectCCO.getRawValue().split('Rp ')[1];
        project.total = projectTotal.getRawValue().split('Rp ')[1];
        project.dp = projectDP.getRawValue().split('Rp ')[1];
        project.sisa = projectSisa.getRawValue().split('Rp ')[1];
        
        if(pageMode == ADD_MODE) {
            return await project.save();
        } else if(pageMode == EDIT_MODE) {
            return await project.update({id: projectId});
        }   
    } catch (error) {
        console.error(error);
        throw error;
    }
}