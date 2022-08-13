<?php

namespace App\Interfaces;
use Illuminate\Http\Request;

Interface ProjectInterface
{
    public function getAll($userId);

    public function findByIdUserId($id, $userId);

    public function create($data);

    public function edit($data, $userId, $id);

    public function delete($userId, $id);

}
