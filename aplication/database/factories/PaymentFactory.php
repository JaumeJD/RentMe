<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    protected $model = \App\Models\Payment::class;

    public function definition()
    {
        return [
            'booking_id' => \App\Models\Booking::factory(),
            'cuantia' => $this->faker->randomFloat(2, 20, 300),
            'metodo_pago' => $this->faker->randomElement([
                'visa',
                'paypal',
                'efectivo'
            ]),
            'estado_pago' => $this->faker->randomElement([
                'pendiente',
                'completado',
                'fallido'
            ]),
            'referencia' => strtoupper($this->faker->bothify('TX###???'))
        ];
    }
}
