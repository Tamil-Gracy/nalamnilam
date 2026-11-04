
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const API = import.meta.env.VITE_API_URL;

const Orders = () => {
  const { user, loading } = useUser();
  const [myOrders, setMyOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (loading) return;

      if (!user?.firebaseUid) {
        setMyOrders([]);
        setOrdersLoading(false);
        return;
      }

      try {
        setError("");

        const res = await axios.get(
          `${API}/api/orders/user/${user.firebaseUid} `
        );

        // Adjust this if your API returns a different response structure.
        const orders = res.data.data;

        setMyOrders(Array.isArray(orders) ? orders : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to load your orders. Please try again.");
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user, loading]);

  if (loading || ordersLoading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (myOrders.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-forest">
          No orders yet
        </h2>
        <p className="mt-2 text-gray-500">
          Your orders will appear here after checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-forest">
          My Orders
        </h1>

        <p className="mb-8 text-gray-600">
          View your orders and ordered products.
        </p>

        <div className="space-y-6">
          {myOrders.map((order, index) => (
            <div
              key={order._id || index}
              className="overflow-hidden rounded-2xl border border-[#e5e7dc] bg-white shadow-sm"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-[#fffdf8] px-5 py-4 sm:px-6">
                <div>
                  <h2 className="text-lg font-bold text-forest">
                    Order #{order._id}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                </div>

                <span className="rounded-full bg-[#eaf5e8] px-3 py-1 text-sm font-semibold capitalize text-[#286642]">
                  {order.orderStatus || "Placed"}
                </span>
              </div>

              {/* Ordered products */}
              <div className="divide-y divide-gray-100 px-5 sm:px-6">
                {(order.items ? order.items : []).map(
                  (item) => {

                    const quantity = Number(item.quantity) || 0;
                    const price = Number(item.price ?? product.price) || 0;

                      const imageUrl = item.productId?.image;

                    return (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 py-5"
                      >
                        {/* Product image */}
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f7f5ed] sm:h-24 sm:w-24">
                             {imageUrl ? (
                                <img
                                   src={`${API}${imageUrl}`}
                              alt={item.name || "Ordered product"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                          {/* Product details */}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-forest">
                            {item.name || "Product"}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {quantity}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            ₹{price.toLocaleString("en-IN")} each
                          </p>
                        </div>

                        {/* Item subtotal */}
                        <p className="shrink-0 text-base font-bold text-forest">
                          ₹{(price * quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Order total */}
              <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-[#fffdf8] px-5 py-5 sm:px-6">
                <div>
                  <p className="font-semibold text-forest">
                    Order total
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {(order.items || []).length} item(s)
                  </p>
                </div>

                <p className="text-2xl font-bold text-forest">
                  ₹{Number(order.total || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;