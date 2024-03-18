<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponseTrait;

    /**
     * @OA\Post(
     *      path="/login",
     *      summary="Login",
     *      tags={"Auth"},
     *
     *      @OA\Parameter(name="email", in="query", @OA\Schema(type="string", default="admin@gmail.com")),
     *      @OA\Parameter(name="phone", in="query", @OA\Schema(type="string", default="0123456789")),
     *      @OA\Parameter(name="password", in="query", @OA\Schema(type="string", default="12345678")),
     *
     *      @OA\Response(response=200, description="OK", @OA\JsonContent())
     * )
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'phone' => 'required|regex:/(0)[0-9]{9}/',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response([
                'error' => __('auth.user_password_incorrect'),
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
