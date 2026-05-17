<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function penalties()
    {
        return $this->hasMany(Penalty::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function getActiveBorrowingsAttribute()
    {
        return $this->borrowings()->where('status', 'active')->get();
    }

    public function getActiveReservationsAttribute()
    {
        return $this->reservations()->where('status', 'pending')->get();
    }

    public function getPendingPenaltiesAttribute()
    {
        return $this->penalties()->where('status', 'pending')->get();
    }
}
