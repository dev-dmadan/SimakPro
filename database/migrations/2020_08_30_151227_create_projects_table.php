<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->string('code', 500)->unique()->nullable();
            $table->string('owner', 500)->nullable();
            $table->date('date')->nullable();
            $table->string('city', 100)->nullable();
            $table->text('address')->nullable();
            $table->unsignedDecimal('luas_area', 8, 2)->default(0);
            $table->unsignedTinyInteger('estimasi')->default(0);
            $table->decimal('sub_total', 19, 2)->default(0);
            $table->decimal('cco', 19, 2)->default(0);
            $table->decimal('total', 19, 2)->default(0);
            $table->decimal('dp', 19, 2)->default(0);
            $table->decimal('sisa', 19, 2)->default(0);
            $table->unsignedTinyInteger('progress')->default(0);
            $table->uuid('project_status_id')->nullable();
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('project_status_id')->references('id')->on('project_status');
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
        Schema::dropIfExists('projects');
    }
}
