@php
    $_male = \App\Constants\GenderConstant::Male;
    $_female = \App\Constants\GenderConstant::Female;
@endphp

@extends('layouts.page')

{{-- page title --}}
@section('page-title', 'Form '.$title)

@section('save-button-id', 'contact-page-save')

{{-- input hidden page id --}}
@section('page-id', 'contact-page-id')

{{-- page breadcrumb --}}
@section('breadcrumb')
    @if ($isContact)

        <li class="breadcrumb-item active">{{ $title }}</li>

    @else

        <li class="breadcrumb-item">Kontak</li>
        <li class="breadcrumb-item active">{{ $title }}</li>

    @endif
@endsection

{{-- main profile --}}
@section('main-profile')
    
    {{-- your main profile --}}
    <div class="form-group">
        <label for="contact-page-name">Nama</label>
        <input type="text" class="form-control" id="contact-page-name" placeholder="Masukkan Nama">
        <div class="invalid-feedback contact-page-name"></div>
    </div>
    <div class="form-group">
        <label for="contact-page-birthplace">Tempat Lahir</label>
        <input type="text" class="form-control" id="contact-page-birthplace" placeholder="Masukkan Tempat Lahir">
        <div class="invalid-feedback contact-page-birthplace"></div>
    </div>
    <div class="form-group">
        <label for="contact-page-birthdate">Tanggal Lahir</label>
        <input type="text" class="form-control" id="contact-page-birthdate" placeholder="Masukkan Tanggal Lahir">
        <div class="invalid-feedback contact-page-birthdate"></div>
    </div>
    <div class="form-group contact-page-gender">
        <label>Jenis Kelamin</label>
        <br>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="contact-page-gender" id="gender1" value="{{ $_male }}">
            <label class="form-check-label" for="gender1">Pria</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="contact-page-gender" id="gender2" value="{{ $_female }}">
            <label class="form-check-label" for="gender2">Wanita</label>
        </div>
        <div class="invalid-feedback contact-page-gender"></div>
    </div>
    <div class="form-group">
        <label for="contact-page-contact_type">Jenis Kontak</label>
        <select class="form-control" id="contact-page-contact_type" style="width: 100%"></select>
        <div class="invalid-feedback contact-page-contact_type"></div>
    </div>
    <div class="form-group">
        <label for="contact-page-active_status">Status Aktif</label>
        <select class="form-control" id="contact-page-active_status" style="width: 100%"></select>
        <div class="invalid-feedback contact-page-active_status"></div>
    </div>

@endsection

{{-- main content --}}
@section('main-content')
    
    {{-- your main content --}}
    <div class="form-row">
        <div class="col-6">
            <div class="form-group">
                <label for="contact-page-saldo">Saldo</label>
                <input type="text" class="form-control" id="contact-page-saldo" placeholder="Masukkan Saldo Awal" {{ $pageMode == 'Edit' ? 'readonly' : '' }}>
                <div class="invalid-feedback contact-page-saldo"></div>
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="col-6">
            <div class="form-group">
                <label for="contact-page-phone_number">No. Telepon</label>
                <input type="text" class="form-control" id="contact-page-phone_number" placeholder="Masukkan No. Telepon">
                <div class="invalid-feedback contact-page-phone_number"></div>
            </div>
        </div>

        <div class="col-6">
            <div class="form-group">
                <label for="contact-page-email">Email</label>
                <input type="text" class="form-control" id="contact-page-email" placeholder="Masukkan Email">
                <div class="invalid-feedback contact-page-email"></div>
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="col">
            <div class="form-group">
                <label for="contact-page-address">Alamat</label>
                <textarea class="form-control" id="contact-page-address" placeholder="Masukkan Alamat" rows="3"></textarea>
                <div class="invalid-feedback contact-page-address"></div>
            </div>
        </div>
    </div>

@endsection

