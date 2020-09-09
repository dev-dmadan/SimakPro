<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectOperationalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_operationals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->date('date')->nullable();
            $table->uuid('project_id')->nullable();
            $table->uuid('contact_id')->nullable();
            $table->uuid('operational_type_id')->nullable();
            $table->uuid('payment_type_id')->nullable();
            $table->uuid('payment_status_id')->nullable();
            $table->decimal('total', 19, 2)->default(0);
            $table->decimal('sisa', 19, 2)->default(0);
            $table->text('notes')->nullable();
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('contact_id')->references('id')->on('contacts');
            $table->foreign('operational_type_id')->references('id')->on('operational_types');
            $table->foreign('payment_type_id')->references('id')->on('payment_types');
            $table->foreign('payment_status_id')->references('id')->on('payment_status');
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
        Schema::dropIfExists('project_operationals');
    }
}
