<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubKasKecilSubmissionDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_kas_kecil_submission_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->uuid('sub_kas_kecil_submission_id')->nullable();
            $table->uuid('operational_type_id')->nullable();
            $table->string('satuan', 250)->nullable();
            $table->unsignedSmallInteger('qty')->default(0);
            $table->decimal('price', 19, 2)->default(0);
            $table->decimal('sub_total', 19, 2)->default(0);
            $table->decimal('original_sub_total', 19, 2)->default(0);
            $table->decimal('sisa', 19, 2)->default(0);
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('sub_kas_kecil_submission_id', 'fk_sub_kas_kecil_submission_detail_id')->references('id')->on('sub_kas_kecil_submissions');
            $table->foreign('operational_type_id')->references('id')->on('operational_types');
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
        Schema::dropIfExists('sub_kas_kecil_submission_details');
    }
}
