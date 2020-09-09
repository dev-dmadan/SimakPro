<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Constants\PaymentTypeConstant;

class PaymentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultValue = [
            "Tunai" => PaymentTypeConstant::Cash,
            "Kredit" => PaymentTypeConstant::Credit
        ];

        $i = 1;
        foreach($defaultValue as $key => $value) {
            $uuid = Uuid::fromString($value);
            DB::table('payment_types')->insert([
                'id' => $uuid,
                'name' => $key,
                'position' => $i,
            ]);
            $i++;
        }
    }
}
