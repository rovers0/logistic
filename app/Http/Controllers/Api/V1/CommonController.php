<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\User;

class CommonController extends Controller
{
    use ApiResponseTrait;

    public function changeMenuType(Request $request)
    {
        $setting = $request->user()->setting;
        $value = json_decode($setting->value, true);
        $value['menu'] = $request->menu;
        $setting->value = json_encode($value);
        $setting->save();

        return $this->responseApiSuccess(['setting' => $setting->value]);
    }
}
