<?php
Defined('BASE_PATH') or die(ACCESS_DENIED);

class DataTable extends Database {

    private $queryDataTable = '';
    private $queryRecordFilter = '';
    private $queryRecordTotal = '';

    private $table;
    private $filterList;
    private $sortList;
    private $defaultSort;
    private $filter;

    /**
     * 
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * 
     */
    public function getDataTable($config) {
        if(!isset($config) || empty($config)) {
            $this->responseError(400, 'Config is undifined or empty', true);
        }
        
        $this->table = $config->table;
        $this->filterList = $config->filterList;
        $this->sortList = $config->sortList;
        $this->defaultSort = $config->defaultSort;
        $this->filter = $config->filter;

        $result = (object)array(
            'success' => false,
            'message' => '',
            'dataTable' => (object)array(
                'data' => null,
                'recordsFiltered' => 0,
                'recordsTotal' => 0,
            )
        );

        try {
            $this->buildQuery();

            $data = $this->getData();
            $recordsFiltered = $this->getRecordFilter();
            $recordsTotal = $this->getRecordTotal();

            $result->dataTable->data = $data;
            $result->dataTable->recordsFiltered = $recordsFiltered;
            $result->dataTable->recordsTotal = $recordsTotal;
            $result->success = true;
        } 
        catch (PDOException $e) {
            $result->message = $e->getMessage();
        }
        catch (Exception $e) {
            $result->message = $e->getMessage();
        }

        return $result;
    }

    /**
     * 
     */
    private function getData() {
        $statement = $this->connection->prepare($this->queryDataTable);
        $statement->execute($this->getBindParam());
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    /**
     * 
     */
    private function getRecordTotal() {
        $statement = $this->connection->prepare($this->queryRecordTotal);
        $statement->execute();
        $result = $statement->fetchColumn();

        return $result;
    }

    /**
     * 
     */
    private function getRecordFilter() {
        $statement = $this->connection->prepare($this->queryRecordFilter);
        $statement->execute($this->getBindParam());
        $result = $statement->rowCount();

        return $result;
    }

    /**
     * 
     */
    private function buildQuery() {
        $searchRequest = isset($_POST['search']['value']) ? $_POST['search']['value'] : false;
        $orderRequest = isset($_POST['order']) ? $_POST['order'] : false;
        $startRequest = isset($_POST['start']) ? $_POST['start'] : false;
        $lengthRequest = isset($_POST['length']) ? $_POST['length'] : false;

        $isFilterExist = ($this->filter && !empty($this->filter)) ? true : false;
        $isDefaultSortExist = ($this->defaultSort && !empty($this->defaultSort)) ? true : false;
        $queryFilter = $isFilterExist ? "WHERE {$this->filter}" : '';
        $querySort = '';
        $queryLimit = '';

        try {
            $this->queryDataTable = 'SELECT * FROM ' .$this->table;
            $this->queryRecordTotal = "SELECT COUNT(*) FROM {$this->table} {$queryFilter}";
            $this->queryRecordTotal = trim($this->queryRecordTotal);

            if($searchRequest) {
                $i = 0;
                foreach($this->filterList as $filter) {
                    if($i === 0) {
                        if($isFilterExist) {
                            $queryFilter .= " AND ({$filter} LIKE :{$filter}";
                        }
                        else {
                            $queryFilter .= "WHERE ({$filter} LIKE :{$filter}";
                        }
                    }
                    else {
                        $queryFilter .= " OR {$filter} LIKE :{$filter}";
                    }

                    $i++;
                }
                $queryFilter .= $searchRequest ? ' )' : '';
            }

            if($orderRequest && !empty($this->sortList[$orderRequest[0]['column']])) {
                $querySort .= 'ORDER BY ' .$this->sortList[$orderRequest[0]['column']]. ' ' .$orderRequest[0]['dir'];
            }
            else {
                if($isDefaultSortExist) {
                    $i = 0;
                    foreach($this->defaultSort as $key => $value) {
                        if($i === 0) {
                            $querySort .= 'ORDER BY ' .$key. ' ' .strtoupper($value);
                        }
                        else {
                            $querySort .= ', ' .$key. ' ' .strtoupper($value);
                        }

                        $i++;
                    }
                }
            }

            if($lengthRequest && $lengthRequest !== -1) {
                $queryLimit .= 'LIMIT ' .$startRequest. ', ' .$lengthRequest;
            } 
            
            $this->queryRecordFilter = "{$this->queryDataTable} {$queryFilter} {$querySort}";

            $this->queryDataTable .= " {$queryFilter} {$querySort} {$queryLimit}";
            $this->queryDataTable = trim($this->queryDataTable);
        } 
        catch (Exception $e) {
            $this->responseError(400, $e->getMessage(), true);
        }
    }

    /**
     * 
     */
    private function getBindParam() {
        $searchRequest = isset($_POST['search']['value']) ? $_POST['search']['value'] : false;
        $bindParam = array();
        if($searchRequest) {
            foreach($this->filterList as $filter) {
                $bindParam[":{$filter}"] = "%{$searchRequest}%";
            }
        }

        return $bindParam;
    }

    public function __destruct() {
        $this->close();
        // $this->consoleLog([
        //     'config' => (object)array(
        //         'table' => $this->table,
        //         'filterList' => $this->filterList,
        //         'sortList' => $this->sortList,
        //         'defaultSort' => $this->defaultSort,
        //         'filter' => $this->filter
        //     ),
        //     'query' => $this->queryDataTable,
        //     'queryRecordFilter' => $this->queryRecordFilter,
        //     'queryRecordTotal' => $this->queryRecordTotal
        // ]);
    }
}