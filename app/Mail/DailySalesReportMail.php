<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DailySalesReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $date,
        public float $totalSales,
        public int $totalOrders,
        public array $productsSold
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Daily Sales Report - ' . $this->date,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.daily-sales-report',
        );
    }
}

