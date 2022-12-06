<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;
  
class TaskController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function index()
    {
        $tasks = Task::all();
        return Inertia::render('Tasks/Index', ['tasks' => $tasks]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function create()
    {
        return Inertia::render('Tasks/Create');
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'todo' => ['required'],
        ])->validate();
  
        Task::create($request->all());
  
        return redirect()->route('tasks.index');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function edit(Task $task)
    {
        return Inertia::render('Tasks/Edit', [
            'task' => $task
        ]);
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'todo' => ['required'],
        ])->validate();
  
        Task::find($id)->update($request->all());
        return redirect()->route('tasks.index');
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function destroy($id)
    {
        Task::find($id)->delete();
        return redirect()->route('tasks.index');
    }
}