const hoTenInput=document.getElementById("hoTen")
const diemInput=document.getElementById("diem")
const btnThem=document.getElementById("btnThem")
const searchInput=document.getElementById("searchInput")
const filterLoai=document.getElementById("filterLoai")
const sortDiem=document.getElementById("sortDiem")
const tableBody=document.getElementById("tableBody")
const thongKe=document.getElementById("thongKe")
let students=[]
let filteredStudents=[]
let sortOrder=null
function xepLoai(diem){
  if(diem>=8.5) return "Giỏi"
  if(diem>=7.0) return "Khá"
  if(diem>=5.0) return "Trung bình"
  return "Yếu"
}
function updateStats(list){
  const total=list.length
  let avg=0
  if(total>0){
    const sum=list.reduce((acc,sv)=>acc+sv.diem,0)
    avg=sum/total
  }
  thongKe.textContent=`Tổng số sinh viên: ${total} | Điểm trung bình: ${avg.toFixed(2)}`
}
function renderTable(){
  tableBody.innerHTML=""
  if(filteredStudents.length===0){
    tableBody.innerHTML=`
      <tr>
        <td colspan="5" class="no-result">Không có kết quả</td>
      </tr>
    `
    updateStats(filteredStudents)
    return
  }
  filteredStudents.forEach((sv,index)=>{
    const tr=document.createElement("tr")
    if(sv.diem<5) tr.classList.add("low-score")
    tr.innerHTML=`
      <td>${index+1}</td>
      <td>${sv.hoTen}</td>
      <td>${sv.diem.toFixed(1)}</td>
      <td>${xepLoai(sv.diem)}</td>
      <td><button class="delete-btn" data-id="${sv.id}">Xóa</button></td>
    `
    tableBody.appendChild(tr)
  })
  updateStats(filteredStudents)
}
function applyFilters(){
  const keyword=searchInput.value.trim().toLowerCase()
  const loaiDuocChon=filterLoai.value
  filteredStudents=students.filter(sv=>{
    const matchName=sv.hoTen.toLowerCase().includes(keyword)
    const matchLoai=loaiDuocChon==="Tất cả"||xepLoai(sv.diem)===loaiDuocChon
    return matchName&&matchLoai
  })
  if(sortOrder==="asc") filteredStudents.sort((a,b)=>a.diem-b.diem)
  else if(sortOrder==="desc") filteredStudents.sort((a,b)=>b.diem-a.diem)
  if(sortOrder==="asc") sortDiem.textContent="Điểm ▲"
  else if(sortOrder==="desc") sortDiem.textContent="Điểm ▼"
  else sortDiem.textContent="Điểm"
  renderTable()
}
function themSinhVien(){
  const hoTen=hoTenInput.value.trim()
  const diem=parseFloat(diemInput.value)
  if(hoTen===""){
    alert("Họ tên không được để trống!")
    hoTenInput.focus()
    return
  }
  if(isNaN(diem)||diem<0||diem>10){
    alert("Điểm phải nằm trong khoảng từ 0 đến 10!")
    diemInput.focus()
    return
  }
  const sv={id:Date.now(),hoTen:hoTen,diem:diem}
  students.push(sv)
  applyFilters()
  hoTenInput.value=""
  diemInput.value=""
  hoTenInput.focus()
}
btnThem.addEventListener("click",themSinhVien)
diemInput.addEventListener("keydown",event=>{
  if(event.key==="Enter") themSinhVien()
})
searchInput.addEventListener("input",applyFilters)
filterLoai.addEventListener("change",applyFilters)
sortDiem.addEventListener("click",()=>{
  if(sortOrder===null) sortOrder="asc"
  else if(sortOrder==="asc") sortOrder="desc"
  else sortOrder="asc"
  applyFilters()
})
tableBody.addEventListener("click",event=>{
  if(event.target.classList.contains("delete-btn")){
    const id=Number(event.target.getAttribute("data-id"))
    students=students.filter(sv=>sv.id!==id)
    applyFilters()
  }
})
applyFilters()