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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 12)->after('remember_token');
            $table->string('role', 20)->default('admin')->after('phone');
            $table->text('allowed')->nullable()->after('role');
            $table->text('image')->nullable()->after('allowed');
            $table->text('setting')->nullable()->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone');
            $table->dropColumn('role');
            $table->dropColumn('allowed');
            $table->dropColumn('image');
            $table->dropColumn('setting');
        });
    }
};
