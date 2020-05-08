<?php
Defined('BASE_PATH') or die(ACCESS_DENIED);

class Contact extends Controller {
    
    const pathView = 'app/view/contact/';
    private $isCanAccess;
    private $_type;

    public function __construct($type = null) {
        $this->auth();
        $this->auth->alreadyLogin();
        $this->isCanAccess = array(
            'contact' => $this->auth->isCanAccess('Contact'),
            'kas-besar' => $this->auth->isCanAccess('KasBesar'),
            'kas-kecil' => $this->auth->isCanAccess('KasKecil'),
            'sub-kas-kecil' => $this->auth->isCanAccess('SubKasKecil')
        );
        $this->model('Contact');
        $this->library('DataTable');
        $this->helper('General');
        $this->helper('Validation');

        $this->_type = (isset($type) && !empty($type)) ? $type : 'contact';
    }

    /**
     * Method index
     * Default Main Method
     */
    public function index() {
        if(!$this->isCanAccess || !$this->isCanAccess[$this->_type]->isCanRead) {
            $this->responseError(403, 'Access Denied');
        }
        
        $title = ($this->_type == 'kas-besar') ? 'Kas Besar' : ($this->_type == 'kas-kecil' ? 'Kas Kecil' : ($this->_type == 'sub-kas-kecil' ? 'Sub Kas Kecil' : 'Contact'));
        $config = (object)array(
            'js' => array(
                (object)array(
                    'src' => self::pathView. 'js/list.js',
                    'type' => 'module'
                )
            )
        );

        $this->template('contact/list', $config, array('type' => $this->_type, 'title' => $title));
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
            $data = $this->Bank->getById($id);
            if(!$data->success) {
                throw new Exception($data->message);
            }

            $result->data = $data->data;
            $result->success = true;
        } 
        catch (Exception $e) {
            $this->responseError(400, $e->getMessage(), true);
        }

