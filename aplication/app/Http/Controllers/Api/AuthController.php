<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {

        //PENDIENTE VALIDACION DEL $request
        
        $input = $request->all();
        $input['password'] = bcrypt($request->password);
        
        $user = User::create($input);

        //Select del usuario registrado para que devuelva el rol.
        $user = User::where('email', $request->email)->first();
        
        $token = $user->createToken($request->email)->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token
        ], 201);
    }
    
    public function login(Request $request) {

        //PENDIENTE VALIDACION DEL $request
        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            
            return response()->json([
                'message' => 'Credenciales incorrectas.'
            ], 401);
        }
        
        $token = $user->createToken($request->email)->plainTextToken;
        
        return response()->json([
            'user' => $user,
            'access_token' => $token
        ]);
    }
    
    public function logout(Request $request) {

        //PENDIENTE VALIDACION DEL $request
        
        $user = $request->user();

        if (!$user) {
            
            return response()->json(['message' => 'Usuario no autenticado'], 401);
        }

        $token = $user->currentAccessToken();

        if (!$token) {
            
            return response()->json(['message' => 'Token no encontrado o inválido'], 400);
        }

        $token->delete();

        return response()->json(['message' => "Session cerrada correctamente."]);
    }
}
