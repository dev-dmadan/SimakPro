<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Constants\ContactTypeConstant;

class ContactTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultValue = [
            'System Administrator' => ContactTypeConstant::SystemAdministrator,
            'Owner' => ContactTypeConstant::Owner,
            'Kas Besar' => ContactTypeConstant::KasBesar,
            'Kas Kecil' => ContactTypeConstant::KasKecil,
            'Sub Kas Kecil' => ContactTypeConstant::SubKasKecil,
            'Pelanggan' => ContactTypeConstant::Customer,
            'Contact Person' => ContactTypeConstant::ContactPerson,
        ];

        $i = 1;
        foreach($defaultValue as $key => $value) {
            $uuid = Uuid::fromString($value);
            DB::table('contact_types')->insert([
                'id' => $uuid,
                'name' => $key,
                'position' => $i,
            ]);
            $i++;
        }
    }
}
