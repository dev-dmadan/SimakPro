<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyOperationalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_operationals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->date('date')->nullable();
            $table->uuid('bank_id')->nullable();
            $table->uuid('contact_id')->nullable();
            $table->uuid('operational_type_id')->nullable();
            $table->uuid('transaction_type_id')->nullable();
            $table->decimal('total', 19, 2)->default(0);
            $table->text('notes')->nullable();
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('bank_id')->references('id')->on('banks');
            $table->foreign('contact_id')->references('id')->on('contacts');
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
        Schema::dropIfExists('company_operationals');
    }
}
