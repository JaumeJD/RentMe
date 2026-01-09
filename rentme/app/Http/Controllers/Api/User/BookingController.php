<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{

    public function index(Request $request)
    {
        
        return Booking::with('vehicle')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        // Validar datos mínimos
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        // Verificar disponibilidad
        $exists = Booking::where('vehicle_id', $request->vehicle_id)
            ->whereIn('estado', ['confirmada', 'activa'])
            ->where(function ($q) use ($request) {
                $q->whereBetween('fecha_inicio', [$request->fecha_inicio, $request->fecha_fin])
                  ->orWhereBetween('fecha_fin', [$request->fecha_inicio, $request->fecha_fin]);
            })
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'El vehículo ya está reservado en esas fechas'
            ], 422);
        }

        // Crear la reserva con el usuario autenticado
        $booking = Booking::create([
            'user_id' => $request->user()->id, // <-- aquí asignamos el usuario
            'vehicle_id' => $request->vehicle_id,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'precio_total' => $request->precio_total,
            'estado' => 'confirmada',
        ]);

        return response()->json($booking->load('vehicle'), 201);
    }

    public function update(Request $request, Booking $booking)
    {

        $user = auth()->user();

        // Verificar que la reserva pertenece al usuario
        if ($booking->user_id !== $user->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // Validar disponibilidad si se cambia el vehículo o fechas
        $exists = Booking::where('vehicle_id', $request->vehicle_id ?? $booking->vehicle_id)
            ->whereIn('estado', ['confirmada', 'activa'])
            ->where('id', '!=', $booking->id) // ignorar esta reserva
            ->where(function ($q) use ($request, $booking) {
                $start = $request->fecha_inicio ?? $booking->fecha_inicio;
                $end = $request->fecha_fin ?? $booking->fecha_fin;
                $q->whereBetween('fecha_inicio', [$start, $end])
                  ->orWhereBetween('fecha_fin', [$start, $end]);
            })
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'El vehículo ya está reservado en esas fechas'
            ], 422);
        }

        // Solo actualizamos lo que el usuario puede cambiar
        $booking->update([
            'vehicle_id' => $request->vehicle_id ?? $booking->vehicle_id,
            'fecha_inicio' => $request->fecha_inicio ?? $booking->fecha_inicio,
            'fecha_fin' => $request->fecha_fin ?? $booking->fecha_fin,
        ]);

        return response()->json($booking->load('vehicle'));
    }

    public function destroy(Booking $booking)
    {
        $user = auth()->user();

        if ($booking->user_id !== $user->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $booking->update(['estado' => 'cancelada']); // mejor marcar como cancelada
        return response()->json(['message' => 'Reserva cancelada']);
    }
}
