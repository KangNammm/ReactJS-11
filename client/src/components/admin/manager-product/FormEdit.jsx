import React, { useEffect } from 'react'
import "./product.css";
import { notification } from "antd";

export default function FormEdit(idEdit) {
    // gọi API lấy thông tin 1 sản phẩm theo id
    useEffect(() => {
        // call API 
        fetch(`http://localhost:8005/products/${idEdit}`)
            .then((response) => response.json()) // ép kiểu json
            .then((response) => console.log(response)) // lấy dữ liệu
            .catch((error) => console.log(error)); // bắt lỗi
    })

  return (
    <>
      <div className="product-container">
        <form className="form-container">
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              id="product_name"
              name="product_name"
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
            />
          </div>
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              Thêm mới
            </button>
            <button
              type="button"
              className="btn btn-danger"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
