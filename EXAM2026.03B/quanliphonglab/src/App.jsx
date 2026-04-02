import { useState, useEffect } from "react";
import duLieu from "./data";
import FormPhongMay from "./components/phongmayform";
import DanhSachPhongMay from "./components/phongmaylist";

function App() {
  const [hienForm, setHienForm] = useState(false);

  const [danhSach, setDanhSach] = useState(() => {
    const duLieuLuu = localStorage.getItem("phongMay");
    return duLieuLuu ? JSON.parse(duLieuLuu) : duLieu;
  });

  const [tuKhoa, setTuKhoa] = useState("");

  useEffect(() => {
    localStorage.setItem("phongMay", JSON.stringify(danhSach));
  }, [danhSach]);

  const themPhongMay = (pm) => {
    setDanhSach([...danhSach, { ...pm, id: Date.now() }]);
    setHienForm(false);
  };

  const xoaPhongMay = (id) => {
    setDanhSach(danhSach.filter(item => item.id !== id));
  };

  // Lọc dữ liệu
  const danhSachLoc = danhSach.filter(item => 
    item.tenPhong.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">LabMap</span>
        <div className="text-white">
          Trang chủ | Quản lý phòng máy
        </div>
      </nav>

      <div className="container mt-4">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Quản lý phòng máy</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setHienForm(true)}
          >
            + Thêm phòng
          </button>
        </div>

        {/* FORM */}
        {hienForm && (
          <FormPhongMay
            themPhongMay={themPhongMay}
            dongForm={() => setHienForm(false)}
          />
        )}

        {/* TABLE */}
        <DanhSachPhongMay
          danhSach={danhSachLoc}
          xoaPhongMay={xoaPhongMay}
        />

        {/* FILTER */}
        <div className="row mb-3">
          <div className="col">
            <input
              className="form-control"
              placeholder="Tìm theo tên..."
              onChange={(e) => setTuKhoa(e.target.value)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
