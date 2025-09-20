
document.addEventListener("DOMContentLoaded", function() {
let email=document.querySelector(".form_email")
let password=document.querySelector(".form_password")
let but2=document.querySelector(".class_2")

let getemail=localStorage.getItem("email")
let getpassword=localStorage.getItem("password")

but2.addEventListener("click",function(q)
{
    q.preventDefault()
   if(email.value==="" || password.value===""){
            alert("please tray ageen")
   }else{
    if(getemail && getemail.trim() === email.value && getpassword && getpassword.trim() === password.value ){

setTimeout(
()=>{
    window.location="indexed.html"  },1000
)
}
else{
            alert("Error for email or password")

}}}
)});
