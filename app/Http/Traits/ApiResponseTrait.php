<?php

namespace App\Http\Traits;

trait ApiResponseTrait
{
    public function responseApi($status, $message, $data, $error, $code)
    {
        $result = [];
        $result['success'] = $status;
        $result['data'] = $data;
        $result['message'] = $message;
        $result['errors'] = $error;
        $code = $code ?: ($status ?: 500);
        $result['code'] = $code;
        $result['version'] = '1.0.0'; // maybe get from database use cache
        $result['locale'] = app()->getLocale();

        return response($result, 200);
    }

    public function responseApiSuccess($data = null, $msg = '', $code = 200)
    {
        return $this->responseApi(true, $msg ?: __('Thành công'), $data, null, $code);
    }

    public function responseApiError($msg = '', $errors = null, $code = null)
    {
        if ($errors && is_string($errors) && strlen($errors) < 255) {
            try {
                $data = unserialize($errors);
            } catch (\Throwable $th) {
                $data = null;
            }

            if (is_array($data) && array_key_exists('code', $data) && $data['code'] == 422 && array_key_exists('message', $data)) {
                $msg = $data['message'];
                $errors = $data;
            }
        }

        return $this->responseApi(false, $msg ?: __('Thất bại'), null, $errors, $code);
    }
}
