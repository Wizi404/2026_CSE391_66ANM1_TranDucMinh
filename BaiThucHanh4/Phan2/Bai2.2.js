const orderForm=document.getElementById("orderForm")
const product=document.getElementById("product")
const quantity=document.getElementById("quantity")
const deliveryDate=document.getElementById("deliveryDate")
const address=document.getElementById("address")
const note=document.getElementById("note")
const totalPrice=document.getElementById("totalPrice")
const noteCount=document.getElementById("note-count")
const confirmBox=document.getElementById("confirmBox")
const orderSummary=document.getElementById("orderSummary")
const confirmBtn=document.getElementById("confirmBtn")
const cancelBtn=document.getElementById("cancelBtn")
const successMessage=document.getElementById("successMessage")
const prices={Áo:150000,Quần:200000}
function formatMoney(value){
  return Number(value).toLocaleString("vi-VN")+" VNĐ"
}
function showError(fieldId,message){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  error.textContent=message
  if(field){
    field.classList.remove("valid")
    field.classList.add("invalid")
  }
}
function clearError(fieldId){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  error.textContent=""
  if(field){
    field.classList.remove("invalid")
    field.classList.add("valid")
  }
}
function showGroupError(errorId,message){
  document.getElementById(errorId).textContent=message
}
function clearGroupError(errorId){
  document.getElementById(errorId).textContent=""
}
function validateProduct(){
  if(product.value===""){
    showError("product","Vui lòng chọn sản phẩm")
    return false
  }
  clearError("product")
  return true
}
function validateQuantity(){
  const value=Number(quantity.value)
  if(quantity.value.trim()===""){
    showError("quantity","Số lượng không được để trống")
    return false
  }
  if(!Number.isInteger(value) || value<1 || value>99){
    showError("quantity","Số lượng phải là số nguyên từ 1 đến 99")
    return false
  }
  clearError("quantity")
  return true
}
function validateDeliveryDate(){
  const value=deliveryDate.value
  if(value===""){
    showError("deliveryDate","Vui lòng chọn ngày giao hàng")
    return false
  }
  const selected=new Date(value)
  selected.setHours(0,0,0,0)
  const today=new Date()
  today.setHours(0,0,0,0)
  const maxDate=new Date(today)
  maxDate.setDate(maxDate.getDate()+30)
  if(selected<today){
    showError("deliveryDate","Ngày giao hàng không được ở quá khứ")
    return false
  }
  if(selected>maxDate){
    showError("deliveryDate","Ngày giao hàng không được quá 30 ngày từ hôm nay")
    return false
  }
  clearError("deliveryDate")
  return true
}
function validateAddress(){
  const value=address.value.trim()
  if(value===""){
    showError("address","Địa chỉ giao không được để trống")
    return false
  }
  if(value.length<10){
    showError("address","Địa chỉ giao phải có ít nhất 10 ký tự")
    return false
  }
  clearError("address")
  return true
}
function validateNote(){
  const value=note.value.trim()
  if(value.length>200){
    showError("note","Ghi chú không được vượt quá 200 ký tự")
    return false
  }
  clearError("note")
  return true
}
function validatePayment(){
  const payment=document.querySelector('input[name="payment"]:checked')
  if(!payment){
    showGroupError("payment-error","Vui lòng chọn phương thức thanh toán")
    return false
  }
  clearGroupError("payment-error")
  return true
}
function updateNoteCount(){
  const length=note.value.length
  noteCount.textContent=length+"/200"
  if(length>200){
    noteCount.classList.add("over")
  }else{
    noteCount.classList.remove("over")
  }
}
function updateTotal(){
  const productName=product.value
  const qty=Number(quantity.value)
  if(productName && Number.isInteger(qty) && qty>0){
    totalPrice.textContent=formatMoney(prices[productName]*qty)
  }else{
    totalPrice.textContent="0 VNĐ"
  }
}
function clearInputState(el,errorId){
  document.getElementById(errorId).textContent=""
  el.classList.remove("invalid","valid")
}
product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
deliveryDate.addEventListener("blur",validateDeliveryDate)
address.addEventListener("blur",validateAddress)
note.addEventListener("blur",validateNote)
product.addEventListener("change",()=>{
  document.getElementById("product-error").textContent=""
  product.classList.remove("invalid","valid")
  updateTotal()
})
quantity.addEventListener("input",()=>{
  clearInputState(quantity,"quantity-error")
  updateTotal()
})
deliveryDate.addEventListener("input",()=>clearInputState(deliveryDate,"deliveryDate-error"))
address.addEventListener("input",()=>clearInputState(address,"address-error"))
note.addEventListener("input",()=>{
  clearInputState(note,"note-error")
  updateNoteCount()
  validateNote()
})
document.querySelectorAll('input[name="payment"]').forEach(item=>{
  item.addEventListener("change",()=>clearGroupError("payment-error"))
})
function renderSummary(){
  const payment=document.querySelector('input[name="payment"]:checked').value
  const qty=Number(quantity.value)
  const total=prices[product.value]*qty
  orderSummary.innerHTML=`
    <p><strong>Sản phẩm:</strong> ${product.value}</p>
    <p><strong>Số lượng:</strong> ${qty}</p>
    <p><strong>Tổng tiền:</strong> ${formatMoney(total)}</p>
    <p><strong>Ngày giao:</strong> ${deliveryDate.value}</p>
    <p><strong>Thanh toán:</strong> ${payment}</p>
  `
}
orderForm.addEventListener("submit",function(e){
  e.preventDefault()
  const isValid=
    validateProduct() &
    validateQuantity() &
    validateDeliveryDate() &
    validateAddress() &
    validateNote() &
    validatePayment()
  if(isValid){
    renderSummary()
    confirmBox.style.display="block"
  }else{
    confirmBox.style.display="none"
  }
})
confirmBtn.addEventListener("click",function(){
  orderForm.style.display="none"
  confirmBox.style.display="none"
  successMessage.style.display="block"
  successMessage.textContent="Đặt hàng thành công! 🎉"
})
cancelBtn.addEventListener("click",function(){
  confirmBox.style.display="none"
})
updateNoteCount()
updateTotal()