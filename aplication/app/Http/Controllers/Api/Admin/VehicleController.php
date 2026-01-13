<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{

    public function index(){

        return response()->json(Vehicle::with('images')->latest()->get());
    }

    public function show(Vehicle $vehicle){

        return response()->json($vehicle->load('images'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'marca' => 'required|string|max:100',
            'modelo' => 'required|string|max:100',
            'version' => 'nullable|string|max:100',
            'anio' => 'required|integer|min:1980|max:' . date('Y'),
            'matricula' => 'required|string|max:20|regex:/^[0-9]{4}[A-Z]{3}$/|unique:vehicles,matricula',
            'bastidor' => 'nullable|string|max:50|unique:vehicles,bastidor',

            'tipo' => 'required|in:turismo,SUV,furgoneta,camion,moto',
            'combustible' => 'required|in:gasolina,diesel,hibrido,electrico',
            'transmision' => 'required|in:manual,automatico',

            'potencia' => 'nullable|integer|min:1|max:2000',
            'kilometros' => 'nullable|integer|min:0',
            'asientos' => 'nullable|integer|min:1|max:100',

            'estado' => 'nullable|in:disponible,reservado,alquilado,mantenimiento',

            'precio_dia' => 'nullable|numeric|min:0',
            'precio_mes' => 'nullable|numeric|min:0',

            'fecha_alta' => 'nullable|date|before_or_equal:today',
            'fecha_baja' => 'nullable|date|after_or_equal:fecha_alta',

            'observaciones' => 'nullable|string|max:2000',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp',
        ]);


        $vehicle = Vehicle::create($request->except('images'));

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {
                
                $path = $image->store('vehicles', 'public');

                $vehicle->images()->create([
                'image_url' => 'storage/' . $path
                ]);
            }
        }

        return response()->json($vehicle->load('images'), 201);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $data = $request->validate([
            'marca' => 'sometimes|string|max:100',
            'modelo' => 'sometimes|string|max:100',
            'version' => 'nullable|string|max:100',
            'anio' => 'sometimes|integer|min:1980|max:' . date('Y'),
            'matricula' => 'sometimes|string|max:20|regex:/^[0-9]{4}[A-Z]{3}$/|unique:vehicles,matricula,' . $vehicle->id,
            'bastidor' => 'nullable|string|max:50|unique:vehicles,bastidor,' . $vehicle->id,

            'tipo' => 'sometimes|in:turismo,SUV,furgoneta,camion,moto',
            'combustible' => 'sometimes|in:gasolina,diesel,hibrido,electrico',
            'transmision' => 'sometimes|in:manual,automatico',

            'potencia' => 'nullable|integer|min:1|max:2000',
            'kilometros' => 'nullable|integer|min:0',
            'asientos' => 'nullable|integer|min:1|max:100',

            'estado' => 'sometimes|in:disponible,reservado,alquilado,mantenimiento',

            'precio_dia' => 'nullable|numeric|min:0',
            'precio_mes' => 'nullable|numeric|gte:precio_dia',

            'fecha_alta' => 'nullable|before_or_equal:today',
            'fecha_baja' => 'nullable|after_or_equal:fecha_alta',

            'observaciones' => 'nullable|string|max:2000',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp',
        ]);
    

        $vehicle->update($request->except('images'));

        if ($request->hasFile('images')) {
        
            foreach ($request->file('images') as $image) {
            
                $path = $image->store('vehicles', 'public');

                $vehicle->images()->create([
                'image_url' => 'storage/' . $path
                ]);
            }
        }

        return response()->json($vehicle->load('images'));
    }

    public function destroy($id)
    {
        $vehicle = Vehicle::with('bookings', 'images')->findOrFail($id);

        if ($vehicle->bookings()->exists()) {
            return response()->json([
                'message' => 'No puede eliminar un vehículo reservado.'
            ], 409);
        };

        foreach ($vehicle->images as $image) {
            $path = str_replace('/storage/', '', $image->image_url);
            \Storage::disk('public')->delete($path);
        }

        $vehicle->images()->delete();
        $vehicle->delete();

        return response()->json([
            'message' => 'Vehículo eliminado correctamente.'
        ], 200);
    }
}
