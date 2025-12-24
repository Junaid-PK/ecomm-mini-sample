import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order, type PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Package, ShoppingBag } from 'lucide-react';

interface Props {
    orders: PaginatedData<Order>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Orders', href: '/orders' },
];

const statusColors: Record<Order['status'], string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function OrdersIndex({ orders }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        View and track your order history
                    </p>
                </div>

                {orders.data.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-12">
                        <Package className="text-muted-foreground h-12 w-12" />
                        <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Start shopping to see your orders here
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/products">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Browse Products
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {orders.data.map((order) => (
                                <div
                                    key={order.id}
                                    className="overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between border-b px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="font-medium">Order #{order.id}</p>
                                                <p className="text-muted-foreground text-sm">
                                                    {new Date(order.created_at).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge
                                                variant="secondary"
                                                className={statusColors[order.status]}
                                            >
                                                {order.status.charAt(0).toUpperCase() +
                                                    order.status.slice(1)}
                                            </Badge>
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={`/orders/${order.id}`}>
                                                    <Eye className="mr-1 h-4 w-4" />
                                                    View
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-4">
                                            {order.items.slice(0, 4).map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="h-16 w-16 overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900"
                                                >
                                                    {item.product.image_url ? (
                                                        <img
                                                            src={item.product.image_url}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <Package className="text-muted-foreground h-6 w-6" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {order.items.length > 4 && (
                                                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                                                    +{order.items.length - 4}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                                            <p className="text-muted-foreground text-sm">
                                                {order.items.length}{' '}
                                                {order.items.length === 1 ? 'item' : 'items'}
                                            </p>
                                            <p className="text-lg font-semibold">
                                                ${Number(order.total_amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {orders.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-4">
                                {orders.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}

