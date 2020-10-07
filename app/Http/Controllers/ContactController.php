<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Constants\PaginationConstant;
use App\Models\Contact;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $route = $request->route()->uri;
        $isContact = $route == 'contacts' ? true : false;
        $isKasBesar = $route == 'kas-besar' ? true : false;
        $isKasKecil = $route == 'kas-kecil' ? true : false;
        $isSubKasKecil = $route == 'sub-kas-kecil' ? true : false;

        return view('pages.contact.list', [
            'isContact' => $isContact,
            'isKasBesar' => $isKasBesar,
            'isKasKecil' => $isKasKecil,
            'isSubKasKecil' => $isSubKasKecil
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $contact = new Contact();
        foreach($request->all() as $key => $item) {
            if($item != null || is_numeric($item)) {
                $contact->$key = $item;
            }
        }

        return response()->json($contact->save());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contact = Contact::with([
            'gender' => function($query) {
                $query->select('id', 'name');
            },
            'contactType' => function($query) {
                $query->select('id', 'name');
            },
            'activeStatus' => function($query) {
                $query->select('id', 'name');
            },
            'createdBy' => function($query) {
                $query->select('id', 'name');
            },
            'updatedBy' => function($query) {
                $query->select('id', 'name');
            },
        ])->find($id);
        return response()->json($contact);
    }

    public function showList()
    {
        $contacts = Contact::with([
            'gender' => function($query) {
                $query->select('id', 'name');
            },
            'contactType' => function($query) {
                $query->select('id', 'name');
            },
            'activeStatus' => function($query) {
                $query->select('id', 'name');
            },
        ])
        ->orderBy('created_at', 'DESC')
        ->paginate(PaginationConstant::Limit);

        return response()->json($contacts);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $isExist = is_null(Contact::find($id)) ? false : true;
        $contactType = Contact::find($id)->contactType();

        return $isExist ? view('pages.contact.page', [
            'id' => $id,
            'pageMode' => 'Edit',
            'contactType' => $contactType,
            'useMainProfileSection' => true,
            'useSubProfileSection' => false,
            'useMainContentSection' => true,
            'useDetailContentSection' => true,
            'useProfileImage' => true
        ]) : abort(404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        foreach($request->all() as $key => $item) {
            if($item == null && in_array($key, Contact::nullColumns)) {
                $contact->$key = $item;
            } else if($item != null || is_numeric($item)) {
                $contact->$key = $item;
            }
        }

        return response()->json($contact->save());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);
        return response()->json($contact->delete());
    }
}
