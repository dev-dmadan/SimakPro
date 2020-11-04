@php
    $_male = \App\Constants\GenderConstant::Male;
    $_female = \App\Constants\GenderConstant::Female;
@endphp

@extends('layouts.modal')

@section('modal-id', 'contact-modal')
@section('modal-save-id', 'contact-modal-save')
@section('modal-title', $title)
@section('modal-body')
    
    <div class="form-group">
        <label for="contact-modal-name">Nama</label>
        <input type="text" class="form-control" id="contact-modal-name" placeholder="Masukkan Nama">
        <div class="invalid-feedback contact-modal-name"></div>
    </div>

    <div class="form-group">
        <label for="contact-modal-birthplace">Tempat Lahir</label>
        <input type="text" class="form-control" id="contact-modal-birthplace" placeholder="Masukkan Tempat Lahir">
        <div class="invalid-feedback contact-modal-birthplace"></div>
    </div>

    <div class="form-group">
        <label for="contact-modal-birthdate">Tanggal Lahir</label>
        <input type="text" class="form-control" id="contact-modal-birthdate" placeholder="Masukkan Tanggal Lahir">
        <div class="invalid-feedback contact-modal-birthdate"></div>
    </div>

    <div class="form-group contact-modal-gender">
        <label>Jenis Kelamin</label>
        <br>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="contact-modal-gender" id="gender1" value="{{ $_male }}">
            <label class="form-check-label" for="gender1">Pria</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="contact-modal-gender" id="gender2"  value="{{ $_female }}">
            <label class="form-check-label" for="gender2">Wanita</label>
        </div>
        <div class="invalid-feedback contact-modal-gender"></div>
    </div>   

    <div class="form-group">
        <label for="contact-modal-phone_number">No. Telepon</label>
        <input type="text" class="form-control" id="contact-modal-phone_number" placeholder="Masukkan No. Telepon">
        <div class="invalid-feedback contact-modal-phone_number"></div>
    </div>

    <div class="form-group">
        <label for="contact-modal-email">Email</label>
        <input type="text" class="form-control" id="contact-modal-email" placeholder="Masukkan Email">
        <div class="invalid-feedback contact-modal-email"></div>
    </div>

    <div class="form-group">
        <label for="contact-modal-address">Alamat</label>
        <textarea class="form-control" id="contact-modal-address" placeholder="Masukkan Alamat"></textarea>
        <div class="invalid-feedback contact-modal-address"></div>
    </div>

    <div class="form-group">
        <label for="contact-modal-contact_type">Jenis Kontak</label>
        <select class="form-control" id="contact-modal-contact_type" style="width: 100%"></select>
        <div class="invalid-feedback contact-modal-contact_type"></div>
    </div>

    <div class="form-group">
        <label for="contact-modal-active_status">Status Aktif</label>
        <select class="form-control" id="contact-modal-active_status" style="width: 100%"></select>
        <div class="invalid-feedback contact-modal-active_status"></div>
    </div>

    <div class="form-group">
        <label for="contact-modal-saldo">Saldo</label>
        <input type="text" class="form-control" id="contact-modal-saldo" placeholder="Masukkan Saldo Awal">
        <div class="invalid-feedback contact-modal-saldo"></div>
    </div>

@endsection