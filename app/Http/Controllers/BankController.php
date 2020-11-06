<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Constants\PaginationConstant;
use App\Models\Bank;
use App\Models\BankMutation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Helpers\Filter;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.bank.list');
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
                'saldo' => 'required|numeric|gte:0',
                'active_status_id' => 'required|uuid'
            ];
            $data = $request->only(array_keys($rules));
            $validator = Validator::make($data, $rules);
            if($validator->fails()) {
                $errors = $validator->messages();
                throw new \Exception('Something wrong in form');
            }

            // insert bank
            $bank = new Bank();
            foreach($data as $key => $item) {
                if($item !== null) {
                    $bank->$key = $item;
                }
            }
            $bank->save();

            // insert mutasi bank
            $bankMutation = new BankMutation();
            $bankMutation->bank_id = $bank->id;
            $bankMutation->date = date('Y-m-d');
            $bankMutation->credit = $request->input('saldo');
            $bankMutation->saldo = $request->input('saldo');
            $bankMutation->notes = 'Saldo Awal';
            $bankMutation->save();

            $isSuccess = true;
            $id = $isSuccess ? $bank->id : null;
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
        $bank = Bank::with([
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
        return response()->json($bank);
    }

    public function showList(Request $request)
    {
        $banks = Bank::select('contacts.*')->with([
            'activeStatus' => function($query) {
                $query->select('id', 'name');
            },
        ])
        ->orderBy('created_at', 'DESC')
        ->paginate(PaginationConstant::Limit);

        if($request->isMethod(('post'))) {
            if($request->has('filters')) {
                $banks = Filter::buildFilters($banks, $request->input('filters'));
            }

            // if($request->has('sort')) {
            //     $banks = Sorting::buildSorting($banks, $request->input('sort'));
            // } else {
            //     $banks = $banks->orderBy('created_at', 'DESC');
            // }

            $banks = $banks->paginate(PaginationConstant::Limit);
        } else {
            $banks = $banks->orderBy('created_at', 'DESC')
            ->paginate(PaginationConstant::Limit);
        }

        return response()->json($banks);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
                'active_status_id' => 'required|uuid'
            ];
            $data = $request->only(array_keys($rules));
            $validator = Validator::make($data, $rules);
            if($validator->fails()) {
                $errors = $validator->messages();
                throw new \Exception('Something wrong in form');
            }

            $bank = Bank::find($id);
            foreach($data as $key => $item) {
                if($item === null && in_array($key, Bank::NULL_COLUMNS)) {
                    $bank->$key = $item;
                } else if($item !== null) {
                    $bank->$key = $item;
                }
            }
            
            $isSuccess = $bank->save();
            DB::commit();
        } catch (\Exception $e) {
            $message = $e->getMessage();
            DB::rollBack();
        }

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors,
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
            BankMutation::where('bank_id', $id)->delete();
            Bank::find($id)->delete();
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
