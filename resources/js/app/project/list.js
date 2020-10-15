import { Project } from "./project";
import { DataTable } from "../../libraries/dataTable/dataTable";

Shimmer(true);
const dataTable = new DataTable({
    element: '#project-table',
    mappingData: [
        'date', 'name', 'owner', 'city', 'progress', 'total', 'sisa', 'project_status'
    ],
    url: 'projects/list',
    event: {
        onDoubleClick: (e, id) => {
            editRecord(id);
        }
    },
    action: {
        onEdit: (id) => {
            editRecord(id);
        },
        onDelete: async (id) => {
            return await Project.delete({
                id: id,
                withConfirm: true
            });
        }
    },
    isAutoInit: false
});

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

    document.querySelector('#project-new-button').addEventListener('click', () => {
        window.location.href = `${APP_URL}/projects/create`;
    });
    document.querySelector('#refresh-button').addEventListener('click', function() {
        const btn = this;
        btn.disabled = true;
        dataTable.reload().then(res => btn.disabled = false);
    });
});

async function init() {
    try {
        await dataTable.init();
        await renderModal();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function renderModal() {

}

function editRecord(id) {
    window.location.href = `${APP_URL}/projects/${id}/edit`;
}