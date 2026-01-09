<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    protected $model = \App\Models\Booking::class;

    public function definition()
    {

        $start = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $end = (clone $start)->modify('+'.rand(1,10).' days');

        return [
            'user_id' => \App\Models\User::factory(),
            'vehicle_id' => \App\Models\Vehicle::factory(),
            'fecha_inicio' => $start->format('Y-m-d'),
            'fecha_fin' => $end->format('Y-m-d'),
            'precio_total' => rand(200, 800),
            'estado' => $this->faker->randomElement([
                'pendiente', 'confirmada', 'activa', 'finalizada', 'cancelada'
            ])
        ];
    }
}
