import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type CartItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Minus, Package, Plus, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    items: CartItem[];
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Cart', href: '/cart' },
];

export default function CartIndex({ items, total }: Props) {
    const [processing, setProcessing] = useState(false);

    const updateQuantity = (itemId: number, quantity: number) => {
        setProcessing(true);
        router.patch(`/cart/${itemId}`, { quantity }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Cart updated');
            },
            onError: (errors) => {
                toast.error('Failed to update', {
                    description: errors.quantity || 'Something went wrong.',
                });
            },
            onFinish: () => setProcessing(false),
        });
    };

    const removeItem = (itemId: number, productName: string) => {
        setProcessing(true);
        router.delete(`/cart/${itemId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Item removed', {
                    description: `${productName} removed from cart.`,
                });
            },
            onError: () => {
                toast.error('Failed to remove item');
            },
            onFinish: () => setProcessing(false),
        });
    };

    const checkout = () => {
        setProcessing(true);
        router.post('/orders', {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Order placed!', {
                    description: 'Your order has been placed successfully.',
                });
            },
            onError: (errors) => {
                toast.error('Checkout failed', {
                    description: errors.cart || errors.stock || 'Something went wrong.',
                });
            },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shopping Cart" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Shopping Cart</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {items.length === 0
                            ? 'Your cart is empty'
                            : `${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`}
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-12">
                        <ShoppingCart className="text-muted-foreground h-12 w-12" />
                        <h3 className="mt-4 text-lg font-medium">Your cart is empty</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Add some products to get started
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/products">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Browse Products
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="divide-y rounded-xl border bg-card">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-4 transition-colors hover:bg-muted/50"
                                    >
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
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
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <Link
                                                        href={`/products/${item.product.id}`}
                                                        className="font-medium hover:text-primary"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <p className="text-muted-foreground text-sm">
                                                        ${Number(item.product.price).toFixed(2)} each
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeItem(item.id, item.product.name)}
                                                    disabled={processing}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between pt-2">
                                                <div className="flex items-center rounded-lg border">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-r-none"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity - 1)
                                                        }
                                                        disabled={processing || item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max={item.product.stock_quantity}
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateQuantity(
                                                                item.id,
                                                                Math.min(
                                                                    Math.max(
                                                                        1,
                                                                        parseInt(e.target.value) || 1
                                                                    ),
                                                                    item.product.stock_quantity
                                                                )
                                                            )
                                                        }
                                                        className="h-8 w-12 rounded-none border-x-0 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-l-none"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity + 1)
                                                        }
                                                        disabled={
                                                            processing ||
                                                            item.quantity >= item.product.stock_quantity
                                                        }
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <p className="font-semibold">
                                                    ${Number(item.subtotal).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-6 rounded-xl border bg-card p-6">
                                <h2 className="text-lg font-semibold">Order Summary</h2>
                                <div className="mt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${Number(total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-emerald-600">Free</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>${Number(total).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    className="mt-6 w-full"
                                    size="lg"
                                    onClick={checkout}
                                    disabled={processing}
                                >
                                    Checkout
                                </Button>
                                <Button asChild variant="outline" className="mt-3 w-full">
                                    <Link href="/products">Continue Shopping</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
