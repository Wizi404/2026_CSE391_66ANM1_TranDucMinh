const form=document.getElementById("multiStepForm")
const successMessage=document.getElementById("successMessage")
const progressText=document.getElementById("progressText")
const progressBar=document.getElementById("progressBar")
const summaryBox=document.getElementById("summaryBox")

const fullname=document.getElementById("fullname")
const birthday=document.getElementById("birthday")
const email=document.getElementById("email")
const password=document.getElementById("password")
const confirmPassword=document.getElementById("confirmPassword")

const steps=document.querySelectorAll(".step")
let currentStep=1

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
const fullnameRegex=/^[a-zA-ZÀ-ỹ\s]+$/
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

function showStep(step){
  steps.forEach(item=>item.classList.remove("active"))
  document.getElementById("step"+step).classList.add("active")
  currentStep=step
  progressText.textContent=`Bước ${step} / 3`
  progressBar.style.width=(step/3*100)+"%"
  if(step===3) renderSummary()
}

function showError(fieldId,message){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  if(field){
    field.classList.remove("valid")
    field.classList.add("invalid")
  }
  error.textContent=message
}

function clearError(fieldId){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  if(field){
    field.classList.remove("invalid")
    field.classList.add("valid")
  }
  error.textContent=""
}

function resetField(fieldId){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  if(field) field.classList.remove("invalid","valid")
  error.textContent=""
}

function showGroupError(errorId,message){
  document.getElementById(errorId).textContent=message
}

function clearGroupError(errorId){
  document.getElementById(errorId).textContent=""
}

function validateFullname(){
  const value=fullname.value.trim()
  if(value===""){
    showError("fullname","Họ tên không được để trống")
    return false
  }
  if(value.length<3){
    showError("fullname","Họ tên phải có ít nhất 3 ký tự")
    return false
  }
  if(!fullnameRegex.test(value)){
    showError("fullname","Họ tên chỉ được chứa chữ cái và khoảng trắng")
    return false
  }
  clearError("fullname")
  return true
}

function validateBirthday(){
  const value=birthday.value
  if(value===""){
    showError("birthday","Vui lòng chọn ngày sinh")
    return false
  }
  const selected=new Date(value)
  selected.setHours(0,0,0,0)
  const today=new Date()
  today.setHours(0,0,0,0)
  if(selected>today){
    showError("birthday","Ngày sinh không hợp lệ")
    return false
  }
  clearError("birthday")
  return true
}

function validateGender(){
  const gender=document.querySelector('input[name="gender"]:checked')
  if(!gender){
    showGroupError("gender-error","Vui lòng chọn giới tính")
    return false
  }
  clearGroupError("gender-error")
  return true
}

function validateEmail(){
  const value=email.value.trim()
  if(value===""){
    showError("email","Email không được để trống")
    return false
  }
  if(!emailRegex.test(value)){
    showError("email","Email không đúng định dạng")
    return false
  }
  clearError("email")
  return true
}

function validatePassword(){
  const value=password.value
  if(value===""){
    showError("password","Mật khẩu không được để trống")
    return false
  }
  if(!passwordRegex.test(value)){
    showError("password","Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số")
    return false
  }
  clearError("password")
  return true
}

function validateConfirmPassword(){
  const value=confirmPassword.value
  if(value===""){
    showError("confirmPassword","Vui lòng xác nhận mật khẩu")
    return false
  }
  if(value!==password.value){
    showError("confirmPassword","Mật khẩu xác nhận không khớp")
    return false
  }
  clearError("confirmPassword")
  return true
}

function validateStep1(){
  return validateFullname() & validateBirthday() & validateGender()
}

function validateStep2(){
  return validateEmail() & validatePassword() & validateConfirmPassword()
}

function renderSummary(){
  const gender=document.querySelector('input[name="gender"]:checked')?.value || ""
  summaryBox.innerHTML=`
    <p><strong>Họ tên:</strong> ${fullname.value.trim()}</p>
    <p><strong>Ngày sinh:</strong> ${birthday.value}</p>
    <p><strong>Giới tính:</strong> ${gender}</p>
    <p><strong>Email:</strong> ${email.value.trim()}</p>
    <p><strong>Mật khẩu:</strong> ${"*".repeat(password.value.length)}</p>
  `
}

fullname.addEventListener("blur",validateFullname)
birthday.addEventListener("blur",validateBirthday)
email.addEventListener("blur",validateEmail)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirmPassword)

fullname.addEventListener("input",()=>resetField("fullname"))
birthday.addEventListener("input",()=>resetField("birthday"))
email.addEventListener("input",()=>resetField("email"))
password.addEventListener("input",()=>{
  resetField("password")
  if(confirmPassword.value!=="") validateConfirmPassword()
})
confirmPassword.addEventListener("input",()=>resetField("confirmPassword"))

document.querySelectorAll('input[name="gender"]').forEach(item=>{
  item.addEventListener("change",()=>clearGroupError("gender-error"))
})

document.getElementById("next1").addEventListener("click",()=>{
  if(validateStep1()) showStep(2)
})

document.getElementById("back1").addEventListener("click",()=>{
  showStep(1)
})

document.getElementById("next2").addEventListener("click",()=>{
  if(validateStep2()) showStep(3)
})

document.getElementById("back2").addEventListener("click",()=>{
  showStep(2)
})

form.addEventListener("submit",e=>{
  e.preventDefault()
  if(validateStep1() & validateStep2()){
    form.style.display="none"
    successMessage.style.display="block"
    successMessage.textContent=`Đăng ký thành công! 🎉 Chào mừng ${fullname.value.trim()}`
  }
})

showStep(1)