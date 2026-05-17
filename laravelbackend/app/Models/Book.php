<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'isbn',
        'description',
        'category',
        'quantity',
        'available_quantity',
        'location',
        'qr_code',
        'cover_image'
    ];

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function getIsAvailableAttribute()
    {
        return $this->available_quantity > 0;
    }

    public function getActiveReservationsCountAttribute()
    {
        return $this->reservations()->where('status', 'pending')->count();
    }

    public function getActiveBorrowingsCountAttribute()
    {
        return $this->borrowings()->where('status', 'active')->count();
    }

    public function scopeAvailable($query)
    {
        return $query->where('available_quantity', '>', 0);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeSearch($query, $term)
    {
        return $query->where(function($q) use ($term) {
            $q->where('title', 'like', "%{$term}%")
              ->orWhere('author', 'like', "%{$term}%")
              ->orWhere('isbn', 'like', "%{$term}%")
              ->orWhere('description', 'like', "%{$term}%");
        });
    }
}
