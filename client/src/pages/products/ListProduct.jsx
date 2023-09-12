import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatData";
import FormAdd from "../../components/admin/manager-product/FormAdd";
import FormEdit from "../../components/admin/manager-product/FormEdit";

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [idEdit, setidEdit] = useState(null);


  // gọi API lấy thông tin tất cả sản phẩm
  const loadData = () => {
    fetch("http://localhost:8005/products")
      .then((response) => response.json()) // ép kiểu về dạng json
      .then((response) => setProducts(response)) // nơi có dưc liệu trả về
      .catch((error) => console.log(error)); // bắt lỗi
  };

  useEffect(() => {
    loadData();
  }, []);
    
    /**
     * hàm xóa thông tin 1 products theo id
     * @param {*} id của product cần xóa
     * 
     */
    const handleDelete = (id) => {
        fetch(`http://localhost:8005/products${id}`, {
          method: "DELETE",
        })
            .then((response) => {
                if (response.status === 200) {
                    loadData();
                }
            })
            .catch((error)=>console.log(error))
    }


    // hàm hiển thị form thêm mới sản phẩm
    const handleShowForm = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }


    // form edit
    const handleShowFormEdit = (productId) => {
        setShowFormEdit(true); // hiển thị form edit
        setidEdit(productId); // lấy ra id cần edit
    }



  return (
    <>
      {/* form thêm mới sản phẩm */}
      {showForm && (
        <FormAdd handleCloseForm={handleCloseForm} loadData={loadData} />
      )}

      {/* form edit */}
          {showFormEdit && <FormEdit idEdit={idEdit} />}
      <div className="d-flex align-items-center justify-content-center flex-column m3">
        <div>
          <button onClick={handleShowForm} className="btn btn-primary">
            Thêm mới sản phẩm
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Xuất xứ</th>
              <th scope="col" colSpan={2}>
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{formatMoney(product.price)}</td>
                <td>{product.from}</td>
                <td>
                  <button className="btn btn-info" onClick={()=>handleShowFormEdit(product.id)}>
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
