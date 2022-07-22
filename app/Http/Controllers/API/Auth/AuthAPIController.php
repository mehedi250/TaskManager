<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Interfaces\AuthInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
class AuthAPIController extends Controller
{
    protected $authRepository;

    public function __construct(AuthInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'bail|required',
            'password' => 'bail|required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'status' => 'validation-error'
            ]);
        }

        if($this->authRepository->checkAuthenticated(['email' => $request->email, 'password' => $request->password]))
        {
            $user = $this->authRepository->getUserByEmail($request->email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Loged in successfully',
                'user' => $user,
                'accessToken' => $accessToken
            ]);
        } else{
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invalid Email and Password',
                'errors' => null
            ]);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required',
            'email' => 'bail|required|unique:users',
            'password' => 'bail|required|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'status' => 'validation-error'
            ]);
        }

        $password = bcrypt($request->password);
        $data = ['name' => $request->name, 'email' => $request->email, 'password' => $password];
        $response = $this->authRepository->resisterUser($data);

        if(!is_null($response))
        {
            $user = $this->authRepository->getUserByEmail($request->email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'User register successfully',
                'user' => $user,
                'accessToken' => $accessToken
            ]);
        } else{
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invalid Email and Password',
                'errors' => null
            ]);
        }
    }
}
