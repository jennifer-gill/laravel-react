import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/GradientButton';

// Define the type for a single task
interface Task {
    id: number;
    title: string;
    description: string;
}

// Define props type
interface TaskEditProps {
    task: Task;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task/Edit',
        href: '/tasks/edit',
    },
];

const Task: React.FC<TaskEditProps> = ({ task }) => {
    const { data, setData, put, processing, reset, errors } = useForm({
        title: task.title,
        description: task.description,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('tasks.update', task.id), {
            onSuccess: () => reset()
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Task" />

            <div className="w-full p-6 rounded-lg shadow flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit a Task</h2>
                <Link href="/tasks">
                    <GradientButton>Back</GradientButton>
                </Link>
            </div>

            <div className="p-6 rounded-lg shadow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="max-w-md">
                        <Input
                            placeholder="Title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-red-400 pl-1 pt-1 text-sm">{errors.title}</p>}
                    </div>

                    <div className="max-w-md">
                        <Textarea
                            placeholder="Type your message here."
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-red-400 pl-1 pt-1 text-sm">{errors.description}</p>}
                    </div>

                    <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default Task;
