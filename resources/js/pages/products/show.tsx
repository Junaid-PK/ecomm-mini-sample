import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Minus, Package, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Props {
    product: Product;
}

export default function ProductShow({ product }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/products' },
        { title: product.name, href: `/products/${product.id}` },
    ];

    const addToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setProcessing(true);
        router.post('/cart', { product_id: product.id, quantity }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Added to cart', {
                    description: `${quantity} × ${product.name} added to your cart.`,
                });
                setQuantity(1);
            },
            onError: (errors) => {
                toast.error('Failed to add to cart', {
                    description: errors.quantity || 'Something went wrong.',
                });
            },
            onFinish: () => setProcessing(false),
        });
    };

    const incrementQuantity = () => {
        if (quantity < product.stock_quantity) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit"
                    onClick={() => router.get('/products')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <Package className="text-muted-foreground h-24 w-24" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div className="flex-1">
                            <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
                            <p className="mt-4 text-4xl font-bold">
                                ${Number(product.price).toFixed(2)}
                            </p>

                            <div className="mt-6">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                        product.stock_quantity <= 0
                                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            : product.stock_quantity <= 5
                                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    }`}
                                >
                                    {product.stock_quantity <= 0
                                        ? 'Out of Stock'
                                        : product.stock_quantity <= 5
                                          ? `Low Stock: ${product.stock_quantity} remaining`
                                          : `In Stock: ${product.stock_quantity} available`}
                                </span>
                            </div>

                            {product.description && (
                                <div className="mt-8">
                                    <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                        Description
                                    </h2>
                                    <p className="mt-2 leading-relaxed text-foreground/80">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {product.stock_quantity > 0 && (
                            <div className="mt-8 space-y-4 border-t pt-8">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium">Quantity</span>
                                    <div className="flex items-center rounded-lg border">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 rounded-r-none"
                                            onClick={decrementQuantity}
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            min="1"
                                            max={product.stock_quantity}
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(
                                                    Math.min(
                                                        Math.max(1, parseInt(e.target.value) || 1),
                                                        product.stock_quantity
                                                    )
                                                )
                                            }
                                            className="h-10 w-16 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 rounded-l-none"
                                            onClick={incrementQuantity}
                                            disabled={quantity >= product.stock_quantity}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    size="lg"
                                    className="w-full"
                                    onClick={addToCart}
                                    disabled={processing}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart — ${(Number(product.price) * quantity).toFixed(2)}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

