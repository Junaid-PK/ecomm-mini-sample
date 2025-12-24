<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Low Stock Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: #dc2626;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .content {
            padding: 20px;
            background: #f9fafb;
        }

        .product-info {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }

        .alert {
            color: #dc2626;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>⚠️ Low Stock Alert</h1>
        </div>
        <div class="content">
            <p>This is an automated notification to inform you that the following product is running low on stock:</p>
            <div class="product-info">
                <h3>{{ $product->name }}</h3>
                <p><strong>Current Stock:</strong> <span class="alert">{{ $product->stock_quantity }} units</span></p>
                <p><strong>Price:</strong> ${{ number_format($product->price, 2) }}</p>
            </div>
            <p style="margin-top: 20px;">Please restock this item as soon as possible to avoid stockouts.</p>
        </div>
    </div>
</body>

</html>
