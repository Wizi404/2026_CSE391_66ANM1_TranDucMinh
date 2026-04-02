import { useState } from "react";

function FormPhongMay({ themPhongMay, dongForm }) {
  const [form, setForm] = useState({
    tenPhong: "",
    maPhong: "",
    soMay: "",
    quanLy: "",
    email: ""
  });

  const [loi, setLoi] = useState({});

  const xuLyThayDoi = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.tenPhong) err.tenPhong = "Không được để trống";
    if (!form.maPhong) err.maPhong = "Không được để trống";
    if (!form.soMay || isNaN(form.soMay)) 
      err.soMay = "Số máy không hợp lệ";
    if (!form.quanLy) err.quanLy = "Không được để trống";
    if (!form.email) err.email = "Email không được để trống";

    setLoi(err);
    return Object.keys(err).length === 0;
  };

  const xuLySubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      themPhongMay(form);
    }
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h4>Thêm phòng máy</h4>

          <form onSubmit={xuLySubmit}>
            <input
              name="tenPhong"
              placeholder="Tên phòng"
              className="form-control mb-2"
              onChange={xuLyThayDoi}
            />
            <div className="text-danger">{loi.tenPhong}</div>

            <input
              name="maPhong"
              placeholder="Mã phòng"
              className="form-control mb-2"
              onChange={xuLyThayDoi}
            />
            <div className="text-danger">{loi.maPhong}</div>

            <input
              type="number"
              name="soMay"
              placeholder="Số máy"
              className="form-control mb-2"
              onChange={xuLyThayDoi}
              value={form.soMay}
            />
            <div className="text-danger">{loi.soMay}</div>

            <input
              name="quanLy"
              placeholder="Quản lý"
              className="form-control mb-2"
              onChange={xuLyThayDoi}
            />
            <div className="text-danger">{loi.quanLy}</div>

            <input
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              onChange={xuLyThayDoi}
            />
            <div className="text-danger">{loi.email}</div>

            <button className="btn btn-success me-2">Lưu</button>
            <button type="button" className="btn btn-secondary" onClick={dongForm}>
              Hủy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPhongMay;
