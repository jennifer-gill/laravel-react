<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {

        $tasks = [
            'tasks' =>  Task::with('user')->latest()->get()
        ];

        return Inertia::render('tasks', $tasks);
    }
}
