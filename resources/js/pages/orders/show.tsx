import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Package } from 'lucide-react';

interface Props {
    order: Order;
}

const statusColors: Record<Order['status'], string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function OrderShow({ order }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '/orders' },
        { title: `Order #${order.id}`, href: `/orders/${order.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order #${order.id}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit"
                    onClick={() => router.get('/orders')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Orders
                </Button>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Order #{order.id}</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Placed on{' '}
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>
                    <Badge variant="secondary" className={`${statusColors[order.status]} text-sm`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border bg-card">
                            <div className="border-b px-6 py-4">
                                <h2 className="font-semibold">Order Items</h2>
                            </div>
                            <div className="divide-y">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4">
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                                            {item.product.image_url ? (
                                                <img
                                                    src={item.product.image_url}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Package className="text-muted-foreground h-8 w-8" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <Link
                                                href={`/products/${item.product.id}`}
                                                className="font-medium hover:text-primary"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-muted-foreground text-sm">
                                                ${Number(item.price).toFixed(2)} × {item.quantity}
                                            </p>
                                            <p className="mt-auto font-semibold">
                                                ${(Number(item.price) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="rounded-xl border bg-card p-6">
                            <h2 className="font-semibold">Order Summary</h2>
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${Number(order.total_amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-emerald-600">Free</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>${Number(order.total_amount).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

