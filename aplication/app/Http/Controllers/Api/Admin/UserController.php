<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {

        return response()->json(User::all());
    }

    public function store(Request $request)
    {

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $user = User::create($input);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {

        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'role' => 'sometimes|in:admin,client',
            'password' => 'nullable|min:6',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']); // ✅ UNA sola vez
        } else {
            unset($data['password']); // ✅ ahora sí existe
        }

        $user->update($data);

        return response()->json($user);
    }


    public function destroy(User $user){

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente'
        ]);
    }
}
