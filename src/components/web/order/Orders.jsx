import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Orders() {
  const token = localStorage.getItem("userToken");

  const getOrder = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
      headers: { Authorization: `Tariq__${token}` }
    });
    return data;
  };

  const { data, isLoading } = useQuery("getOrder", getOrder);

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  return (
    <div className="container">
      <div className="row pb-5">
        <table className="table mb-5 pb-5 table-primary">
          <thead className='table-secondary'>
            <tr>
              <th scope="col">order</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Final Price</th>
              <th scope="col">paymentType</th>
              <th scope="col">couponName</th>
              <th scope="col">createdAt</th>
              <th scope="col">status</th>
                            <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            {data?.orders?.filter(order => order.status.toLowerCase() !== "cancelled").map((order, index) => (
              <tr key={order.id || index}>
                <th scope="row">{index + 1}</th>
                <td>{order.address}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.finalPrice}</td>
                <td>{order.paymentType}</td>
                <td>{order.couponName}</td>
                <td>{order.createdAt}</td>
                <td>{order.status}</td>
                 <td>
    <Link  
      to={`/order/cancel/${order._id}`} 
      className="btn btn-danger"
    >
      Cancel
    </Link>
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
