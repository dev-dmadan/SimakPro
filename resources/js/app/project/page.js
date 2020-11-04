import { HTTPClient } from '../../libraries/httpClient/httpClient';
import { AlertHelper } from '../../libraries/alert/alert';
import { Project } from './project';

Shimmer(true);
const id = document.querySelector('#project-page-id') ? document.querySelector('#project-page-id').value : null;
const pageMode = document.querySelector('#page-mode') ? document.querySelector('#page-mode').value : ADD_MODE;
const project = new Project(Project.attribute.page);

document.addEventListener('DOMContentLoaded', async (e) => {
    let isError = false;
    try {
        await init();
    } catch (error) {
        AlertHelper.Alert({
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

    project.progress.plugin.on("slide", function(sliderValue) {
        document.querySelector("#project-page-progress-value").textContent = `${sliderValue}%`;
    });
    project.progress.plugin.on("change", function(sliderValue) {
        document.querySelector("#project-page-progress-value").textContent = `${sliderValue.newValue}%`;
    });

    // on change sub total, cco
    [project.sub_total.element, project.cco.element].forEach(elem => {
        elem.addEventListener('change', function() {
            const total = project.sub_total.get() + project.cco.get();
            project.total.set(total);
        });
    });

    // on change dp
    project.dp.element.addEventListener('change', function() {
        const sisa = project.total.get() - project.dp.get();
        project.sisa.set(sisa);
    });

    document.querySelector('#project-page-save').addEventListener('click', async (e) => {
        try {
            const res = await save();
            if(res.success) {
                if(res.id && pageMode == ADD_MODE) {
                    AlertHelper.Alert({title: 'Project berhasil disimpan'}).then(res => window.location.href = `${APP_URL}/projects`);
                } else {
                    AlertHelper.Toastr({message: 'Project berhasil disimpan'});
                    reloadPage();
                }
            } else {
                AlertHelper.Toastr({
                    message: 'Terdapat kesalahan, silahkan check kembali form',
                    type: AlertHelper.AlertType.Warning
                });
            }
        } catch (error) {
            console.error(error);
            AlertHelper.Alert({
                title: 'Terjadi kesalahan',
                message: error,
                type: AlertHelper.AlertType.Error
            });
        }
    });
});

async function init() {
    try {
        project.renderAllProperty();

        await renderLookup();
        await renderDetail();
        handlingNewButtonDetails();
        handlingAfterSaveModals();

        if(pageMode == EDIT_MODE && id != undefined) {
            const data = await Project.show({id: id});
            renderPage(data);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function renderPage(data) {
    project.name.set(data.name ? data.name : '');
    project.code.set(data.code ? data.code : '');
    project.owner.set(data.owner ? data.owner : '');
    project.date.set(data.date);
    project.city.set(data.city ? data.city : '');
    project.address.set(data.address ? data.address : '');
    project.luas_area.set(data.luas_area);
    project.estimasi.set(data.estimasi);
    project.sub_total.set(data.sub_total);
    project.cco.set(data.cco);
    project.total.set(data.total);
    project.dp.set(data.dp);
    project.sisa.set(data.sisa);

    project.progress.set(data.progress);
    document.querySelector("#project-page-progress-value").textContent = `${data.progress ? data.progress : 0}%`;

    const projectStatusValue = data.project_status ? {
        id: data.project_status.id,
        name: data.project_status.name
    } : null;
    project.project_status.set(projectStatusValue);
}

async function renderLookup() {
    try {
        const projectStatusData = HTTPClient.Request({
            uri: `${APP_URL}/lookups/project-status`,
            method: HTTPClient.Method.Get
        });

        const lookupData = await Promise.all([
            projectStatusData,
        ]);

        project.project_status.plugin.sourceData = {
            static: lookupData[0].map(item => {
                return {
                    id: item.id,
                    text: item.name
                }
            })
        };

        project.project_status.plugin.init();
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
        const data = await Project.show({id: id});
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
        const conf = await AlertHelper.Confirm();
        if(!conf) {
            return;
        }

        if(pageMode == ADD_MODE) {
            return await project.save();
        } else if(pageMode == EDIT_MODE) {
            return await project.update({id: id});
        }   
    } catch (error) {
        console.error(error);
        throw error;
    }
}