<?php 
Defined('BASE_PATH') or die(ACCESS_DENIED); 
?>

<div class="modal fade" id="form-bank-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Form Bank</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="form-bank" class="form-horizontal">
                <input type="hidden" id="id">
                <div class="modal-body">
                    
                    <div class="form-group row">
                        <label for="name" class="col-sm-2 col-form-label">Nama</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" placeholder="Nama Bank">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="saldo" class="col-sm-2 col-form-label">Saldo Awal</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="saldo" placeholder="Saldo Awal">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="active_status" class="col-sm-2 col-form-label">Status</label>
                        <div class="col-sm-10">
                            <select id="active_status" class="form-control select2bs4" style="width: 100%;">
                            </select>
                        </div>
                    </div>

                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="save" type="button" class="btn btn-primary" value="add">Save</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>