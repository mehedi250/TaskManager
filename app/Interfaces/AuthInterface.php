<?php

namespace App\Interfaces;
use Illuminate\Http\Request;

Interface AuthInterface
{
    public function checkAuthenticated($data);

    public function getUserByEmail($email);

    public function resisterUser($data);

}
