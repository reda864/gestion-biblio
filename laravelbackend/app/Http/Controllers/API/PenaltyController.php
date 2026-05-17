<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Penalty;
use Illuminate\Http\Request;

class PenaltyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Penalty::with(['user', 'borrowing.book']);

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Penalty $penalty)
    {
        return response()->json($penalty->load(['user', 'borrowing.book']));
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

    public function pay(Penalty $penalty)
    {
        if ($penalty->status === 'paid') {
            return response()->json(['message' => 'Penalty already paid'], 400);
        }

        $penalty->markAsPaid();

        Notification::create([
            'user_id' => $penalty->user_id,
            'title' => 'Penalty Paid',
            'message' => "Your penalty of {$penalty->amount} has been paid.",
            'type' => 'penalty',
            'notifiable_type' => Penalty::class,
            'notifiable_id' => $penalty->id
        ]);

        return response()->json($penalty);
    }

    public function userPenalties(Request $request)
    {
        $penalties = Penalty::with(['borrowing.book'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($penalties);
    }

    public function pending(Request $request)
    {
        $penalties = Penalty::with(['user', 'borrowing.book'])
            ->where('status', 'pending')
            ->where('due_date', '<', now())
            ->get();

        return response()->json($penalties);
    }
}
