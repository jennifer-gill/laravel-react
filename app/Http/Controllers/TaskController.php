<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = [
            'tasks' =>  Task::where("user_id", Auth::id())->with('user')->latest()->get()
        ];

        return Inertia::render("Tasks/Index", $tasks);
    }

    function create()
    {
        return Inertia::render("Tasks/Create");
    }

    function store(Request $request)
    {
        $request->validate([
            "title" => "required",
            "description" => "required"
        ]);

        Task::create([
            "title" => $request->title,
            "description" => $request->description,
            "user_id" => Auth::id()
        ]);

        return redirect()->route("tasks.index");
    }

    function edit(Task $task)
    {
        return Inertia::render("Tasks/Edit", [
            'task' =>  $task
        ]);
    }

    function update(Request $request, Task $task)
    {
        $request->validate([
            "title" => "required",
            "description" => "required"
        ]);

        $task->update([
            "title" => $request->title,
            "description" => $request->description,
        ]);

        return redirect()->route("tasks.index");
    }

    function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route("tasks.index");
    }
}
