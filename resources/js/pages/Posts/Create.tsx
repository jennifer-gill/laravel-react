import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/GradientButton';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts/Create',
        href: '/posts/create',
    },
];

export default function Posts() {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        content: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => reset()
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />


            <div className="w-full p-6 rounded-lg shadow flex justify-between items-center">
                <h2 className="text-xl font-semibold">Create a New Post</h2>
                <Link href="/posts">
                    <GradientButton>Back</GradientButton>
                </Link>
            </div>

            <div className=" p-6 rounded-lg shadow">
                <form onSubmit={handleSubmit} className=" space-y-4">
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
                            name="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        {errors.content && <p className="text-red-400 pl-1 pt-1 text-sm">{errors.content}</p>}
                    </div>

                    <Button className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
