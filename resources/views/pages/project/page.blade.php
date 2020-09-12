@extends('layouts.page')

{{-- page title --}}
@section('page-title', 'Form Proyek')

{{-- input hidden page id --}}
@section('page-id', 'project-page-id')

{{-- page breadcrumb --}}
@section('breadcrumb')
    <li class="breadcrumb-item active">Proyek</li>
@endsection

{{-- main profile --}}
@section('main-profile')
    
    {{-- your main profile --}}
    <div class="form-group">
        <label for="project-page-code">Kode Proyek</label>
        <input type="text" class="form-control" id="project-page-code" placeholder="Masukkan Kode Proyek" readonly>
    </div>
    <div class="form-group">
        <label for="project-page-name">Nama Proyek</label>
        <input type="text" class="form-control" id="project-page-name" placeholder="Masukkan Nama Proyek">
    </div>
    <div class="form-group">
        <label for="project-page-date">Tanggal Proyek</label>
        <input type="text" class="form-control" id="project-page-date" placeholder="Masukkan Tanggal Proyek">
    </div>
    <div class="form-group">
        <label for="project-page-progress">Progres Proyek</label>
        <input id="project-page-progress" type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="0"/>
        <span id="project-page-progress-value"></span>
    </div>
    <div class="form-group">
        <label for="project-page-project_status">Status Proyek</label>
        <select class="form-control" id="project-page-project_status" style="width: 100%">
        </select>
    </div>

@endsection

{{-- main content --}}
@section('main-content')
    
    {{-- your main content --}}
    <div class="form-row">
        <div class="col-6">
            <div class="form-group">
                <label for="project-page-owner">Pemilik</label>
                <input type="text" class="form-control" id="project-page-owner" placeholder="Masukkan Nama Pemilik">
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="project-page-city">Kota</label>
                <input type="text" class="form-control" id="project-page-city" placeholder="Masukkan Kota">
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="col">
            <div class="form-group">
                <label for="project-page-address">Alamat</label>
                <textarea class="form-control" id="project-page-alamat" placeholder="Masukkan Alamat" rows="3"></textarea>
            </div>
        </div>
    </div>
    
    <div class="form-row">
        <div class="col-6">
            <div class="form-group">
                <label for="project-page-luas_area">Luas Area</label>
                <input type="number" class="form-control" id="project-page-luas_area" placeholder="Masukkan Luas Area">
            </div>
        </div>

        <div class="col-6">
            <div class="form-group">
                <label for="project-page-estimasi">Estimasi</label>
                <input type="number" class="form-control" id="project-page-estimasi" placeholder="Masukkan Estimasi Proyek (Dalam Bulan)">
            </div>
        </div>
    </div>

    <hr>

    <div class="form-row">
        <div class="col-6">
            <div class="form-group">
                <label for="project-page-sub_total">Sub Total</label>
                <input type="number" class="form-control" id="project-page-sub_total" placeholder="Masukkan Sub Total">
            </div>
        </div>

        <div class="col-6">
            <div class="form-group">
                <label for="project-page-cco">CCO</label>
                <input type="number" class="form-control" id="project-page-cco" placeholder="Masukkan CCO">
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="col-6 offset-6">
            <div class="form-group">
                <label for="project-page-total">Total</label>
                <input type="number" class="form-control" id="project-page-total" placeholder="Masukkan Total">
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="col-6">
            <div class="form-group">
                <label for="project-page-dp">DP</label>
                <input type="number" class="form-control" id="project-page-dp" placeholder="Masukkan DP">
            </div>
        </div>

        <div class="col-6">
            <div class="form-group">
                <label for="project-page-sisa">Sisa</label>
                <input type="number" class="form-control" id="project-page-sisa" value="0" readonly>
            </div>
        </div>
    </div>

@endsection

