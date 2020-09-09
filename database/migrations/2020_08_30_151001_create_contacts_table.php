<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->string('birthplace', 250)->nullable();
            $table->date('birthdate')->nullable();
            $table->uuid('gender_id')->nullable();
            $table->text('address')->nullable();
            $table->string('email', 100)->unique()->nullable();
            $table->string('phone_number', 50)->nullable();
            $table->text('image')->nullable();
            $table->uuid('contact_type_id')->nullable();
            $table->uuid('active_status_id')->nullable();
            $table->decimal('saldo', 19, 2)->default(0);
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('gender_id')->references('id')->on('genders');
            $table->foreign('contact_type_id')->references('id')->on('contact_types');
            $table->foreign('active_status_id')->references('id')->on('active_status');
            // $table->foreign('created_by_id')->references('id')->on('contacts');
            // $table->foreign('updated_by_id')->references('id')->on('contacts');
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
