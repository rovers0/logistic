<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'email_verified_at', 'remember_token', 'phone', 'role', 'allowed', 'image', 'setting'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public static function checkUser ($request) {
        $user = self::where('phone', $request->phone)->first();
        if (!$user) {
            return false;
        }
        if (!Hash::check($request->password, $user->makeVisible(['password'])->password)) {
            return false;
        }
        $user->makeHidden(['password']);
        return $user;
    }

    public function setting()
    {
        return $this->belongsTo(Setting::class, 'id', 'user_id');
    }
}
