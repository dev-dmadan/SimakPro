<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubKasKecilSubmissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_kas_kecil_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->string('code', 500)->unique()->nullable();
            $table->date('date')->nullable();
            $table->uuid('contact_id')->nullable();
            $table->uuid('project_id')->nullable();
            $table->decimal('total', 19, 2)->default(0);
            $table->text('notes')->nullable();
            $table->uuid('approve_status_id')->nullable();
            $table->decimal('approve_total', 19, 2)->default(0);
            $table->text('approve_notes')->nullable();
            $table->date('report_date')->nullable();
            $table->uuid('approve_report_status_id')->nullable();
            $table->text('report_notes')->nullable();
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('contact_id')->references('id')->on('contacts');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('approve_status_id')->references('id')->on('approve_status');
            $table->foreign('approve_report_status_id')->references('id')->on('approve_status');
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
        Schema::dropIfExists('sub_kas_kecil_submissions');
    }
}