{{-- detail content --}}
@section('detail-content')
    
    {{-- your detail profile --}}
    <ul class="nav nav-tabs" id="project-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="contact-operational-tab" data-toggle="tab" href="#contact-operational-content" role="tab" aria-controls="contact-operational-content" aria-selected="true">Operasional</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="contact-history-transaksi-tab" data-toggle="tab" href="#contact-history-transaksi-content" role="tab" aria-controls="contact-history-transaksi-content" aria-selected="true">History Transaksi</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="contact-history-pengajuan-tab" data-toggle="tab" href="#contact-history-pengajuan-content" role="tab" aria-controls="contact-history-pengajuan-content" aria-selected="false">History Pengajuan</a>
        </li>
    </ul>
    <div class="tab-content" id="project-tab-content">
        {{-- Operational --}}
        <div class="tab-pane fade show active" id="contact-operational-content" role="tabpanel" aria-labelledby="contact-operational-tab">
            {{-- Operational --}}
            <div class="my-3">
                <button class="btn text-left collapse-detail" data-toggle="collapse" data-target="#collapseOperational" aria-expanded="false" aria-controls="collapseOperational">
                    <i class="far fa-caret-square-down mr-2"></i>Operasional
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" id="new-button-operational">+</button>
            </div>
            <div class="collapse show" id="collapseOperational">
                <div class="table-responsive">
                    <table class="table table-sm table-striped" id="contact-table-operational-detail">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th class="text-right">Total</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {{-- History Transaksi --}}
        <div class="tab-pane fade" id="contact-history-transaksi-content" role="tabpanel" aria-labelledby="contact-history-transaksi-tab">
            {{-- History transaksi --}}
            <div class="my-3">
                <button class="btn text-left collapse-detail" data-toggle="collapse" data-target="#collapseHistoryTransaksi" aria-expanded="false" aria-controls="collapseHistoryTransaksi">
                    <i class="far fa-caret-square-down mr-2"></i>History Transaksi
                </button>
            </div>
            <div class="collapse show" id="collapseHistoryTransaksi">
                <div class="table-responsive">
                    <table class="table table-sm table-striped" id="contact-table-transaction-history-detail">
                        <thead>
                            <tr>
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
        </div>

        {{-- History Pengajuan --}}
        <div class="tab-pane fade" id="contact-history-pengajuan-content" role="tabpanel" aria-labelledby="contact-history-pengajuan-tab">
            {{-- History Pengajuan --}}
            <div class="my-3">
                <button class="btn text-left collapse-detail" data-toggle="collapse" data-target="#collapseHistoryPengajuan" aria-expanded="false" aria-controls="collapseHistoryPengajuan">
                    <i class="far fa-caret-square-down mr-2"></i>History Pengajuan
                </button>
            </div>
            <div class="collapse show" id="collapseHistoryPengajuan">
                <div class="table-responsive">

                    {{-- pengajuan kas kecil --}}
                    <table class="table table-sm table-striped" id="contact-table-kas-kecil-submission-history-detail">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th class="text-right">Total</th>
                                <th>Status</th>
                                <th class="text-right">Total Disetujui</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                    {{-- pengajuan sub kas kecil --}}
                    <table class="table table-sm table-striped" id="contact-table-sub-kas-kecil-submission-history-detail">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th class="text-right">Total</th>
                                <th>Status</th>
                                <th class="text-right">Total Disetujui</th>
                                <th>Keterangan</th>
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
    <script>
        const _title = @json($title, JSON_PRETTY_PRINT);
        const _isContact = @json($isContact, JSON_PRETTY_PRINT);
        const _isKasBesar = @json($isKasBesar, JSON_PRETTY_PRINT);
        const _isKasKecil = @json($isKasKecil, JSON_PRETTY_PRINT);
        const _isSubKasKecil = @json($isSubKasKecil, JSON_PRETTY_PRINT);
        const _contactType = @json($contactType, JSON_PRETTY_PRINT);
        const _gender = @json(['male' => $_male, 'female' => $_female], JSON_PRETTY_PRINT);
    </script>
    <script type="module" src="{{ asset('js/app/contact/page.js') }}"></script>

@endsection