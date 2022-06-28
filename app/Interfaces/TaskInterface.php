<?php

namespace App\Interfaces;
use Illuminate\Http\Request;

Interface TaskInterface
{
    public function getAll();

    public function findById($id);

    public function create($data);

    public function edit($data, $id);

    public function delete($id);

}
