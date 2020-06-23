<?php 
Defined('BASE_PATH') or die(ACCESS_DENIED); 
?>

<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 id="label-name">Proyek</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?= SITE_URL; ?>">Proyek</a></li>
                        <li class="breadcrumb-item"><a href="<?= SITE_URL. 'proyek'; ?>">Proyek</a></li>
                        <li class="breadcrumb-item active">Form</li>
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
                            <button id="save" class="btn btn-flat btn-success">Save</button>
                            <button id="close" class="btn btn-flat btn-default">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <form id="form-proyek" class="form-horizontal">

            <div class="row">

                <!-- Profile Profile -->
                <div class="col-md-4">

                    <!-- Profile buttom -->
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h3 class="card-title">Profil Proyek</h3>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="code">Kode Proyek</label>
                                <input type="text" class="form-control" id="code" placeholder="Kode Proyek" readonly>
                            </div>

                            <div class="form-group">
                                <label for="name">Nama Proyek</label>
                                <input type="text" class="form-control" id="name" placeholder="Nama Proyek">
                            </div>

                            <div class="form-group">
                                <label for="owner">Owner</label>
                                <input type="text" class="form-control" id="owner" placeholder="Owner">
                            </div>

                            <div class="form-group">
                                <label for="project_status">Status Proyek</label>
                                <select id="project_status" class="form-control select2bs4" style="width: 100%;">
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="progress">Progress</label>
                                <input type="text" class="form-control" id="progress" placeholder="Progress">
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->

                <!-- Main Panel -->
                <div class="col-md-8">

                    <!-- Panel Top -->
                    <div class="card card-primary card-outline">
                        <div class="card-body">

                            <div class="form-group row">
                                <label for="date" class="col-sm-2 col-form-label">Tanggal</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="date" placeholder="Tanggal Proyek">
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <label for="estimasi" class="col-sm-2 col-form-label">Estimasi</label>
                                <div class="col-md-4">
                                    <input type="number" class="form-control" id="estimasi" placeholder="Estimasi">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="kota" class="col-sm-2 col-form-label">Kota</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="kota" placeholder="Kota">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="address" class="col-sm-2 col-form-label">Alamat</label>
                                <div class="col-sm-10">
                                    <textarea id="address" class="form-control" rows="3" placeholder="Alamat"></textarea>
                                </div>
                            </div>

                            <hr>

                            <div class="form-group row">
                                <label for="total" class="col-sm-2 col-form-label">Total</label>
                                <div class="col-md-4">
                                    <input type="number" class="form-control" id="total" placeholder="Total Proyek">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="form-group row">
                                        <label for="dp" class="col-sm-4 col-form-label">DP</label>
                                        <div class="col-md-8">
                                            <input type="number" class="form-control" id="dp" placeholder="DP Proyek">
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group row">
                                        <label for="cco" class="col-sm-4 col-form-label">CCO</label>
                                        <div class="col-md-8">
                                            <input type="number" class="form-control" id="cco" placeholder="CCO Proyek">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div><!-- /.card-body -->
                    </div>
                    <!-- /.nav-tabs-custom -->

                    <!-- Panel Buttom / Detail -->
                    <div class="card card-primary card-outline">
                        <div class="card-header p-2">
                            <ul class="nav nav-pills">
                                <li class="nav-item"><a class="nav-link active" href="#tab-skk" data-toggle="tab">Penugasan Sub Kas Kecil</a></li>
                                <li class="nav-item"><a class="nav-link" href="#tab-pembayaran" data-toggle="tab">Pembayaran</a></li>
                            </ul>
                        </div><!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="active tab-pane" id="tab-skk">
                                    <button id="new-skk-proyek" class="mb-2 btn btn-flat btn-info btn-sm">New</button>
                                    <table id="skk-proyek-table" class="table table-sm table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th class="text-right">No</th>
                                                <th>Sub Kas Kecil</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.tab-pane -->
                                
                                <div class="tab-pane" id="tab-pembayaran">
                                    <button id="pembayaran-proyek" class="mb-2 btn btn-flat btn-info btn-sm">New</button>
                                    <table id="pembayaran-proyek-table" class="table table-sm table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th class="text-right">No</th>
                                                <th>Tanggal</th>
                                                <th>Bank</th>
                                                <th>Nama</th>
                                                <th class="text-right">Total</th>
                                                <th>DP ?</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.tab-pane -->

                            </div>
                            <!-- /.tab-content -->
                        </div><!-- /.card-body -->
                    </div>
                    <!-- /.nav-tabs-custom -->
                </div>
                <!-- /.col -->

            </div>

            </form>
        </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <?php 
        require_once 'formSKK.php';
        require_once 'formPembayaran.php'; 
    ?>
</div>