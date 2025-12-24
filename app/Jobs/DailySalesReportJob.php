<?php

namespace App\Jobs;

use App\Mail\DailySalesReportMail;
use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class DailySalesReportJob implements ShouldQueue
{
    use Queueable;

    public function handle(): void
    {
        $today = Carbon::today();

        $orders = Order::with('items.product')
            ->whereDate('created_at', $today)
            ->where('status', 'completed')
            ->get();

        $totalSales = $orders->sum('total_amount');
        $totalOrders = $orders->count();

        $productsSold = [];
        foreach ($orders as $order) {
            foreach ($order->items as $item) {
                $productName = $item->product->name;
                if (!isset($productsSold[$productName])) {
                    $productsSold[$productName] = [
                        'name' => $productName,
                        'quantity' => 0,
                        'revenue' => 0,
                    ];
                }
                $productsSold[$productName]['quantity'] += $item->quantity;
                $productsSold[$productName]['revenue'] += $item->subtotal;
            }
        }

        $admin = User::where('is_admin', true)->first();

        if ($admin) {
            Mail::to($admin->email)->send(new DailySalesReportMail(
                $today->toDateString(),
                $totalSales,
                $totalOrders,
                array_values($productsSold)
            ));
        }
    }
}

