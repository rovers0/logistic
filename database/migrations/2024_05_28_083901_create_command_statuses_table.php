<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('command_statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('command_mobile_id')->default(0)->index();
            $table->unsignedBigInteger('user_id')->default(0);

            $table->tinyInteger('status')->default(0);
            $table->json('properties')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('command_statuses');
    }
};
