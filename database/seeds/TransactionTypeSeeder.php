<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Constants\TransactionTypeConstant;

class TransactionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultValue = [
            "Uang Masuk" => TransactionTypeConstant::Income,
            "Uang Keluar" => TransactionTypeConstant::Expenditure
        ];

        $i = 1;
        foreach($defaultValue as $key => $value) {
            $uuid = Uuid::fromString($value);
            DB::table('transaction_types')->insert([
                'id' => $uuid,
                'name' => $key,
                'position' => $i,
            ]);
            $i++;
        }
    }
}