        $this->responseJSON($result);
    }

    /**
     * 
     */
    public function getDatatable() {
        if(!$this->isCanAccess || !$this->isCanAccess[$this->_type]->isCanRead) {
            $this->responseError(403, 'Access Denied');
        }

        $dataTableByType = array(
            'contact' => (object)array(
                'filterList' => ['name', 'email', 'phoneNumber', 'active_status', 'created_by', 'created_on'],
                'sortList' => [null, 'name', 'email', 'phoneNumber', 'active_status', 'created_by', 'created_on', null],
                'filter' => null
            ),
            'kas-besar' => (object)array(
                'filterList' => ['name', 'email', 'phoneNumber', 'saldo', 'active_status', 'created_by', 'created_on'],
                'sortList' => [null, 'name', 'email', 'phoneNumber', 'saldo', 'active_status', 'created_by', 'created_on', null],
                'filter' => "contact_type = 'Kas Besar'"
            ),
            'kas-kecil' => (object)array(
                'filterList' => ['name', 'email', 'phoneNumber', 'saldo', 'active_status', 'created_by', 'created_on'],
                'sortList' => [null, 'name', 'email', 'phoneNumber', 'saldo', 'active_status', 'created_by', 'created_on', null],
                'filter' => "contact_type = 'Kas Kecil'"
            ),
            'sub-kas-kecil' => (object)array(
                'filterList' => ['name', 'email', 'phoneNumber', 'saldo', 'active_status', 'created_by', 'created_on'],
                'sortList' => [null, 'name', 'email', 'phoneNumber', 'saldo', 'active_status', 'created_by', 'created_on', null],
                'filter' => "contact_type = 'Sub Kas Kecil'"
            )
        );
        $dataTableSetup = (object)array(
            'table' => 'VwContact',
            'filterList' => $dataTableByType[$this->_type]->filterList,
            'sortList' => $dataTableByType[$this->_type]->sortList,
            'defaultSort' => ['active_status' => 'asc', 'created_on' => 'desc'],
            'filter' => $dataTableByType[$this->_type]->filter
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
                $temp[] = $no;
                $temp[] = $row['name'];
                $temp[] = $row['email'];
                $temp[] = $row['phoneNumber'];
                $temp[] = $this->General->printLookup($row['active_statusId'], $row['active_status']);
                
                if($this->_type != 'contact' && $this->_type != 'kas-besar') {
                    $temp[] = $this->General->printCurrency($row['saldo']);
                }

                $temp[] = $this->General->printLookup($row['created_byId'], $row['created_by'], 'contact/view');
                $temp[] = $this->General->printDate(explode(' ', $row['created_on'])[0], 'full');
                $temp[] = $this->General->printAccess($row['id'], $this->isCanAccess[$this->_type]); 

                $data[] = $temp;
            }

            $result->recordsTotal = $dataTable->dataTable->recordsTotal;
            $result->recordsFiltered = $dataTable->dataTable->recordsFiltered;
            $result->data = $data;
        } 
        catch (Exception $e) {
            $this->responseError(400, $e->getMessage(), true);
        }

        $this->responseJSON($result);
    }

    public function getMutasiDatatable($bankId) {
        if(!$this->isCanAccess || !$this->isCanAccess->isCanRead) {
            $this->responseError(403, 'Access Denied');
        }

        $dataTableSetup = (object)array(
            'table' => 'mutasi_bank',
            'filterList' => ['date', 'credit', 'debt', 'saldo'],
            'sortList' => [null, 'date', 'credit', 'debt', 'saldo', null],
            'defaultSort' => ['created_on' => 'desc'],
            'filter' => "bankId = '{$bankId}'"
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
                $temp[] = $no;
				$temp[] = $this->General->printDate($row['date'], 'full');
				$temp[] = $this->General->printCurrency($row['credit']);
                $temp[] = $this->General->printCurrency($row['debt']);
                $temp[] = $this->General->printCurrency($row['saldo']);
                $temp[] = $row['notes'];
                
                $data[] = $temp;
            }

            $result->recordsTotal = $dataTable->dataTable->recordsTotal;
            $result->recordsFiltered = $dataTable->dataTable->recordsFiltered;
            $result->data = $data;
        } 
        catch (Exception $e) {
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

            $save = $this->Bank->insert($data);
            if(!$save->success) {
                throw new Exception($save->message);
            }

            $result->success = true;
            $result->message = 'Tambah Data Bank Berhasil';
            $this->PublishMessage('Bank', 'reload-datatable');
        } 
        catch (Exception $e) {
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

            $update = $this->Bank->update($id, $data);
            if(!$update->success) {
                throw new Exception($update->message);
            }

            $result->success = true;
            $result->message = 'Edit Data Bank Berhasil';

            $this->PublishMessage('Bank', ($data->editMode == 'list' ? 'reload-datatable' : 'reload-view'));
        } 
        catch (Exception $e) {
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

        // $bankData = $this->Bank->getById($id);
        // if(!$bankData->success || count($bankData->data) < 1) {
        //     $this->responseError(404, 'Not Found');
        // }

        $config = (object)array(
            'js' => array(
                (object)array(
                    'src' => self::pathView. 'js/view.js',
                    'type' => 'module'
                )
            )
        );

        $this->template('bank/view', $config, array('id' => $id));
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
            $delete = $this->Bank->delete($id);
            if(!$delete->success) {
                throw new Exception($delete->message);
            }

            $result->success = true;
            $result->message = 'Hapus Data Bank Berhasil';
            $this->PublishMessage('Bank', 'reload-datatable');
        } 
        catch (Exception $e) {
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

		$this->Validation->set_rules($data->name, 'Nama Bank', 'nama', 'string | 1 | 255 | required');
		$this->Validation->set_rules($data->saldo, 'Saldo Awal Bank', 'saldo', "nilai | 0 | 99999999999 | {$required}");
		$this->Validation->set_rules($data->active_statusId, 'Status Bank', 'status', 'string | 1 | 255 | required');

		return $this->Validation->run();
	}
}