<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Constants\PaginationConstant;
use App\Models\Contact;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Constants\ContactTypeConstant;
use App\Helpers\Filter;
use App\Helpers\Sorting;
use Illuminate\Support\Str;

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
        $id = null;
        $isSuccess = false;
        $message = null;
        $errors = null;
        
        DB::beginTransaction();
        try {
            $rules = [
                'name' => 'required|string|max:500',
                'birthplace' => 'nullable|string|max:250', 
                'birthdate' => 'nullable|date',
                'gender_id' => 'required|uuid',
                'address' => 'nullable|string',
                'email' => 'nullable|email|max:100',
                'phone_number' => 'nullable|string|max:50',
                'contact_type_id' => 'required|uuid',
                'active_status_id' => 'required|uuid',
                'saldo' => [
                    Rule::requiredIf(function () use ($request) {
                        $isRequired = false;
                        $saldoRequired = array_map(function($item) {
                            return strtolower($item);
                        }, [ContactTypeConstant::KasKecil, ContactTypeConstant::SubKasKecil]);
                        if($request->has('contact_type_id') && in_array(strtolower($request->input('contact_type_id')), $saldoRequired)) {
                            $isRequired = true;
                        }
        
                        return $isRequired;
                    }),
                    'nullable',
                    'numeric',
                    'max:99999999999999999'
                ]        
            ];
            $data = $request->only(array_keys($rules));
            $validator = Validator::make($data, $rules);
            if($validator->fails()) {
                $errors = $validator->messages();
                throw new \Exception('Something wrong in form');
            }

            $contact = new Contact();
            foreach($data as $key => $item) {
                if($item !== null) {
                    $contact->$key = $item;
                }
            }

            $isSuccess = $contact->save();
            $id = $isSuccess ? $contact->id : null;
            DB::commit();
        } catch (\Exception $e) {
            $message = $e->getMessage();
            DB::rollBack();
        }

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors,
            'id' => $id
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
        $contacts = Contact::select('contacts.*')->with([
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
            if($request->has('filters')) {
                $contacts = Filter::buildFilters($contacts, $request->input('filters'));
            }

            // if($request->has('sort')) {
            //     $contacts = Sorting::buildSorting($contacts, $request->input('sort'));
            // } else {
            //     $contacts = $contacts->orderBy('created_at', 'DESC');
            // }

            $contacts = $contacts->paginate(PaginationConstant::Limit);
        } else {
            $contacts = $contacts->orderBy('created_at', 'DESC')
            ->paginate(PaginationConstant::Limit);
        }

        return response()->json($contacts);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        $contactData = Contact::find($id);
        $isExist = is_null($contactData) ? false : true;
        if(!$isExist) {
            abort(404);
        }

        $contactType = [
            'KasBesar' => ContactTypeConstant::KasBesar,
            'KasKecil' => ContactTypeConstant::KasKecil,
            'SubKasKecil' => ContactTypeConstant::SubKasKecil,
        ];

        $route = $request->route()->uri;
        $isContact = Str::contains($route, 'contacts') ? true : false;
        $isKasBesar = Str::contains($route, 'kas-besar') ? true : false;
        $isKasKecil = Str::contains($route, 'kas-kecil') ? true : false;
        $isSubKasKecil = Str::contains($route, 'sub-kas-kecil') ? true : false;

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

        return view('pages.contact.page', [
            'id' => $id,
            'title' => $title,
            'pageMode' => 'Edit',
            'isContact' => $isContact,
            'isKasBesar' => $isKasBesar,
            'isKasKecil' => $isKasKecil,
            'isSubKasKecil' => $isSubKasKecil,
            'contactType' => $contactType,
            'useMainProfileSection' => true,
            'useSubProfileSection' => false,
            'useMainContentSection' => true,
            'useDetailContentSection' => true,
            'useProfileImage' => true
        ]);
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
        $isSuccess = false;
        $message = null;
        $errors = null;

        DB::beginTransaction();
        try {
            $rules = [
                'name' => 'required|string|max:500',
                'birthplace' => 'nullable|string|max:250', 
                'birthdate' => 'nullable|date',
                'gender_id' => 'required|uuid',
                'address' => 'nullable|string',
                'email' => 'nullable|email|max:100',
                'phone_number' => 'nullable|string|max:50',
                'contact_type_id' => 'required|uuid',
                'active_status_id' => 'required|uuid',
                'saldo' => [
                    Rule::requiredIf(function () use ($request) {
                        $isRequired = false;
                        $saldoRequired = array_map(function($item) {
                            return strtolower($item);
                        }, [ContactTypeConstant::KasKecil, ContactTypeConstant::SubKasKecil]);
                        if($request->has('contact_type_id') && in_array(strtolower($request->input('contact_type_id')), $saldoRequired)) {
                            $isRequired = true;
                        }
        
                        return $isRequired;
                    }),
                    'nullable',
                    'numeric',
                    'max:99999999999999999'
                ]        
            ];
            $data = $request->only(array_keys($rules));
            $validator = Validator::make($data, $rules);
            if($validator->fails()) {
                $errors = $validator->messages();
                throw new \Exception('Something wrong in form');
            }

            $contact = Contact::find($id);
            foreach($data as $key => $item) {
                if($item === null && in_array($key, Contact::NULL_COLUMNS)) {
                    $contact->$key = $item;
                } else if($item !== null) {
                    $contact->$key = $item;
                }
            }

            $isSuccess = $contact->save();
            DB::commit();
        } catch (\Exception $e) {
            $message = $e->getMessage();
            DB::rollBack();
        }

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $isSuccess = false;
        $message = null;
        $errors = null;

        DB::beginTransaction();
        try {
            Contact::find($id)->delete();
            DB::commit();
        } catch (\Exception $e) {
            $message = $e->getMessage();
            $errors = $e;

            DB::rollBack();
        }

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors
        ]);
    }
}
