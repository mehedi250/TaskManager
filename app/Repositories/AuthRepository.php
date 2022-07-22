<?php
namespace App\Repositories;
use App\Interfaces\AuthInterface;
use App\User;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements AuthInterface{

    public function checkAuthenticated($data)
    {
        return Auth::attempt($data);
    }

    public function getUserByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    public function resisterUser($data)
    {
        return User::create($data);
    }

}