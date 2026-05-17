<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\BorrowingController;
use App\Http\Controllers\API\ReservationController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\PenaltyController;

// Public Routes
Route::get('/student', [StudentController::class, 'index']);

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Book routes
    Route::apiResource('books', BookController::class);
    Route::get('books/search', [BookController::class, 'search']);
    Route::get('books/categories', [BookController::class, 'categories']);
    Route::post('books/{book}/generate-qr', [BookController::class, 'generateQRCode']);

    // Borrowing routes
    Route::apiResource('borrowings', BorrowingController::class);
    Route::post('borrowings/{borrowing}/return', [BorrowingController::class, 'return']);
    Route::get('borrowings/user/history', [BorrowingController::class, 'userHistory']);
    Route::get('borrowings/overdue', [BorrowingController::class, 'overdue']);

    // Reservation routes
    Route::apiResource('reservations', ReservationController::class);
    Route::post('reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);
    Route::post('reservations/{reservation}/complete', [ReservationController::class, 'complete']);
    Route::get('reservations/user', [ReservationController::class, 'userReservations']);
    Route::get('reservations/expired', [ReservationController::class, 'expired']);

    // Notification routes
    Route::apiResource('notifications', NotificationController::class);
    Route::get('notifications/unread', [NotificationController::class, 'unread']);
    Route::post('notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::post('notifications/read-all', [NotificationController::class, 'markAllAsRead']);

    // Penalty routes
    Route::apiResource('penalties', PenaltyController::class);
    Route::post('penalties/{penalty}/pay', [PenaltyController::class, 'pay']);
    Route::get('penalties/user', [PenaltyController::class, 'userPenalties']);
    Route::get('penalties/pending', [PenaltyController::class, 'pending']);
});



