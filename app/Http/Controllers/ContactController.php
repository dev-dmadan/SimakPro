<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Constants\PaginationConstant;
use App\Models\Contact;
use Illuminate\Support\Facades\Validator;
use App\Constants\ContactTypeConstant;
use App\Helpers\Filter;

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

        $title = '';
        if($isKasBesar) {
            $title = 'Kas Besar';
        } else if($isKasKecil) {
            $title = 'Kas Kecil';
        } else if($isSubKasKecil) {
            $title = 'Sub Kas Kecil';
        } else {
            $title = 'Kontak';
        }

        $contactType = [
            'KasBesar' => ContactTypeConstant::KasBesar,
            'KasKecil' => ContactTypeConstant::KasKecil,
            'SubKasKecil' => ContactTypeConstant::SubKasKecil,
        ];

        return view('pages.contact.list', [
            'title' => $title,
            'isContact' => $isContact,
            'isKasBesar' => $isKasBesar,
            'isKasKecil' => $isKasKecil,
            'isSubKasKecil' => $isSubKasKecil,
            'contactType' => $contactType
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
        $isSuccess = false;
        $message = null;
        $errors = null;

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:500',
            'birthplace' => 'string|max:250', 
            'birthdate' => 'nullable|date',
            'gender_id' => 'required|uuid',
            'address' => 'string',
            'email' => 'email|max:100',
            'phone_number' => 'string|max:50',
            'contact_type_id' => 'required|uuid',
            'active_status_id' => 'required|uuid',
            'saldo' => 'numeric|max:99999999999999999'
        ]);
        
        if(!$validator->fails()) {
            $contact = new Contact();
            foreach($request->all() as $key => $item) {
                if($item != null || is_numeric($item)) {
                    $contact->$key = $item;
                }
            }
            $isSuccess = $contact->save();
        }
        $errors = $validator->fails() ? $validator->messages() : null;

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors
        ]);
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

    public function showList(Request $request)
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
        ]);

        if($request->isMethod(('post'))) {
            $contacts = Filter::buildFilters($contacts, $request->input('filters'))
                ->orderBy('created_at', 'DESC')
                ->paginate(PaginationConstant::Limit);
        } else {
            $contacts = $contacts->orderBy('created_at', 'DESC')
            ->paginate(10);
        }

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
        $contactData = Contact::find($id);
        $isExist = is_null($contactData) ? false : true;
        $contactType = $contactData->contactType();

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
