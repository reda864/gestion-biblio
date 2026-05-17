<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('livre', function (Blueprint $table) {
            $table->integer('id_livre')->primary();
            $table->string('titre', 100)->nullable();
            $table->string('auteur', 100)->nullable();
            $table->string('isbn', 20)->nullable();
            $table->integer('nb_exemplaires')->nullable();
            $table->text('description')->nullable();
            $table->binary('image')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('livre');
    }
}; 