<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'marca',
        'modelo',
        'version',
        'anio',
        'matricula',
        'bastidor',
        'tipo',
        'combustible',
        'transmision',
        'potencia',
        'kilometros',
        'asientos',
        'estado',
        'precio_dia',
        'precio_mes'
    ];

    //Relaciones
    public function images(){
        return $this->hasMany(VehicleImage::class);
    }

    public function bookings(){
        return $this->hasMany(Booking::class);
    }
}
