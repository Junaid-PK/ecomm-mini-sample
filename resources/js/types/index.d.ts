import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    stock_quantity: number;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: number;
    quantity: number;
    subtotal: number;
    product: Product;
}

export interface Cart {
    id: number;
    user_id: number;
    items: CartItem[];
    total: number;
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: Product;
}

export interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
