<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $products = [
            [
                'name' => 'Classic Leather Wallet',
                'description' => 'Handcrafted genuine leather wallet with multiple card slots and a sleek minimalist design.',
                'price' => 89.99,
                'stock_quantity' => 25,
                'image_url' => 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
            ],
            [
                'name' => 'Wireless Noise-Canceling Headphones',
                'description' => 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
                'price' => 349.99,
                'stock_quantity' => 15,
                'image_url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            ],
            [
                'name' => 'Ceramic Pour-Over Coffee Set',
                'description' => 'Artisanal ceramic dripper with matching carafe for the perfect morning brew.',
                'price' => 64.99,
                'stock_quantity' => 30,
                'image_url' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
            ],
            [
                'name' => 'Mechanical Keyboard',
                'description' => 'RGB backlit mechanical keyboard with cherry MX switches and aluminum frame.',
                'price' => 159.99,
                'stock_quantity' => 8,
                'image_url' => 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
            ],
            [
                'name' => 'Minimalist Desk Lamp',
                'description' => 'Adjustable LED desk lamp with touch controls and wireless charging base.',
                'price' => 79.99,
                'stock_quantity' => 20,
                'image_url' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
            ],
            [
                'name' => 'Premium Yoga Mat',
                'description' => 'Extra thick non-slip yoga mat made from sustainable materials.',
                'price' => 98.99,
                'stock_quantity' => 35,
                'image_url' => 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
            ],
            [
                'name' => 'Smart Water Bottle',
                'description' => 'Temperature-tracking water bottle with hydration reminders and LED display.',
                'price' => 45.99,
                'stock_quantity' => 50,
                'image_url' => 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
            ],
            [
                'name' => 'Canvas Messenger Bag',
                'description' => 'Durable waxed canvas messenger bag with padded laptop compartment.',
                'price' => 129.99,
                'stock_quantity' => 18,
                'image_url' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            ],
            [
                'name' => 'Portable Bluetooth Speaker',
                'description' => 'Waterproof portable speaker with 360-degree sound and 24-hour playtime.',
                'price' => 119.99,
                'stock_quantity' => 22,
                'image_url' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
            ],
            [
                'name' => 'Titanium Travel Mug',
                'description' => 'Double-walled titanium mug that keeps drinks hot for 12 hours or cold for 24.',
                'price' => 54.99,
                'stock_quantity' => 40,
                'image_url' => 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
            ],
            [
                'name' => 'Wireless Charging Pad',
                'description' => 'Fast wireless charging pad compatible with all Qi-enabled devices.',
                'price' => 39.99,
                'stock_quantity' => 60,
                'image_url' => 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400',
            ],
            [
                'name' => 'Vintage Polaroid Camera',
                'description' => 'Instant film camera with built-in flash and automatic exposure.',
                'price' => 199.99,
                'stock_quantity' => 12,
                'image_url' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
            ],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['name' => $product['name']],
                $product
            );
        }
    }
}
