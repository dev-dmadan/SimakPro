@php
    $isMainProfileExists = (isset($useMainProfileSection) && $useMainProfileSection == true) || !isset($useMainProfileSection) ? true : false;
    $isSubProfileExists = (isset($useSubProfileSection) && $useSubProfileSection == true) || !isset($useMainProfileSection) ? true : false;
    $isProfileSectionExists = $isMainProfileExists || $isSubProfileExists ? true : false;

    $isMainContentExists = (isset($useMainContentSection) && $useMainContentSection == true) || !isset($useMainContentSection) ? true : false;
    $isDetailContentExists = (isset($useDetailContentSection) && $useDetailContentSection == true) || !isset($useDetailContentSection) ? true : false;
    $isContectSectionExists = $isMainContentExists || $isDetailContentExists ? true : false;

    $isProfileImageExists = isset($useProfileImage) && $useProfileImage == true ? true : false;
@endphp

@extends('layouts.blank')

@section('content')
    <input type="hidden" id="@yield('page-id')" value="{{ isset($id) ? $id : '' }}">
    <input type="hidden" id="page-mode" value="{{ isset($pageMode) ? $pageMode : 'Add' }}">

    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">@yield('page-title')</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        @yield('breadcrumb')
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">

            {{-- button group --}}
            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <button class="btn btn-success" id="@yield('save-button-id')">Save</button>
                        <a href="{{ url()->previous() }}" class="btn btn-primary">Close</a>
                        @yield('custom-button')
                    </div>
                </div>
            </div>

            <div class="row">
                @if ($isProfileSectionExists)
                    {{-- profile section --}}
                    <div class="col-4">
                        @if ($isMainProfileExists)
                            {{-- main profile --}}
                            <div class="row mb-3">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            @if ($isProfileImageExists)
                                                {{-- @include('layouts.skeleton.image') --}}
                                                <div class="">
                                                    <div class="mb-3 text-center">
                                                        <img class="profile-user-img img-fluid img-circle" src="" alt="profile image" id="profile-image">
                                                        <div class="d-flex align-items-end justify-content-center mt-2">
                                                            <button class="btn btn-sm btn-secondary mr-1" id="edit-profile-image"><i class="fa fa-edit"></i></button>
                                                            <button class="btn btn-sm btn-secondary" id="delete-profile-image"><i class="fa fa-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endif
                                    
                                            {{-- @include('layouts.skeleton.page.mainProfile') --}}
                                            <div class="">
                                                @yield('main-profile')
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                
                        @if ($isSubProfileExists)
                            {{-- sub profile --}}
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            {{-- @include('layouts.skeleton.page.subProfile') --}}
                                            <div class="">
                                                @yield('sub-profile')
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endif
                    </div>
                    {{-- end profile section --}}
                @endif

                @if ($isContectSectionExists)
                    {{-- content section --}}
                    <div class="{{ $isProfileSectionExists ? "col-8" : "col-12" }}">
                        @if ($isMainContentExists)
                            {{-- main content --}}
                            <div class="row mb-3">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            {{-- @include('layouts.skeleton.page.mainContent') --}}
                                            <div class="">
                                                @yield('main-content')
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                        
                        @if ($isDetailContentExists)
                            {{-- sub / detail content --}}
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            {{-- @include('layouts.skeleton.page.detailContent') --}}
                                            <div class="">
                                                @yield('detail-content')
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>
                    {{-- end content section --}}
                @endif
            </div>
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->

    @yield('modal-content')
@endsection