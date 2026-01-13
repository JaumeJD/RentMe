<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\ContactResponseMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::to($data['email'])->send(new ContactResponseMail($data));

        // Puedes guardar en BBDD o solo responder
        return response()->json([
            'success' => true,
            'message' => 'Correo enviado.'
        ]);
    }
}
