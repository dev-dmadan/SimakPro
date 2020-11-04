@php
    $isMainProfileExists = (isset($useMainProfileSection) && $useMainProfileSection == true) ? true : false;
    $isSubProfileExists = (isset($useSubProfileSection) && $useSubProfileSection == true) ? true : false;
    $isProfileImageExists = (isset($useProfileImage) && $useProfileImage == true) ? true : false;
    $isProfileSectionExists = $isMainProfileExists || $isSubProfileExists ? true : false;

    $isMainContentExists = (isset($useMainContentSection) && $useMainContentSection == true) ? true : false;
    $isDetailContentExists = (isset($useDetailContentSection) && $useDetailContentSection == true) ? true : false;
    $isContentSectionExists = $isMainContentExists || $isDetailContentExists ? true : false;
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
                <div class="col-8">
                    <div class="mb-3">
                        <button class="btn btn-success" id="@yield('save-button-id')">Save</button>
                        <button class="btn btn-primary" onclick="history.go(-1)">Close</button>
                        @yield('custom-button')
                    </div>
                </div>
                <div class="col-4">
                    @if (isset($pageMode) && $pageMode == 'Edit')
                        <div class="float-right">
                            <button class="btn btn-outline-primary" type="button" id="view-button">View</button>
                            <button class="btn btn-outline-primary" type="button" id="refresh-button"><i class="fas fa-sync-alt"></i></button>
                        </div>
                    @endif
                </div>
            </div>

            <div class="row">

                @if ($isProfileSectionExists)
        
                    <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
        
                        @if ($isMainProfileExists)
                            @include('layouts.partials.pages.main_profile')
                        @endif
        
                        @if ($isSubProfileExists)
                            @include('layouts.partials.pages.sub_profile')
                        @endif
        
                    </div>
        
                @endif
        
                @if ($isContentSectionExists)
        
                    <div class="col">
        
                        @if ($isMainContentExists)
                            @include('layouts.partials.pages.main_content')
                        @endif
        
                        @if ($isDetailContentExists)
                            @include('layouts.partials.pages.detail_content')
                        @endif
        
                    </div>
        
                @endif
        
            </div>
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->

    @yield('modal-content')
    
@endsection