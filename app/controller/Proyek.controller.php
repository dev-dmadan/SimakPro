<?php
Defined('BASE_PATH') or die(ACCESS_DENIED);

class Proyek extends Controller {
    
    const pathView = 'app/view/proyek/';
    private $isCanAccess;

    public function __construct() {
        $this->auth();
        $this->auth->alreadyLogin();
        $this->isCanAccess = $this->auth->isCanAccess('Proyek');
        $this->model('Proyek');
        $this->library('DataTable');
        $this->helper('General');
        $this->helper('Validation');
    }

    /**
     * Method index
     * Default Main Method
     */
    public function index() {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanRead) {
            $this->responseError(403, 'Access Denied');
        }
    
        $config = (object)array(
            'js' => array(
                (object)array(
                    'src' => self::pathView. 'js/list.js',
                    'type' => 'module'
                )
            )
        );

        $this->template('proyek/list', $config);
    }

    /**
     * 
     */
    public function getData($id) {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanRead) {
            $this->responseError(403, 'Access Denied');
        }

        $result = (object)array(
            'success' => false,
            'message' => '',
            'data' => null
        );

        try {
            $data = $this->Proyek->getById($id);
            if(!$data->success) {
                throw new Exception($data->message);
            }

            $result->data = $data->data;
            $result->success = true;
        } catch (Exception $e) {
            $this->responseError(400, $e->getMessage(), true);
        }

        $this->responseJSON($result);
    }

    /**
     * 
     */
    public function getDatatable() {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanRead) {
            $this->responseError(403, 'Access Denied');
        }

        // Sesuaikan lagi - update 22 juni 2020
        $dataTableSetup = (object)array(
            'table' => 'VwProyek',
            'filterList' => ['name', 'saldo', 'active_status', 'created_by', 'created_on'],
            'sortList' => [null, 'name', 'saldo', 'active_status', 'created_by', 'created_on', null],
            'defaultSort' => ['active_status' => 'asc', 'created_on' => 'desc'],
            'filter' => null
        );
        
        $result = (object)array(
            'draw' => $_POST['draw'],
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => null,
        );
        
        try {
            $dataTable = $this->DataTable->getDataTable($dataTableSetup);  
            if(!$dataTable->success) {
                throw new Exception($dataTable->message);
            }

            $no = $_POST['start'];
            $data = array();
            foreach($dataTable->dataTable->data as $row) {
                $no++;

                $temp = array();

                // Sesuaikan lagi - update 22 juni 2020
                $temp[] = $no;
				$temp[] = $row['name'];
				$temp[] = $this->General->printCurrency($row['saldo']);
                $temp[] = $this->General->printLookup($row['active_statusId'], $row['active_status']);
                $temp[] = $this->General->printLookup($row['created_byId'], $row['created_by'], 'contact/view');
                $temp[] = $this->General->printDate(explode(' ', $row['created_on'])[0], 'full');
                $temp[] = $this->General->printAccess($row['id'], $this->isCanAccess); 
                
                $data[] = $temp;
            }

            $result->recordsTotal = $dataTable->dataTable->recordsTotal;
            $result->recordsFiltered = $dataTable->dataTable->recordsFiltered;
            $result->data = $data;
        } catch (Exception $e) {
            $this->responseError(400, $e->getMessage(), true);
        }

        $this->responseJSON($result);
    }

    /**
     * 
     */
    public function getAccessRight() {
        $data = json_decode(file_get_contents("php://input"));
        if(!isset($data) || empty($data)) {
            $this->responseError(403, 'Access Denied', true);
        }

        if($data->userId !== $_SESSION['sess_user']->UserId || $data->userName !== $_SESSION['sess_user']->UserName) {
            $this->responseError(403, 'Access Denied', true);
        }

        $this->responseJSON($this->isCanAccess);
    }

    /**
     * 
     */
    public function form($id) {
        $isNew = false;
        if(!$id || empty($id) || !isset($id)) {
            $isNew = true;
        }

        if($isNew) {
            if(!$this->isCanAccess || !$this->isCanAccess->isCanInsert) {
                $this->responseError(403, 'Access Denied');
            }
        } else {
            if(!$this->isCanAccess || !$this->isCanAccess->isCanUpdate) {
                $this->responseError(403, 'Access Denied');
            }

            $proyekData = $this->Proyek->getById($id);
            if(!$proyekData->success || count($proyekData->data) < 1) {
                $this->responseError(404, 'Not Found');
            }
        }

        $config = (object)array(
            'js' => array(
                (object)array(
                    'src' => self::pathView. 'js/form.js',
                    'type' => 'module'
                )
            )
        );

        $this->template('proyek/form', $config, (!$isNew ? array('id' => $id) : null));
    }

    /**
     * 
     */
    public function save() {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanInsert) {
            $this->responseError(403, 'Access Denied');
        }

        $result = (object)array(
            'success' => false,
            'message' => '',
            'errorList' => []
        );
        $isError = true;
        $data = json_decode(file_get_contents("php://input"));

        try {
            if(!$data || empty($data)) {
                throw new Exception("Data is undifined");
            }
            
            $validation = $this->set_validation($data);
            if(!$validation->success) {
                $isError = false;
                $result->errorList = $validation->errorList;

                throw new Exception('Silahkan Cek Kembali Form Isian');
            }

            $save = $this->Proyek->insert($data);
            if(!$save->success) {
                throw new Exception($save->message);
            }

            $result->success = true;
            $result->message = 'Tambah Data Proyek Berhasil';
        } catch (Exception $e) {
            if($isError) {
                $this->responseError(400, $e->getMessage(), true);
            }

            $result->message = $e->getMessage();
        }

        $this->responseJSON($result);
    }

    /**
     * 
     */
    public function edit($id) {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanUpdate) {
            $this->responseError(403, 'Access Denied');
        }

        $result = (object)array(
            'success' => false,
            'message' => '',
            'errorList' => []
        );
        $isError = true;
        $data = json_decode(file_get_contents("php://input"));

        try {
            if(!$data || empty($data)) {
                throw new Exception("Data is undifined");
            }
            
            $validation = $this->set_validation($data);
            if(!$validation->success) {
                $isError = false;
                $result->errorList = $validation->errorList;

                throw new Exception('Silahkan Cek Kembali Form Isian');
            }

            $update = $this->Proyek->update($id, $data);
            if(!$update->success) {
                throw new Exception($update->message);
            }

            $result->success = true;
            $result->message = 'Edit Data Proyek Berhasil';
        } catch (Exception $e) {
            if($isError) {
                $this->responseError(400, $e->getMessage(), true);
            }

            $result->message = $e->getMessage();
        }

        $this->responseJSON($result);
    }

    /**
     * 
     */
    public function detail($id) {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanRead) {
            $this->responseError(403, 'Access Denied');
        }

        $bankData = $this->Proyek->getById($id);
        if(!$bankData->success || count($bankData->data) < 1) {
            $this->responseError(404, 'Not Found');
        }

        $config = (object)array(
            'js' => array(
                (object)array(
                    'src' => self::pathView. 'js/view.js',
                    'type' => 'module'
                )
            )
        );

        $this->template('proyek/view', $config, array('id' => $id));
    }

    /**
     * 
     */
    public function delete($id) {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanDelete) {
            $this->responseError(403, 'Access Denied');
        }

        $result = (object)array(
            'success' => false,
            'message' => ''
        );
        $isError = true;

        try {
            $delete = $this->Proyek->delete($id);
            if(!$delete->success) {
                throw new Exception($delete->message);
            }

            $result->success = true;
            $result->message = 'Hapus Data Proyek Berhasil';
            $this->PublishMessage('Proyek', 'reload-datatable', array(
                'UserId' => $_SESSION['sess_user']->UserId
            ));
        } catch (Exception $e) {
            if($isError) {
                $this->responseError(400, $e->getMessage(), true);
            }

            $result->message = $e->getMessage();
        }

        $this->responseJSON($result);
    }

    /**
     * 
     */
    private function set_validation($data) {
		$required = empty($data->id) ? 'required' : 'not_required';

        // Sesuaikan lagi - update 22 juni 2020
		$this->Validation->set_rules($data->name, 'Nama Bank', 'nama', 'string | 1 | 255 | required');
		$this->Validation->set_rules($data->saldo, 'Saldo Awal Bank', 'saldo', "nilai | 0 | 99999999999 | {$required}");
		$this->Validation->set_rules($data->active_statusId, 'Status Bank', 'status', 'string | 1 | 255 | required');

		return $this->Validation->run();
	}
}