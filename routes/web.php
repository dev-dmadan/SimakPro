<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/** Example */
    Route::get('/example/section', function () {
        return view('_example.section');
    });
    Route::get('/example/page1', function () {
        return view('_example.page', [
            'id' => '1',
            'pageMode' => 'Add', // 'Add || Edit'
            // 'useMainProfileSection' => true, // optional. if not set, this value will be true
            // 'useSubProfileSection' => true, // optional. if not set, this value will be true
            // 'useMainContentSection' => true, // optional. if not set, this value will be true
            // 'useDetailContentSection' => true, // optional. if not set, this value will be true
            'useProfileImage' => true // optional
        ]);
    });
    Route::get('/example/page2', function () {
        return view('_example.page', [
            'id' => '1',
            'pageMode' => 'Add', // 'Add || Edit'
            'useMainProfileSection' => true, // optional. if not set, this value will be true
            'useSubProfileSection' => false, // optional. if not set, this value will be true
            'useMainContentSection' => true, // optional. if not set, this value will be true
            'useDetailContentSection' => true, // optional. if not set, this value will be true
            'useProfileImage' => true // optional
        ]);
    });
    Route::get('/example/page3', function () {
        return view('_example.page', [
            'id' => '1',
            'pageMode' => 'Add', // 'Add || Edit'
            'useMainProfileSection' => true, // optional. if not set, this value will be true
            'useSubProfileSection' => false, // optional. if not set, this value will be true
            'useMainContentSection' => true, // optional. if not set, this value will be true
            'useDetailContentSection' => false, // optional. if not set, this value will be true
            // 'useProfileImage' => true // optional
        ]);
    });
    Route::get('/example/page4', function () {
        return view('_example.page', [
            'id' => '1',
            'pageMode' => 'Add', // 'Add || Edit'
            'useMainProfileSection' => false, // optional. if not set, this value will be true
            'useSubProfileSection' => false, // optional. if not set, this value will be true
            'useMainContentSection' => true, // optional. if not set, this value will be true
            'useDetailContentSection' => true, // optional. if not set, this value will be true
            // 'useProfileImage' => true // optional
        ]);
    });
/** End Example */

/** Project */
    Route::get('/projects', 'ProjectController@index');
    Route::get('/projects/create', 'ProjectController@create');
    Route::post('/projects', 'ProjectController@store');
    Route::get('/projects/list', 'ProjectController@showList');
    Route::get('/projects/{id}', 'ProjectController@show');
    Route::get('/projects/{id}/edit', 'ProjectController@edit');
    Route::put('/projects/{id}', 'ProjectController@update');
    Route::delete('/projects/{id}', 'ProjectController@destroy');
/** End Project */

/** Contact */
    Route::get('/contacts', 'ContactController@index');
    Route::get('/contacts/create', 'ContactController@create');
    Route::post('/contacts', 'ContactController@store');
    Route::get('/contacts/list', 'ContactController@showList');
    Route::get('/contacts/{id}', 'ContactController@show');
    Route::get('/contacts/{id}/edit', 'ContactController@edit');
    Route::put('/contacts/{id}', 'ContactController@update');
    Route::delete('/contacts/{id}', 'ContactController@destroy');

    // kas besar
    Route::get('/kas-besar', 'ContactController@index');
    Route::get('/kas-besar/{id}', 'ContactController@show');
    Route::get('/kas-besar/{id}/edit', 'ContactController@edit');

    // kas kecil
    Route::get('/kas-kecil', 'ContactController@index');
    Route::get('/kas-kecil/{id}', 'ContactController@show');
    Route::get('/kas-kecil/{id}/edit', 'ContactController@edit');

    // sub kas kecil
    Route::get('/sub-kas-kecil', 'ContactController@index');
    Route::get('/sub-kas-kecil/{id}', 'ContactController@show');
    Route::get('/sub-kas-kecil/{id}/edit', 'ContactController@edit');
/** End Contact */