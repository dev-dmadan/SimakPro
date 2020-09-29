<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Constants\AccessConstant;

class AccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultValue = [
            "Home" => [
                "id" => AccessConstant::Home,
                "title" => "Beranda",
                "icon" => '<i class="nav-icon fas fa-home"></i>',
                "route" => "/",
                "parent_id" => null
            ],
            "Bank" => [
                "id" => AccessConstant::Bank,
                "title" => "Bank",
                "icon" => '<i class="nav-icon fas fa-university"></i>',
                "route" => "/banks",
                "parent_id" => null
            ],
            "Project" => [
                "id" => AccessConstant::Project,
                "title" => "Proyek",
                "icon" => '<i class="nav-icon fas fa-project-diagram"></i>',
                "route" => "/projects",
                "parent_id" => null
            ],
            "ProjectOperational" => [
                "id" => AccessConstant::ProjectOperational,
                "title" => "Operasional Proyek",
                "icon" => '<i class="nav-icon fas fa-money-check-alt"></i>',
                "route" => "/project-operationals",
                "parent_id" => null
            ],
            "CompanyOperational" => [
                "id" => AccessConstant::CompanyOperational,
                "title" => "Operasional Perusahaan",
                "icon" => '<i class="nav-icon fas fa-funnel-dollar"></i>',
                "route" => "/company-operationals",
                "parent_id" => null
            ],
            "Operational" => [
                "id" => AccessConstant::Operational,
                "title" => "Operasional",
                "icon" => '<i class="nav-icon fas fa-wallet"></i>',
                "route" => "/oeprationals",
                "parent_id" => null
            ],
            "KasKecilSubmission" => [
                "id" => AccessConstant::KasKecilSubmission,
                "title" => "Pengajuan Kas Kecil",
                "icon" => '<i class="nav-icon fas fa-coins"></i>',
                "route" => "/kas-kecil-submissions",
                "parent_id" => null
            ],
            "SubKasKecilSubmission" => [
                "id" => AccessConstant::SubKasKecilSubmission,
                "title" => "Pengajuan Sub Kas Kecil",
                "icon" => '<i class="nav-icon fas fa-coins"></i>',
                "route" => "/sub-kas-kecil-submissions",
                "parent_id" => null
            ],
            "Contact" => [
                "id" => AccessConstant::Contact,
                "title" => "Kontak",
                "icon" => '<i class="nav-icon fas fa-users"></i>',
                "route" => "/contacts",
                "parent_id" => null
            ],
            "KasBesar" => [
                "id" => AccessConstant::KasBesar,
                "title" => "Kas Besar",
                "icon" => '<i class="nav-icon fas fa-user-tie"></i>',
                "route" => "/contacts/kas-besar",
                "parent_id" => null
            ],
            "KasKecil" => [
                "id" => AccessConstant::KasKecil,
                "title" => "Kas Kecil",
                "icon" => '<i class="nav-icon fas fa-user-friends"></i>',
                "route" => "/contacts/kas-kecil",
                "parent_id" => null
            ],
            "SubKasKecil" => [
                "id" => AccessConstant::SubKasKecil,
                "title" => "Sub Kas Kecil",
                "icon" => '<i class="nav-icon fas fa-users-cog"></i>',
                "route" => "/contacts/sub-kas-kecil",
                "parent_id" => null
            ],
            "User" => [
                "id" => AccessConstant::User,
                "title" => "User",
                "icon" => '<i class="nav-icon fas fa-user"></i>',
                "route" => "/users",
                "parent_id" => null
            ],
            "Lookup" => [
                "id" => AccessConstant::Lookup,
                "title" => "Lookup",
                "icon" => '<i class="nav-icon fas fa-archive"></i>',
                "route" => "/lookups",
                "parent_id" => null
            ]
        ];

        $i = 1;
        foreach($defaultValue as $key => $value) {
            $uuid = Uuid::fromString($value['id']);
            DB::table('access')->insert([
                'id' => $uuid,
                'name' => $key,
                'title' => $value['title'],
                'icon' => $value['icon'],
                'route' => $value['route'],
                'parent_id' => $value['parent_id'],
                'position' => $i,
            ]);
            $i++;
        }
    }
}
