import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const tasks = [
    { id: 1, name: "Task 1", status: "Pending" },
    { id: 2, name: "Task 2", status: "Completed" },
    { id: 3, name: "Task 3", status: "In Progress" },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Switch />
                
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="destructive" size="sm" className="ml-2">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}