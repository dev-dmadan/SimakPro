import Slider from 'bootstrap-slider';
import { Lookup } from '../../libraries/lookup/lookup';
import { Project } from './project';

Shimmer(true);
const projectId = document.querySelector('#project-page-id') ? document.querySelector('#project-page-id').value : null;
const pageMode = document.querySelector('#page-mode') ? document.querySelector('#page-mode').value : ADD_MODE;
const progressProject = new Slider('#project-page-progress');

/** Lookup */
    const projectStatusLookup = new Lookup({
        element: '#project-page-project_status',
        placeholder: 'Pilih Status',
        isAutoInit: false
    });
/** End Lookup */

/** DataTable */
/** End DataTable */

document.addEventListener('DOMContentLoaded', async (e) => {
    let isError = false;
    try {
        await init();
    } catch (error) {
        Alert({
            title: 'Something wrong happen',
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