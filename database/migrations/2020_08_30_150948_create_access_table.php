<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('access', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 250);
            $table->string('title', 250)->nullable();
            $table->string('icon', 250)->nullable();
            $table->string('route', 250);
            $table->unsignedSmallInteger('position');
            $table->uuid('parent_id')->nullable();
            $table->timestamps();

            // $table->foreign('parent_id')->references('id')->on('access');
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
        Schema::dropIfExists('access');
    }
}
