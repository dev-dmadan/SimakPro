import { HTTPClient } from '../../libraries/httpClient/httpClient';
import { Project } from './project';

Shimmer(true);
const projectId = document.querySelector('#project-page-id') ? document.querySelector('#project-page-id').value : null;
const pageMode = document.querySelector('#page-mode') ? document.querySelector('#page-mode').value : ADD_MODE;

const project = new Project();
document.addEventListener('DOMContentLoaded', async (e) => {
    let isError = false;
    try {
        await init();
    } catch (error) {
        Alert({
            title: 'Terjadi kesalahan',
            message: error,
            type: AlertHelper.AlertType.Error
        });
        isError = true;
    } finally {
        Shimmer(false);
        if(isError) {
            return;
        }
    }

    project.getProperty('progress').on("slide", function(sliderValue) {
        document.querySelector("#project-page-progress-value").textContent = `${sliderValue}%`;
    });
    project.getProperty('progress').on("change", function(sliderValue) {
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
                type: AlertHelper.AlertType.Error
            });
        }
    });
});

async function init() {
    try {
        project.renderProperty(Project.attribute.page);
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
    project.getProperty('name').value = data.name ? data.name : '';
    project.getProperty('code').value = data.code ? data.code : '';
    project.getProperty('owner').value = data.owner ? data.owner : '';
    project.getProperty('date').setDate(data.date ? new Date(data.date) : null);
    project.getProperty('city').value = data.city ? data.city : '';
    project.getProperty('address').value = data.address ? data.address : '';
    project.getProperty('luas_area').setRawValue(data.luas_area ? data.luas_area : '0');
    project.getProperty('estimasi').setRawValue(data.estimasi ? data.estimasi : '0');
    project.getProperty('sub_total').setRawValue(data.sub_total ? data.sub_total : '0');
    project.getProperty('cco').setRawValue(data.cco ? data.cco : '0');
    project.getProperty('total').setRawValue(data.total ? data.total : '0');
    project.getProperty('dp').setRawValue(data.dp ? data.dp : '0');
    project.getProperty('sisa').setRawValue(data.sisa ? data.sisa : '0');

    project.getProperty('progress').setValue(data.progress ? data.progress : 0, false, true);
    document.querySelector("#project-page-progress-value").textContent = `${data.progress ? data.progress : 0}%`;

    const projectStatusValue = data.project_status ? {
        id: data.project_status.id,
        name: data.project_status.name
    } : null;
    project.getProperty('project_status').setValue(projectStatusValue);
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

        // projectData.project_status.sourceData = {
        //     static: lookupData[0].map(item => {
        //         return {
        //             id: item.id,
        //             text: item.name
        //         }
        //     })
        // };

        project.getProperty('project_status').init();
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

        project.setAllProperty(Project.attribute.page);
        // project.date = projectData.date.value ? projectDate.getDate('yyyy-mm-dd') : null;
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