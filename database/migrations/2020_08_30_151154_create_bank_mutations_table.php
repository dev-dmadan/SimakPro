<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankMutationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_mutations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('bank_id')->nullable();
            $table->date('date')->nullable();
            $table->decimal('credit', 19, 2)->default(0);
            $table->decimal('debt', 19, 2)->default(0);
            $table->decimal('saldo', 19, 2)->default(0);
            $table->text('notes')->nullable();
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('bank_id')->references('id')->on('banks');
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
        Schema::dropIfExists('bank_mutations');
    }
}
