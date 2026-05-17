<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Notification;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Reservation::with(['book', 'user']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        return response()->json($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = Book::findOrFail($request->book_id);

        // Check if user already has an active reservation for this book
        $existingReservation = Reservation::where('user_id', $request->user()->id)
            ->where('book_id', $book->id)
            ->where('status', 'pending')
            ->first();

        if ($existingReservation) {
            return response()->json(['message' => 'You already have an active reservation for this book'], 400);
        }

        DB::beginTransaction();
        try {
            $reservation = Reservation::create([
                'user_id' => $request->user()->id,
                'book_id' => $book->id,
                'reserved_at' => now(),
                'expires_at' => Carbon::now()->addDays(3),
                'status' => 'pending'
            ]);

            Notification::create([
                'user_id' => $request->user()->id,
                'title' => 'Book Reserved',
                'message' => "You have reserved {$book->title}. Reservation expires in 3 days.",
                'type' => 'reservation',
                'notifiable_type' => Reservation::class,
                'notifiable_id' => $reservation->id
            ]);

            DB::commit();
            return response()->json($reservation->load('book'), 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error processing reservation'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        return response()->json($reservation->load(['book', 'user']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function cancel(Reservation $reservation)
    {
        if ($reservation->status !== 'pending') {
            return response()->json(['message' => 'Reservation cannot be cancelled'], 400);
        }

        DB::beginTransaction();
        try {
            $reservation->markAsCancelled();

            Notification::create([
                'user_id' => $reservation->user_id,
                'title' => 'Reservation Cancelled',
                'message' => "Your reservation for {$reservation->book->title} has been cancelled.",
                'type' => 'reservation',
                'notifiable_type' => Reservation::class,
                'notifiable_id' => $reservation->id
            ]);

            DB::commit();
            return response()->json($reservation);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error cancelling reservation'], 500);
        }
    }

    public function complete(Reservation $reservation)
    {
        if ($reservation->status !== 'pending') {
            return response()->json(['message' => 'Reservation cannot be completed'], 400);
        }

        if ($reservation->book->available_quantity <= 0) {
            return response()->json(['message' => 'Book is not available'], 400);
        }

        DB::beginTransaction();
        try {
            $reservation->markAsCompleted();

            Notification::create([
                'user_id' => $reservation->user_id,
                'title' => 'Reservation Completed',
                'message' => "Your reservation for {$reservation->book->title} has been completed.",
                'type' => 'reservation',
                'notifiable_type' => Reservation::class,
                'notifiable_id' => $reservation->id
            ]);

            DB::commit();
            return response()->json($reservation);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error completing reservation'], 500);
        }
    }

    public function userReservations(Request $request)
    {
        $reservations = Reservation::with(['book'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($reservations);
    }

    public function expired()
    {
        $expiredReservations = Reservation::with(['book', 'user'])
            ->where('status', 'pending')
            ->where('expires_at', '<', now())
            ->get();

        foreach ($expiredReservations as $reservation) {
            $reservation->markAsExpired();

            Notification::create([
                'user_id' => $reservation->user_id,
                'title' => 'Reservation Expired',
                'message' => "Your reservation for {$reservation->book->title} has expired.",
                'type' => 'reservation',
                'notifiable_type' => Reservation::class,
                'notifiable_id' => $reservation->id
            ]);
        }

        return response()->json($expiredReservations);
    }
}
