<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{

    public function index(){
        
        $vehicles = Vehicle::with('images')->get();

        return response()->json($vehicles);
    }

    public function show($id){

        $vehicle = Vehicle::with('images')->findOrFail($id);

        return response()->json($vehicle);
    }

    public function store(Request $request){

        $vehicle = Vehicle::create($request->except('image'));

        if ($request->hasFile('image')) {

            foreach ($request->file('image') as $image) {
                
                $path = $image->store('vehicles', 'public');

                $vehicle->images()->create([
                'image_url' => asset('storage/' . $path)
                ]);
            }
        }

        return response()->json($vehicle->load('images'), 201);
    }

    public function update(Request $request, Vehicle $vehicle){

        $vehicle->update($request->except('images'));

        if ($request->hasFile('images')) {
        
            foreach ($request->file('images') as $image) {
            
                $path = $image->store('vehicles', 'public');

                $vehicle->images()->create([
                'image_url' => asset('storage/' . $path)
                ]);
            }
        }

        return response()->json($vehicle->load('images'));
    }

    public function destroy($id){

        $vehicle = Vehicle::findOrFail($id);

        $vehicle->images()->delete();

        $vehicle->delete();

        return response()->json([
            'message' => 'Vehículo eliminado correctamente.'
        ], 200);
    }
}
