import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { GradientButton } from '@/components/ui/GradientButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from 'lucide-react';

// Define the type for a single post
interface Post {
  id: number;
  title: string;
  content: string;
}

// Define the type for the component's props
interface DashboardProps {
  posts: Post[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Post',
    href: '/posts',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ posts }) => {

  const { delete: destroy, processing, reset } = useForm({});

  // Function to handle delete
  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    destroy(`/posts/${id}`, {
      onSuccess: () => {
        reset()
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Post" />

      <div className="w-full p-6 rounded-lg shadow flex justify-between items-center">
        <h2 className="text-xl font-semibold">Posts</h2>
        <Link href="/posts/create">
          <GradientButton>Create Post</GradientButton>
        </Link>
      </div>

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>
                  <Link href={`/posts/${post.id}/edit`}>
                    <GradientButton>Edit</GradientButton>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
