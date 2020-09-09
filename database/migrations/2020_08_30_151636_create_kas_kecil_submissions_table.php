<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKasKecilSubmissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kas_kecil_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->date('date')->nullable();
            $table->uuid('contact_id')->nullable();
            $table->uuid('bank_id')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('total', 19, 2)->default(0);
            $table->uuid('approve_status_id')->nullable();
            $table->text('approve_notes')->nullable();
            $table->decimal('approve_total', 19, 2)->default(0);
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('contact_id')->references('id')->on('contacts');
            $table->foreign('bank_id')->references('id')->on('banks');
            $table->foreign('approve_status_id')->references('id')->on('approve_status');
            $table->foreign('created_by_id')->references('id')->on('contacts');
            $table->foreign('updated_by_id')->references('id')->on('contacts');
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
        Schema::dropIfExists('kas_kecil_submissions');
    }
}
