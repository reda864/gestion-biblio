<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'borrowed_at',
        'due_date',
        'returned_at',
        'status',
        'notes'
    ];

    protected $dates = [
        'borrowed_at',
        'due_date',
        'returned_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function penalty()
    {
        return $this->hasOne(Penalty::class);
    }

    public function getIsOverdueAttribute()
    {
        if ($this->status === 'returned') {
            return false;
        }
        return now()->gt($this->due_date);
    }

    public function getDaysOverdueAttribute()
    {
        if (!$this->is_overdue) {
            return 0;
        }
        return now()->diffInDays($this->due_date);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', 'active')
                    ->where('due_date', '<', now());
    }

    public function markAsReturned()
    {
        $this->update([
            'status' => 'returned',
            'returned_at' => now()
        ]);

        $this->book->increment('available_quantity');
    }

    public function markAsOverdue()
    {
        $this->update(['status' => 'overdue']);
    }
}
