export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">567</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">890</p>
            </div>
            <div className="text-4xl">🛒</div>
          </div>
          <p className="text-sm text-red-600 mt-2">↓ 3% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹45,678</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ 18% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🛍️</span>
              <div>
                <p className="text-sm font-medium text-gray-900">New order received</p>
                <p className="text-xs text-gray-500">Order #12345 - ₹1,299</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">2 mins ago</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">15 mins ago</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Product added</p>
                <p className="text-xs text-gray-500">Premium Ayurvedic Oil</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">1 hour ago</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-sm font-medium text-gray-900">New review received</p>
                <p className="text-xs text-gray-500">5 stars on Herbal Shampoo</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}