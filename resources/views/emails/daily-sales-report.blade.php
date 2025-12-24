<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Daily Sales Report</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .summary { display: flex; gap: 20px; margin: 20px 0; }
        .stat-box { background: white; padding: 15px; border-radius: 8px; flex: 1; text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #1e40af; }
        .stat-label { color: #6b7280; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f3f4f6; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Daily Sales Report</h1>
            <p>{{ $date }}</p>
        </div>
        <div class="content">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div class="stat-box">
                    <div class="stat-value">${{ number_format($totalSales, 2) }}</div>
                    <div class="stat-label">Total Sales</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">{{ $totalOrders }}</div>
                    <div class="stat-label">Orders</div>
                </div>
            </div>

            @if(count($productsSold) > 0)
                <h3>Products Sold</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($productsSold as $product)
                            <tr>
                                <td>{{ $product['name'] }}</td>
                                <td>{{ $product['quantity'] }}</td>
                                <td>${{ number_format($product['revenue'], 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <p style="text-align: center; color: #6b7280; padding: 20px;">No sales recorded for this day.</p>
            @endif
        </div>
    </div>
</body>
</html>

