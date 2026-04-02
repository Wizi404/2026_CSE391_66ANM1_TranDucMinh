function PhongMayItem({ item, index, xoaPhongMay }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.tenPhong}</td>
      <td>{item.maPhong}</td>
      <td>{item.soMay}</td>
      <td>{item.quanLy}</td>
      <td>{item.email}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm("Bạn thực sự muốn xoá sao?")) {
              xoaPhongMay(item.id);
            }
          }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default PhongMayItem;
