<?php
Defined('BASE_PATH') or die(ACCESS_DENIED);

class Lookup extends Controller {
    
    private $isCanAccess;

    public function __construct() {
        $this->auth();
        $this->auth->alreadyLogin();
        // $this->isCanAccess = $this->auth->isCanAccess('Bank');
        $this->helper('General');
    }

    /**
     * 
     */
    public function getLookup($lookupName) {
        $result = array();

        try {
            $modelName = ucfirst(strtolower($lookupName));
            $tempModel = explode('-', strtolower($lookupName));
            if(count($tempModel) > 1) {
                $tempModel = array_map('ucfirst', $tempModel);
                $modelName = implode('', $tempModel);
            }

            // $isCanAccess = $this->auth->isCanAccess($modelName);
            // if(!$isCanAccess || !$isCanAccess->isCanRead) {
            //     throw new Exception("Access Denied");
            // }

            $this->model($modelName);
            $lookupData = $this->$modelName->getLookup();
            if(!$lookupData->success) {
                throw new Exception($lookupData->message);
            }

            $result = $lookupData->data;
        } catch (Exception $e) {
            $this->responseError(400, $e->getMessage(), true);
        }

        $this->responseJSON($result);
    }
}