<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    protected $model = \App\Models\Vehicle::class;

    public function definition()
    {
        return [
            'marca' => $this->faker->company(),
            'modelo' => $this->faker->word(),
            'anio' => $this->faker->numberBetween(2015, 2025),
            'matricula' => strtoupper($this->faker->unique()->bothify('???-####')),
            'bastidor' => strtoupper($this->faker->unique()->bothify('???########??')),
            'tipo' => $this->faker->randomElement([
                'turismo', 'SUV', 'furgoneta', 'camion', 'moto'
            ]),
            'combustible' => $this->faker->randomElement([
                'gasolina', 'diesel', 'electrico', 'hibrido'
            ]),
            'transmision' => $this->faker->randomElement(['manual', 'automatico']),
            'potencia' => $this->faker->numberBetween(60, 200),
            'kilometros' => $this->faker->numberBetween(40000, 180000),
            'estado' => $this->faker->randomElement([
                'disponible',
                'reservado',
                'alquilado',
                'mantenimiento'
            ]),
            'asientos' => $this->faker->numberBetween(2,7),
            'precio_dia' => $this->faker->randomFloat(2, 30, 150),
            'precio_mes' => $this->faker->randomFloat(6, 90, 450),
            'observaciones' => $this->faker->sentence()
        ];
    }
}
