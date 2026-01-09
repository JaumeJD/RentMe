<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'cuantia',
        'metodo_pago',
        'estado_pago',
        'referencia'
    ];

    //Relaciones
    public function booking(){
        return $this->belongsTo(Booking::class);
    }
}
