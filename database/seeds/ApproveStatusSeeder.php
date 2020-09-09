<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Constants\ApproveStatusConstant;

class ApproveStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultValue = [
            "Pending" => ApproveStatusConstant::Pending,
            "Perbaiki" => ApproveStatusConstant::FixIt,
            "Ditolak" => ApproveStatusConstant::Rejected,
            "Disetujui" => ApproveStatusConstant::Approved
        ];

        $i = 1;
        foreach($defaultValue as $key => $value) {
            $uuid = Uuid::fromString($value);
            DB::table('approve_status')->insert([
                'id' => $uuid,
                'name' => $key,
                'position' => $i,
            ]);
            $i++;
        }
    }
}
