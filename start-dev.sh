#!/bin/bash
# PKSA Construction Website - Development Server Startup Script

cd "$(dirname "$0")"

echo "🚀 Starting PKSA Construction Website Development Server..."
echo "📍 Server will be available at: http://localhost:3000"
echo ""
echo "Configuration:"
echo "  - SWC Native: DISABLED (prevents SIGBUS errors)"
echo "  - Memory Limit: 4GB"
echo "  - Host: 0.0.0.0 (accessible from network)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev


