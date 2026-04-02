import PhongMayItem from "./phongmayitems";

function DanhSachPhongMay({ danhSach, xoaPhongMay }) {
  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>STT</th>
          <th>Tên phòng</th>
          <th>Mã phòng</th>
          <th>Số máy</th>
          <th>Quản lý</th>
          <th>Email</th>
          <th>Hành động</th>
        </tr>
      </thead>

      <tbody>
        {danhSach.map((item, index) => (
          <PhongMayItem
            key={item.id}
            item={item}
            index={index}
            xoaPhongMay={xoaPhongMay}
          />
        ))}
      </tbody>
    </table>
  );
}

export default DanhSachPhongMay;
