<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessRightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('access_rights', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('access_id')->nullable();
            $table->boolean('is_can_insert')->default(false);
            $table->boolean('is_can_update')->default(false);
            $table->boolean('is_can_delete')->default(false);
            $table->boolean('is_can_read')->default(false);
            $table->timestamps();

            $table->foreign('access_id')->references('id')->on('access');
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
        Schema::dropIfExists('access_rights');
    }
}
