<?php 
Defined('BASE_PATH') or die(ACCESS_DENIED);
?>

<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 name="label-name"></h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?= SITE_URL; ?>">Home</a></li>
                        <li class="breadcrumb-item"><a href="<?= SITE_URL. 'bank'; ?>">Bank</a></li>
                        <li class="breadcrumb-item active">Detail</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">

            <!-- Panel Button -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="card card-primary card-outline">
                        <div class="card-body">
                            <button id="edit" class="btn btn-flat btn-success">Edit</button>
                            <button id="close" class="btn btn-flat btn-default">Close</button>
                            <div class="float-right">
                                <button id="exportExcel" class="btn btn-flat btn-success"><i class="far fa-file-excel"></i> Export</button>
                                <button id="refresh" class="btn btn-flat btn-info"><i class="fas fa-sync-alt"></i> Refresh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-md-3">
                    <div class="card card-primary card-outline">
                        <!-- <div class="card-header">
                        </div> -->
                        <div class="card-body">
                            <strong>Nama</strong>
                            <p id="label-name"></p>
                            <hr>

                            <strong>Saldo</strong>
                            <p id="label-saldo"></p>
                            <hr>
                            
                            <strong>Status</strong>
                            <p id="label-active_status"></p>
                            <hr>
                            
                            <strong>Created On</strong>
                            <p id="label-created_on"></p>
                            <hr>

                            <strong>Created By</strong>
                            <p id="label-created_by"></p>
                            <hr>
                        </div>
                        <!-- /.card-body -->
                    </div>
                </div>

                <!-- Main Panel -->
                <div class="col-md-9">

                    <!-- Panel Top -->
                    <div class="card card-primary card-outline">
                        <div class="card-body">
                        </div><!-- /.card-body -->
                    </div>
                    <!-- /.nav-tabs-custom -->

                    <!-- Panel Buttom / Detail -->
                    <div class="card card-primary card-outline card-tabs">
                        <div class="card-header p-0 pt-1 border-bottom-0">
                            <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                                <a class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill" href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home" aria-selected="true">Detail Mutasi</a>
                            </ul>
                        </div><!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content" id="custom-tabs-three-tabContent">
                                <div class="tab-pane fade show active" id="custom-tabs-three-home" role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                                    <table id="mutasi-bank-table" class="table table-sm table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th class="text-right">No</th>
                                                <th>Tanggal</th>
                                                <th class="text-right">Uang Masuk</th>
                                                <th class="text-right">Uang Keluar</th>
                                                <th class="text-right">Saldo</th>
                                                <th>Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- /.tab-content -->
                        </div><!-- /.card-body -->
                    </div>
                    <!-- /.nav-tabs-custom -->
                </div>
                <!-- /.col -->
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <?php require_once 'form.php'; ?>
</div>