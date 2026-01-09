<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::with(['user', 'vehicle'])->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'estado' => 'sometimes|in:pendiente,confirmada,activa,finalizada,cancelada',
        ]);

        // Validar solapamiento
        $exists = Booking::where('vehicle_id', $data['vehicle_id'])
            ->whereIn('estado', ['confirmada', 'activa'])
            ->where(function ($q) use ($data) {
                $q->whereBetween('fecha_inicio', [$data['fecha_inicio'], $data['fecha_fin']])
                ->orWhereBetween('fecha_fin', [$data['fecha_inicio'], $data['fecha_fin']]);
            })
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'El vehículo ya está reservado en esas fechas'
            ], 422);
        }

        $booking = Booking::create($data);

        return response()->json($booking->load(['user', 'vehicle']), 201);
    }


    public function update(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'estado' => 'sometimes|in:pendiente,confirmada,activa,finalizada,cancelada',
        ]);

        // Validar solapamiento excluyendo la reserva actual
        $exists = Booking::where('vehicle_id', $data['vehicle_id'])
            ->where('id', '!=', $booking->id)
            ->whereIn('estado', ['confirmada', 'activa'])
            ->where(function ($q) use ($data) {
                $q->whereBetween('fecha_inicio', [$data['fecha_inicio'], $data['fecha_fin']])
                ->orWhereBetween('fecha_fin', [$data['fecha_inicio'], $data['fecha_fin']]);
            })
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'El vehículo ya está reservado en esas fechas'
            ], 422);
        }

        $booking->update($data);

    return response()->json($booking->load(['user', 'vehicle']));
}


    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(['message' => 'Reserva eliminada']);
    }
}

