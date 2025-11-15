<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            //Información básica
            $table->string('marca');
            $table->string('modelo');
            $table->string('version')->nullable();
            $table->year('anio');
            $table->string('matricula')->unique();
            $table->string('bastidor')->unique()->nullable();

            //Especificaciones
            $table->enum('tipo', ['turismo', 'SUV', 'furgoneta', 'camion', 'moto'])->default('turismo');
            $table->enum('combustible', ['gasolina', 'diesel', 'hibrido', 'electrico']);
            $table->enum('transmision', ['manual', 'automatico']);
            $table->integer('potencia')->nullable();
            $table->integer('kilometros')->default(0);
            $table->integer('asientos')->nullable();

            //Gestión de renting
            $table->enum('estado', [
                'disponible', 'reservado', 'alquilado', 'mantenimiento'
            ])->default('disponible');

            $table->decimal('precio_dia', 10, 2)->nullable();
            $table->decimal('precio_mes', 10, 2)->nullable();

            //Fechas
            $table->date('fecha_alta')->nullable();
            $table->date('fecha_baja')->nullable();

            //Otros
            $table->text('observaciones')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
