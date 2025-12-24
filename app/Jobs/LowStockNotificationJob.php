<?php

namespace App\Jobs;

use App\Mail\LowStockMail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class LowStockNotificationJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Product $product
    ) {}

    public function handle(): void
    {
        $admin = User::where('is_admin', true)->first();

        if ($admin) {
            Mail::to($admin->email)->send(new LowStockMail($this->product));
        }
    }
}

