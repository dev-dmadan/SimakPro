<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('contact_id')->after('password');
            $table->uuid('active_status_id')->after('contact_id');
            $table->uuid('created_by_id')->after('active_status_id');
            $table->uuid('updated_by_id')->after('created_by_id');

            $table->foreign('contact_id')->references('id')->on('contacts');
            $table->foreign('active_status_id')->references('id')->on('active_status');
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
        //
    }
}
