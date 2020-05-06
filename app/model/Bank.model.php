<?php
Defined('BASE_PATH') or die(ACCESS_DENIED);

class BankModel extends Database {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Method getLookup
     * Get Bank Lookup Data
     * @return {object} result
     *                  result.success {boolean}
     *                  result.message {string}
     *                  result.data {array}
     */
    public function getLookup() {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'data' => null
        );

        $query  = "SELECT id, name FROM bank";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute();

            $result->data = $statement->fetchAll(PDO::FETCH_ASSOC);
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
    public function getById($id) {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'data' => null
        );

        $query  = "SELECT * FROM VwBank WHERE id = :id;";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute(array(':id' => $id));

            $result->data = $statement->fetchAll(PDO::FETCH_ASSOC);
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
    public function insert($data) {
        $result = (object)array(
            'success' => false,
            'message' => ''
        );

        $isError = false;
        try {
            $this->connection->beginTransaction();
            
            $data->id = $this->NewGuid();

            $insertBank = $this->insertBank($data);
            if(!$insertBank->success) {
                throw new Exception($insertBank->message);
            }

            $insertMutasi = $this->insertMutasi($data->id, (object)array(
                'credit' => $data->saldo,
                'debt' => 0,
                'saldo' => $data->saldo,
            ), 'Saldo Awal', $data->created_by);
            if(!$insertMutasi->success) {
                throw new Exception($insertMutasi->message);
            }

            $this->connection->commit();
            $result->success = true;
        } 
        catch (PDOException $e) {
            $isError = true;
            $result->message = $e->getMessage();
        }
        catch (Exception $e) {
            $isError = true;
            $result->message = $e->getMessage();
        }
        finally {
            if($isError) {
                $this->connection->rollBack();
            }
        }

        return $result;
    }

    /**
     * 
     */
    public function insertBank($data) {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'rowAffected' => 0
        );
        
        $query  = "INSERT INTO bank (id, name, saldo, active_statusId, created_by, modified_by) ";
        $query .= "VALUES(:id, :name, :saldo, :active_statusId, :created_by, :modified_by);";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute(array(
                ':id' => $data->id, 
                ':name' => $data->name, 
                ':saldo' => $data->saldo, 
                ':active_statusId' => $data->active_statusId, 
                ':created_by' => $data->created_by, 
                ':modified_by' => $data->modified_by
            ));
            $result->rowAffected = $statement->rowCount();
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
    public function insertMutasi($bankId, $transaction, $notes, $created_by) {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'rowAffected' => 0
        );

        $id = $this->NewGuid();
        $query  = "INSERT INTO mutasi_bank (id, bankId, date, credit, debt, saldo, notes, created_by, modified_by) ";
        $query .= "VALUES(:id, :bankId, :date, :credit, :debt, :saldo, :notes, :created_by, :modified_by);";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute(array(
                ':id' => $id, 
                ':bankId' => $bankId, 
                ':date' => date('Y-m-d'), 
                ':credit' => $transaction->credit,
                ':debt' => $transaction->debt,
                ':saldo' => $transaction->saldo,
                ':notes' => $notes,
                ':created_by' => $created_by,
                ':modified_by' => $created_by
            ));
            $result->rowAffected = $statement->rowCount();
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
    public function update($id, $data) {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'rowAffected' => 0
        );
        
        $query  = "UPDATE bank SET ";
        $query .= "name = :name, active_statusId = :active_statusId, modified_by = :modified_by ";
        $query .= "WHERE id = :id;";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute(array(
                ':id' => $id, 
                ':name' => $data->name, 
                ':active_statusId' => $data->active_statusId, 
                ':modified_by' => $data->modified_by
            ));
            $result->rowAffected = $statement->rowCount();
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
    public function delete($id) {
        $result = (object)array(
            'success' => false,
            'message' => ''
        );

        $isError = false;
        try {
            $this->connection->beginTransaction();

            $deleteMutasi = $this->deleteMutasi($id);
            if(!$deleteMutasi->success) {
                throw new Exception($deleteMutasi->message);
            }

            $deleteBank = $this->deleteBank($id);
            if(!$deleteBank->success) {
                throw new Exception($deleteBank->message);
            }

            $this->connection->commit();
            $result->success = true;
        } 
        catch (PDOException $e) {
            $isError = true;
            $result->message = $e->getMessage();
        }
        catch (Exception $e) {
            $isError = true;
            $result->message = $e->getMessage();
        }
        finally {
            if($isError) {
                $this->connection->rollBack();
            }
        }

        return $result;
    }

    /**
     * 
     */
    public function deleteBank($id) {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'rowAffected' => 0
        );
        
        $query  = "DELETE FROM bank WHERE id = :id;";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute(array(
                ':id' => $id
            ));
            $result->rowAffected = $statement->rowCount();
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
    public function deleteMutasi($bankId) {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'rowAffected' => 0
        );
        
        $query  = "DELETE FROM mutasi_bank WHERE bankId = :bankId;";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute(array(
                ':bankId' => $bankId
            ));
            $result->rowAffected = $statement->rowCount();
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

    public function __destruct() {
        $this->close();
    }
}