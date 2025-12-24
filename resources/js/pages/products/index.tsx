import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Package, Search, ShoppingCart } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface Props {
    products: PaginatedData<Product>;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
];

export default function ProductsIndex({ products, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [processing, setProcessing] = useState(false);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/products', { search }, { preserveState: true });
    };

    const addToCart = (productId: number) => {
        setProcessing(true);
        router.post('/cart', { product_id: productId, quantity: 1 }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Browse our collection of premium products
                        </p>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-64 pl-9"
                            />
                        </div>
                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                    </form>
                </div>

                {products.data.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-12">
                        <Package className="text-muted-foreground h-12 w-12" />
                        <h3 className="mt-4 text-lg font-medium">No products found</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Try adjusting your search criteria
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
                                >
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900"
                                    >
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Package className="text-muted-foreground h-16 w-16" />
                                            </div>
                                        )}
                                    </Link>
                                    <div className="flex flex-1 flex-col p-4">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="font-medium transition-colors hover:text-primary"
                                        >
                                            {product.name}
                                        </Link>
                                        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                            {product.description}
                                        </p>
                                        <div className="mt-auto flex items-end justify-between pt-4">
                                            <div>
                                                <p className="text-lg font-semibold">
                                                    ${Number(product.price).toFixed(2)}
                                                </p>
                                                <p
                                                    className={`text-xs ${
                                                        product.stock_quantity <= 5
                                                            ? 'text-amber-600 dark:text-amber-500'
                                                            : 'text-muted-foreground'
                                                    }`}
                                                >
                                                    {product.stock_quantity <= 0
                                                        ? 'Out of stock'
                                                        : product.stock_quantity <= 5
                                                          ? `Only ${product.stock_quantity} left`
                                                          : `${product.stock_quantity} in stock`}
                                                </p>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => addToCart(product.id)}
                                                disabled={processing || product.stock_quantity <= 0}
                                            >
                                                <ShoppingCart className="mr-1 h-4 w-4" />
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {products.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-4">
                                {products.links.map((link, index) => (
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

