import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Dashboard = () => {
  const {
    authUser,
    products = [],
    isProducting,
    fetchProducts,
    fetchOrder,
    isOrder,
    order = [],
  } = useAuthStore();

  useEffect(() => {
    fetchProducts();
    fetchOrder();
  }, [fetchProducts, fetchOrder]);

  const [sortBy, setSortBy] = useState("productName");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleSort = (field) => {
    setSortBy(field);
  };

  const sortedProducts = [...products].sort((a, b) =>
    a[sortBy]?.localeCompare(b[sortBy] || "")
  );

  const sortedOrders = [...order].sort((a, b) =>
    a[sortBy]?.localeCompare(b[sortBy] || "")
  );

  return (
    <div className="flex h-screen">

      {/* Main Content */}
      <div className="flex-1 p-6  overflow-auto">
        <h1 className="text-3xl font-semibold mb-4">
          Selamat datang, {authUser?.email || "Pengguna"}!
        </h1>

        {/* Products Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Produk</h2>
          <div className="overflow-x-auto  rounded-lg shadow-md">
            {isProducting ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (
              <table className="w-full table-auto">
                <thead className="border border-white">
                  <tr>
                    <th
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSort("productName")}
                    >
                      nama produk
                    </th>
                    <th
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSort("price")}
                    >
                      Harga
                    </th>
                    <th
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSort("isActive")}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((item, index) => (
                    <tr
                      key={item.id || `${index}-${item.productName}`}
                      className="text-center "
                    >
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{formatPrice(item.price)}</td>
                      <td className="border px-4 py-2">
                        {item.isActive ? (
                          <span className="text-green-500">Aktif</span>
                        ) : (
                          <span className="text-red-500">Tidak Aktif</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Tidak ada produk tersedia</p>
            )}
          </div>
        </section>

        {/* Orders Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <div className="overflow-x-auto  rounded-lg shadow-md">
            {isOrder ? (
              <p>Loading orders...</p>
            ) : order.length > 0 ? (
              <table className="w-full table-auto">
                <thead className=" border border-white">
                  <tr>
                    <th
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSort("game")}
                    >
                      Nama Game
                    </th>
                    <th
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSort("userGameid")}
                    >
                      ID Game
                    </th>
                    <th
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSort("product.productName")}
                    >
                      Produk & harga
                    </th>
                    <th
                      className="px-4 py-2 cursor-pointer "
                      onClick={() => handleSort("isActive")}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((item, index) => (
                    <tr
                      key={item.id || `${index}-${item.orderId}`}
                      className="text-center "
                    >
                      <td className="border px-4 py-2">{item.game}</td>
                      <td className="border px-4 py-2">{item.userGameid}</td>
                      <td className="border px-4 py-2">{item.product.productName}, {formatPrice(item.product.price)}</td>
                      <td className="border px-4 py-2">
                        {item.isActive ? (
                          <span className="text-green-500">proses</span>
                        ) : (
                          <span className="text-red-500">Pending</span>
                        ) 
                    }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Tidak ada order tersedia</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
