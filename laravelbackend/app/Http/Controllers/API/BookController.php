<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Book::query();

        if ($request->has('search')) {
            $query->search($request->search);
        }

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        if ($request->has('available')) {
            $query->available();
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
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'quantity' => 'required|integer|min:0',
            'location' => 'nullable|string',
            'cover_image' => 'nullable|image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->all();
        $data['available_quantity'] = $request->quantity;

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('covers', 'public');
            $data['cover_image'] = $path;
        }

        $book = Book::create($data);

        return response()->json($book, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        return response()->json($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'author' => 'string|max:255',
            'isbn' => 'string|unique:books,isbn,' . $book->id,
            'description' => 'nullable|string',
            'category' => 'string',
            'quantity' => 'integer|min:0',
            'location' => 'nullable|string',
            'cover_image' => 'nullable|image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->all();

        if ($request->has('quantity')) {
            $quantityDiff = $request->quantity - $book->quantity;
            $data['available_quantity'] = $book->available_quantity + $quantityDiff;
        }

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('covers', 'public');
            $data['cover_image'] = $path;
        }

        $book->update($data);

        return response()->json($book);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'term' => 'required|string|min:2'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $books = Book::search($request->term)->paginate(10);

        return response()->json($books);
    }

    public function categories()
    {
        $categories = Book::select('category')
            ->distinct()
            ->pluck('category');

        return response()->json($categories);
    }

    public function generateQRCode(Book $book)
    {
        if (!$book->qr_code) {
            $book->qr_code = uniqid('book_');
            $book->save();
        }

        return response()->json(['qr_code' => $book->qr_code]);
    }
}
