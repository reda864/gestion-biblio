<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Notification;
use App\Models\Penalty;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Borrowing::with(['book', 'user']);

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
            'book_id' => 'required|exists:books,id',
            'due_date' => 'required|date|after:today'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = Book::findOrFail($request->book_id);

        if ($book->available_quantity <= 0) {
            return response()->json(['message' => 'Book is not available'], 400);
        }

        DB::beginTransaction();
        try {
            $borrowing = Borrowing::create([
                'user_id' => $request->user()->id,
                'book_id' => $book->id,
                'borrowed_at' => now(),
                'due_date' => $request->due_date,
                'status' => 'active'
            ]);

            $book->decrement('available_quantity');

            Notification::create([
                'user_id' => $request->user()->id,
                'title' => 'Book Borrowed',
                'message' => "You have borrowed {$book->title}. Due date: {$request->due_date}",
                'type' => 'borrowing',
                'notifiable_type' => Borrowing::class,
                'notifiable_id' => $borrowing->id
            ]);

            DB::commit();
            return response()->json($borrowing->load('book'), 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error processing request'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Borrowing $borrowing)
    {
        return response()->json($borrowing->load(['book', 'user']));
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

    public function return(Borrowing $borrowing)
    {
        if ($borrowing->status === 'returned') {
            return response()->json(['message' => 'Book already returned'], 400);
        }

        DB::beginTransaction();
        try {
            $borrowing->markAsReturned();

            if ($borrowing->is_overdue) {
                $daysOverdue = $borrowing->days_overdue;
                $penaltyAmount = $daysOverdue * 1.00; // $1 per day

                Penalty::create([
                    'user_id' => $borrowing->user_id,
                    'borrowing_id' => $borrowing->id,
                    'amount' => $penaltyAmount,
                    'status' => 'pending',
                    'due_date' => Carbon::now()->addDays(7),
                    'reason' => "Late return penalty for {$daysOverdue} days"
                ]);

                Notification::create([
                    'user_id' => $borrowing->user_id,
                    'title' => 'Late Return Penalty',
                    'message' => "A penalty of ${$penaltyAmount} has been applied for late return",
                    'type' => 'penalty',
                    'notifiable_type' => Borrowing::class,
                    'notifiable_id' => $borrowing->id
                ]);
            }

            DB::commit();
            return response()->json($borrowing->load('book'));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error processing return'], 500);
        }
    }

    public function userHistory(Request $request)
    {
        $borrowings = Borrowing::with(['book'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($borrowings);
    }

    public function overdue()
    {
        $overdueBorrowings = Borrowing::with(['book', 'user'])
            ->where('status', 'active')
            ->where('due_date', '<', now())
            ->get();

        foreach ($overdueBorrowings as $borrowing) {
            $borrowing->markAsOverdue();
        }

        return response()->json($overdueBorrowings);
    }
}
