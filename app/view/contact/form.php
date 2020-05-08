<?php 
Defined('BASE_PATH') or die(ACCESS_DENIED); 
?>

<div class="modal fade" id="form-contact-modal">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Form Contact</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="form-contact">
                <input type="hidden" id="id" value="<?= isset($id) ? $id : ''; ?>">
                <div class="modal-body">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="name">Nama</label>
                                <input type="text" class="form-control" id="name" placeholder="Nama">
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="birthplace">Tempat Lahir</label>
                                        <input type="text" class="form-control" id="birthplace" placeholder="Tempat Lahir">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="birthdate">Tanggal Lahir</label>
                                        <input type="text" class="form-control" id="birthdate" placeholder="Tanggal Lahir">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="gender" >Jenis Kelamin</label>
                                <select id="gender" class="form-control select2bs4" style="width: 100%;">
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="contact_type" >Jenis Kontak</label>
                                <select id="contact_type" class="form-control select2bs4" style="width: 100%;">
                                </select>
                            </div>

                            <div class="form-group">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="image" accept="image/*">
                                    <label class="custom-file-label" for="image">Pilih Foto</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Email">
                            </div>

                            <div class="form-group">
                                <label for="phoneNumber">No. Telepon</label>
                                <input type="text" class="form-control" id="phoneNumber" placeholder="No. Telepon">
                            </div>

                            <div class="form-group">
                                <label for="address">Alamat</label>
                                <textarea id="address" class="form-control" rows="3" placeholder="Alamat"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="active_status">Status</label>
                                <select id="active_status" class="form-control select2bs4" style="width: 100%;">
                                </select>
                            </div>
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