{{-- detail content --}}
@section('detail-content')
    
    {{-- your detail profile --}}
    <ul class="nav nav-tabs" id="project-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="project-detail-tab" data-toggle="tab" href="#project-detail-content" role="tab" aria-controls="project-detail-content" aria-selected="true">Informasi Detail</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="project-operasional-tab" data-toggle="tab" href="#project-operasional-content" role="tab" aria-controls="project-operasional-content" aria-selected="false">Operasional</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="project-pengajuan-operasional" data-toggle="tab" href="#project-pengajuan-content" role="tab" aria-controls="project-pengajuan-content" aria-selected="false">Pengajuan</a>
        </li>
    </ul>
    <div class="tab-content" id="project-tab-content">
        {{-- Informasi Detail --}}
        <div class="tab-pane fade show active" id="project-detail-content" role="tabpanel" aria-labelledby="project-detail-tab">
            {{-- Skk Proyek --}}
            <div class="my-3">
                <button class="btn text-left collapse-detail" data-toggle="collapse" data-target="#collapseSKKProjectDetail" aria-expanded="false" aria-controls="collapseSKKProjectDetail">
                    <i class="far fa-caret-square-down mr-2"></i>Sub Kas Kecil Proyek
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" id="new-button-skk-project">+</button>
            </div>
            <div class="collapse show" id="collapseSKKProjectDetail">
                <div class="table-responsive">
                    <table class="table table-sm table-striped" id="project-table-skk-detail">
                        <thead>
                            <tr>
                                <th>Nama</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="pb-2"></div>

            {{-- Pembayaran proyek --}}
            <div class="my-3">
                <button class="btn text-left collapse-detail" data-toggle="collapse" data-target="#collapseProjectPaymentDetail" aria-expanded="false" aria-controls="collapseProjectPaymentDetail">
                    <i class="far fa-caret-square-down mr-2"></i>Pembayaran Proyek
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" id="new-button-project-payment">+</button>
            </div>
            <div class="collapse show" id="collapseProjectPaymentDetail">
                <div class="table-responsive">
                    <table class="table table-sm table-striped" id="project-table-project-payment-detail">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Tanggal</th>
                                <th>Bank</th>
                                <th class="text-right">Total</th>
                                <th>DP?</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {{-- Operasional --}}
        <div class="tab-pane fade" id="project-operasional-content" role="tabpanel" aria-labelledby="project-operasional-tab">
            {{-- Operasional Proyek --}}
            <div class="my-3">
                <button class="btn text-left collapse-detail" data-toggle="collapse" data-target="#collapseProjectOperationalDetail" aria-expanded="false" aria-controls="collapseProjectOperationalDetail">
                    <i class="far fa-caret-square-down mr-2"></i>Operasional Proyek
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" id="new-button-project-payment">+</button>
            </div>
            <div class="collapse show" id="collapseProjectOperationalDetail">
                <div class="table-responsive">
                    <table class="table table-sm table-striped" id="project-table-project-operational-detail">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Jenis</th>
                                <th>Jenis Pembayaran</th>
                                <th>Status Pembayaran</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {{-- Pengajuan --}}
        <div class="tab-pane fade" id="project-pengajuan-content" role="tabpanel" aria-labelledby="project-pengajuan-operasional">
            {{-- Pengajuan SKK --}}
            <div class="my-3">
                <button class="btn text-left collapse-detail" data-toggle="collapse" data-target="#collapseSKKSubmissionDetail" aria-expanded="false" aria-controls="collapseSKKSubmissionDetail">
                    <i class="far fa-caret-square-down mr-2"></i>Pengajuan Sub Kas Kecil
                </button>
            </div>
            <div class="collapse show" id="collapseSKKSubmissionDetail">
                <div class="table-responsive">
                    <table class="table table-sm table-striped" id="project-table-skk-submission-detail">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Sub Kas Kecil</th>
                                <th>Status</th>
                                <th class="text-right">Total</th>
                                <th class="text-right">Total Disetujui</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('modal-content')

    {{-- your modals --}}
    {{-- can use include / code manualy here --}}

@endsection

@section('custom-css')

    {{-- your custom css --}}
    {{-- can use link href / style tag --}}

@endsection

@section('custom-js')

    {{-- your custom js --}}
    <script type="module" src="{{ asset('js/app/project/page.js') }}"></script>

@endsection