const form=document.getElementById("registerForm")
const successMessage=document.getElementById("successMessage")
const fullname=document.getElementById("fullname")
const email=document.getElementById("email")
const phone=document.getElementById("phone")
const password=document.getElementById("password")
const confirmPassword=document.getElementById("confirmPassword")
const terms=document.getElementById("terms")
const fullnameCount=document.getElementById("fullname-count")
const strengthBar=document.getElementById("strengthBar")
const strengthText=document.getElementById("strengthText")
const togglePassword=document.getElementById("togglePassword")
const toggleConfirmPassword=document.getElementById("toggleConfirmPassword")

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex=/^0[0-9]{9}$/
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const fullnameRegex=/^[a-zA-ZÀ-ỹ\s]+$/

function showError(fieldId,message){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  error.textContent=message
  field.classList.remove("valid")
  field.classList.add("invalid")
}

function clearError(fieldId){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  error.textContent=""
  field.classList.remove("invalid")
  field.classList.add("valid")
}

function showGroupError(errorId,message){
  document.getElementById(errorId).textContent=message
}

function clearGroupError(errorId){
  document.getElementById(errorId).textContent=""
}

function resetField(fieldId){
  const field=document.getElementById(fieldId)
  const error=document.getElementById(fieldId+"-error")
  error.textContent=""
  field.classList.remove("invalid","valid")
}

function updateFullnameCount(){
  fullnameCount.textContent=fullname.value.length+"/50"
}

function updatePasswordStrength(){
  const value=password.value
  let score=0
  if(value.length>=8) score++
  if(/[a-z]/.test(value)) score++
  if(/[A-Z]/.test(value)) score++
  if(/\d/.test(value)) score++
  if(/[^A-Za-z0-9]/.test(value)) score++

  if(value.length===0){
    strengthBar.style.width="0"
    strengthBar.style.background="transparent"
    strengthText.textContent="Chưa nhập mật khẩu"
    strengthText.style.color="#666"
    return
  }

  if(score<=2){
    strengthBar.style.width="33%"
    strengthBar.style.background="red"
    strengthText.textContent="Mức độ: Yếu"
    strengthText.style.color="red"
    return
  }

  if(score<=4){
    strengthBar.style.width="66%"
    strengthBar.style.background="#f0ad00"
    strengthText.textContent="Mức độ: Trung bình"
    strengthText.style.color="#f0ad00"
    return
  }

  strengthBar.style.width="100%"
  strengthBar.style.background="green"
  strengthText.textContent="Mức độ: Mạnh"
  strengthText.style.color="green"
}

function togglePasswordField(inputEl,buttonEl){
  if(inputEl.type==="password"){
    inputEl.type="text"
    buttonEl.textContent="🙈"
  }else{
    inputEl.type="password"
    buttonEl.textContent="👁"
  }
}

function validateFullname(){
  const value=fullname.value.trim()
  if(value===""){
    showError("fullname","Họ và tên không được để trống")
    return false
  }
  if(value.length<3){
    showError("fullname","Họ và tên phải có ít nhất 3 ký tự")
    return false
  }
  if(value.length>50){
    showError("fullname","Họ và tên không được vượt quá 50 ký tự")
    return false
  }
  if(!fullnameRegex.test(value)){
    showError("fullname","Họ và tên chỉ được chứa chữ cái và khoảng trắng")
    return false
  }
  clearError("fullname")
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

function validatePhone(){
  const value=phone.value.trim()
  if(value===""){
    showError("phone","Số điện thoại không được để trống")
    return false
  }
  if(!phoneRegex.test(value)){
    showError("phone","Số điện thoại phải có 10 chữ số và bắt đầu bằng 0")
    return false
  }
  clearError("phone")
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

function validateGender(){
  const gender=document.querySelector('input[name="gender"]:checked')
  if(!gender){
    showGroupError("gender-error","Vui lòng chọn giới tính")
    return false
  }
  clearGroupError("gender-error")
  return true
}

function validateTerms(){
  if(!terms.checked){
    showGroupError("terms-error","Bạn phải đồng ý với điều khoản")
    return false
  }
  clearGroupError("terms-error")
  return true
}

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirmPassword)

fullname.addEventListener("input",()=>{
  updateFullnameCount()
  resetField("fullname")
})
email.addEventListener("input",()=>resetField("email"))
phone.addEventListener("input",()=>resetField("phone"))
password.addEventListener("input",()=>{
  resetField("password")
  updatePasswordStrength()
})
confirmPassword.addEventListener("input",()=>resetField("confirmPassword"))

document.querySelectorAll('input[name="gender"]').forEach(item=>{
  item.addEventListener("change",()=>clearGroupError("gender-error"))
})

terms.addEventListener("change",()=>clearGroupError("terms-error"))
togglePassword.addEventListener("click",()=>togglePasswordField(password,togglePassword))
toggleConfirmPassword.addEventListener("click",()=>togglePasswordField(confirmPassword,toggleConfirmPassword))

form.addEventListener("submit",e=>{
  e.preventDefault()
  const isValid=
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms()

  if(isValid){
    form.style.display="none"
    successMessage.style.display="block"
    successMessage.textContent=`Đăng ký thành công! 🎉 Chào mừng ${fullname.value.trim()}`
  }
})

updateFullnameCount()
updatePasswordStrength()