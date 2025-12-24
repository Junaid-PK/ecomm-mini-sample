<?php

namespace App\Http\Controllers;

use App\Jobs\LowStockNotificationJob;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = $request->user()
            ->orders()
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(Request $request, Order $order): Response
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $cart = $request->user()->cart;

        if (!$cart || $cart->items->isEmpty()) {
            return back()->withErrors(['cart' => 'Your cart is empty.']);
        }

        $cart->load('items.product');

        foreach ($cart->items as $item) {
            if ($item->quantity > $item->product->stock_quantity) {
                return back()->withErrors([
                    'stock' => "Not enough stock for {$item->product->name}."
                ]);
            }
        }

        DB::transaction(function () use ($cart, $request) {
            $order = Order::create([
                'user_id' => $request->user()->id,
                'total_amount' => $cart->total,
                'status' => 'completed',
            ]);

            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                $product = $item->product;
                $product->decrement('stock_quantity', $item->quantity);

                if ($product->fresh()->isLowStock()) {
                    LowStockNotificationJob::dispatch($product);
                }
            }

            $cart->items()->delete();
        });

        return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
    }
}

