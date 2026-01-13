<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\User\BookingController as BookingUser;
use App\Http\Controllers\Api\User\UserController as ProfileUser;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\BookingController;
use App\Http\Controllers\Api\Admin\PaymentController;
use App\Http\Controllers\Api\Admin\VehicleController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\VehiclePublicController;

Route::prefix('v1')->group(function () {
    
    //PUBLIC ROUTES
    //::public
    Route::get('/public/{slug}', [FrontController::class, 'vehiculo']);
    Route::get('/vehicles', [VehicleController::class, 'index']);
    Route::get('/vehicles/{vehicle}', [FrontController::class, 'showPublic']);
    Route::post('/contact', [ContactController::class, 'send']);
    //::auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    //PRIVATE ROUTES
    Route::group(['middleware' => 'auth:sanctum'], function () {
        
        //::auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        //::rol user
        Route::get('/user/profile', [ProfileUser::class, 'show']);
        Route::put('/user/profile', [ProfileUser::class, 'update']);
        Route::apiResource('/user/bookings', BookingUser::class); //CRUD de sus reservas
        //::rol admin
        Route::apiResource('/admin/users', UserController::class);
        Route::apiResource('/admin/bookings', BookingController::class);
        Route::apiResource('/admin/payments', PaymentController::class);
        Route::apiResource('/admin/vehicles', VehicleController::class);
    });

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
