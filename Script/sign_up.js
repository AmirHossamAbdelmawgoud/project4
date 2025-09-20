
document.addEventListener("DOMContentLoaded", function() {

let full_name=document.querySelector(".form_Full_Name")
let lastname =document.querySelector(".form_last_Name")
let email=document.querySelector(".form_email")
let password=document.querySelector(".form_password")
let but1=document.querySelector(".butt1")

but1.addEventListener("click",function(e)
{
    e.preventDefault()
    if(full_name.value==="" ||lastname.value==="" || email.value==="" || password.value===""){
        alert("please tray ageen")
    }else{
        localStorage.setItem("full_name",full_name.value);
        localStorage.setItem("lastname",lastname.value);
        localStorage.setItem("email",email.value);
        localStorage.setItem("password",password.value);


        console.log(full_name.value)
        console.log(lastname.value)
        console.log(email.value)
         console.log(password.value)
setTimeout(
()=>{
    window.location="sign_in.html"  
},1000
)
    }
}
)});



