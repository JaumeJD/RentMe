<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehicle;

class FrontController extends Controller
{

    public function showPublic(Vehicle $vehicle)
    {

        return response()->json($vehicle->load('images'));
    }
}
