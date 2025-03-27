<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = [
            'posts' =>  Post::where("user_id", Auth::id())->with('user')->latest()->get()
        ];

        return Inertia::render("Posts/Index", $posts);
    }

    function create()
    {
        return Inertia::render("Posts/Create");
    }

    function store(Request $request)
    {
        $request->validate([
            "title" => "required",
            "content" => "required"
        ]);

        Post::create([
            "title" => $request->title,
            "content" => $request->content,
            "user_id" => Auth::id()
        ]);

        return redirect()->route("posts.index");
    }

    function edit(Post $post)
    {
        return Inertia::render("Posts/Edit", [
            'post' =>  $post
        ]);
    }

    function update(Request $request, Post $post)
    {
        $request->validate([
            "title" => "required",
            "content" => "required"
        ]);

        $post->update([
            "title" => $request->title,
            "content" => $request->content,
        ]);

        return redirect()->route("posts.index");
    }

    function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route("posts.index");
    }
}
