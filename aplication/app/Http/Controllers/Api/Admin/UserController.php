<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {

        return response()->json(User::latest()->get());
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'name' => 'required|string|regex:/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/|min:3|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,client',
            'phone' => 'nullable|string|max:20'
        ]);

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {

        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|regex:/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/|min:3|max:100',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
            'role' => 'sometimes|in:admin,client',
            'phone' => 'nullable|string|max:20'
        ]);

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']); // ✅ UNA sola vez
        } else {
            unset($data['password']); // ✅ ahora sí existe
        }

        if (empty($data)) {
            return response()->json([
                'message' => 'No hay datos para actualizar'
            ], 422);
        }

        $user->update($data);

        return response()->json($user);
    }


    public function destroy(User $user)
    {

        if ($user->bookings()->exists()) {
            return response()->json([
                'message' => 'El usuario tiene reservas activas.'
            ], 409);
        }

        if (auth()->id() === $user->id) {
            return response()->json([
                'message' => 'No puedes eliminar tu propio usuario.'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente.'
        ]);
    }
}
