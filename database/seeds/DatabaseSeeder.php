<?php

use App\Constants\TransactionTypeConstant;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        $this->call([
            ActiveStatusSeeder::class,
            ApproveStatusSeeder::class,
            ContactTypeSeeder::class,
            GenderSeeder::class,
            OperationalTypeSeeder::class,
            PaymentStatusSeeder::class,
            PaymentTypeSeeder::class,
            ProjectStatusSeeder::class,
            TransactionTypeSeeder::class,
            AccessSeeder::class
        ]);
    }
}
