import { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { useUser } from '../UserContext'; 
import axios from 'axios';
import Sidebar from '/EMART_ADMIN/emart_DA/emart-hk3/emat/components/sidebar1'; // Import Sidebar component
import { Pointer } from "pointer-wallet"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueBySupplier, setRevenueBySupplier] = useState([]);
  const [revenueWithCommission, setRevenueWithCommission] = useState([]);
  const { user } = useUser();
  
  const pointerPayment = new Pointer('sk_pointerf97ad5e90eb156b9a2b5d18e44bb37f8c89c2f0db611038a751c3bc7e0ec63c6');
  const fetchUserCount = async () => {
    try {
      const response = await axios.get("http://localhost:3005/user/count");
      if (response.status === 200) {
        setUserCount(response.data.count);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const fetchSupplierCount = async () => {
    try {
      const response = await axios.get("http://localhost:3005/supplier/sum");
      if (response.status === 200) {
        setSupplierCount(response.data.count);
      }
    } catch (error) {
      console.error("Error fetching supplier count:", error);
    }
  };

  const fetchRevenueBySupplier = async () => {
    try {
      const response = await axios.get('http://localhost:3006/CC/duma');
      if (response.status === 200) {
        setTotalRevenue(response.data.totalRevenue);
        setRevenueBySupplier(response.data.revenueBySupplier);

        const updatedRevenue = response.data.revenueBySupplier.map(supplier => ({
          ...supplier,
          commission: supplier.revenue * 0.20,
          netRevenue: supplier.revenue - supplier.revenue * 0.20,
        }));
        setRevenueWithCommission(updatedRevenue);
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const fetchSupplierEmail = async (supplierId) => {
    try {
      const response = await axios.get(`http://localhost:3006/supplier/email/${supplierId}`);
      if (response.status === 200) {
        return response.data.email;
      }
      throw new Error("Unable to fetch email");
    } catch (error) {
      console.error(`Error fetching email for supplier ${supplierId}:`, error);
      throw error;
    }
  };

  const handlePaymentRequest = async (supplier) => {
    try {
      const email = await fetchSupplierEmail(supplier.supplierId);
      const { netRevenue } = supplier;
      console.log(
        {
          email,
          currency: "VND",
          amount: netRevenue,
        }
      )
      await axios.post(`https://api.pointer.io.vn/api/payment/withdraw`,{
        email,
        currency: "VND",
        amount: netRevenue,
      } ,{
        headers: { Authorization: `Bearer sk_pointerf97ad5e90eb156b9a2b5d18e44bb37f8c89c2f0db611038a751c3bc7e0ec63c6` },
        withCredentials :false
      }
    )
      

      alert(`Yêu cầu thanh toán đã được gửi cho nhà cung cấp ${supplier.supplierId} (${email}).`);
    } catch (error) {
      console.error("Error sending payment request:", error);
      alert(`Lỗi khi gửi yêu cầu thanh toán cho nhà cung cấp ${supplier.supplierId}.`);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchSupplierCount();
    fetchRevenueBySupplier();
  }, []);

  const supplierRevenueData = {
    labels: revenueBySupplier.map((supplier) => supplier.supplierId),
    datasets: [
      {
        label: "Doanh thu theo nhà cung cấp",
        data: revenueBySupplier.map((supplier) => supplier.revenue),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueWithCommissionData = {
    labels: revenueWithCommission.map((supplier) => supplier.supplierId),
    datasets: [
      {
        label: "Doanh thu sau hoa hồng",
        data: revenueWithCommission.map((supplier) => supplier.netRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2 text-blue-400">Số lượng người dùng</h2>
            <p className="text-2xl text-red-500">{userCount}</p>
            <h2 className="text-lg font-semibold mb-2 text-blue-400">Hiện đã tạo tài khoản sử dụng</h2>
          </div>
          <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2 text-green-400">Số lượng nhà cung cấp</h2>
            <p className="text-2xl text-green-500">{supplierCount}</p>
            <h2 className="text-lg font-semibold mb-2 text-green-400">Đã đăng ký trong hệ thống</h2>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Doanh thu theo nhà cung cấp</h2>
            <Bar data={supplierRevenueData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Doanh thu sau hoa hồng</h2>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Nhà cung cấp</th>
                <th className="px-4 py-2">Doanh thu (Sau hoa hồng)</th>
                <th className="px-4 py-2">Hoa hồng</th>
                <th className="px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {revenueWithCommission.map((supplier) => (
                <tr key={supplier.supplierId}>
                  <td className="px-4 py-2">{supplier.supplierId}</td>
                  <td className="px-4 py-2">{supplier.netRevenue.toFixed(2)}</td>
                  <td className="px-4 py-2">{supplier.commission.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => handlePaymentRequest(supplier)}
                    >
                      Gửi tiền
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            
 <div className="bg-white p-4 rounded shadow mt-6">
<h2 className="text-lg font-semibold mb-2">Doanh thu sau hoa hồng theo nhà cung cấp</h2>
<Bar data={revenueWithCommissionData} 

/>

</div> 

          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;











