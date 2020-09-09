<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Constants\GenderConstant;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultValue = [
            "Pria" => GenderConstant::Male,
            "Wanita" => GenderConstant::Female
        ];

        $i = 1;
        foreach($defaultValue as $key => $value) {
            $uuid = Uuid::fromString($value);
            DB::table('genders')->insert([
                'id' => $uuid,
                'name' => $key,
                'position' => $i,
            ]);
            $i++;
        }
    }
}
