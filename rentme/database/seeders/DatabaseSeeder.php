<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    // public function run()
    // {
    //     // \App\Models\User::factory(10)->create();
    // }

    public function run(): void {
    \App\Models\User::factory(10)->create(); // 10 usuarios
    \App\Models\Vehicle::factory(15)->create()->each(function($vehicle) {
        \App\Models\VehicleImage::factory(rand(1,3))->create([
            'vehicle_id' => $vehicle->id
        ]);
    });

    \App\Models\Booking::factory(20)->create()->each(function($booking) {
        \App\Models\Payment::factory(rand(1,2))->create([
            'booking_id' => $booking->id
        ]);
    });
}
}