<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    protected $model = \App\Models\VehicleImage::class;

    public function definition()
    {
        return [
            'vehicle_id' => \App\Models\Vehicle::factory(), //crea vehículo automaticamente
            'image_url' => $this->faker->imageUrl(640, 480, 'cars')
        ];
    }
}
