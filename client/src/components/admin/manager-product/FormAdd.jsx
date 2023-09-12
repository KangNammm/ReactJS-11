import React, { useState } from 'react'
import "./product.css"
import {notification} from "antd"

export default function FormAdd(handleCloseForm, loadData) {
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    from: "",
  });

  // hàm lấy giá trị từ các ô input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // hàm thêm mới product
  const handleSumit = (e) => {
    e.preventDefault();
    console.log(product);
    // gọi API
    fetch("http://localhost:8005/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ép kiểu dữ liệu đầu vào từ javascript sang json
      },
      body: JSON.stringify({ ...product, price: parseInt(product.price) }),
    })
      .then((response) => {
        // kiểm tra dữ liệu trả về
        if (response.status === 201) {
          // hiển thị notification thành công
          notification.success({
            message: "Thành công",
            description: "Thêm mới sản phẩm thành công.",
          });
          // ẩn form thêm mới
          handleCloseForm();
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="product-container">
        <form className="form-container" onSubmit={handleSumit}>
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              id="product_name"
              name="product_name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Giá
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="from" className="form-label">
              Xuất xứ
            </label>
            <input
              type="text"
              className="form-control"
              id="from"
              name="from"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              Thêm mới
            </button>
            <button onClick={handleCloseForm} type="button" className="btn btn-danger">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
