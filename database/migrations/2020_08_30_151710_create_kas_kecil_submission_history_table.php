<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKasKecilSubmissionHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kas_kecil_submission_history', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('kas_kecil_submission_id')->nullable();
            $table->date('date')->nullable();
            $table->uuid('approve_by_id')->nullable();
            $table->uuid('approve_status_id')->nullable();
            $table->text('notes')->nullable();
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('kas_kecil_submission_id')->references('id')->on('kas_kecil_submissions');
            $table->foreign('approve_by_id')->references('id')->on('contacts');
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
        Schema::dropIfExists('kas_kecil_submission_history');
    }
}
