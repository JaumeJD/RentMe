<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        // Puedes guardar en BBDD o solo responder
        return response()->json([
            'message' => 'Mensaje recibido correctamente'
        ]);
    }
}
