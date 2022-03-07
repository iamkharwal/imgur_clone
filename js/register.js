/** @format */

//register
document.getElementById("register").addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone_number").value;
  let pass = document.getElementById("password").value;
  let cpass = document.getElementById("cpassword").value;

  if (username.length <= 5) {
    alert("Invalid username!!");
    return;
  }
  if (phone.length !== 10) {
    alert("Invalid Phone Number!!");
    return;
  }
  if (pass.length <= 5) {
    alert("Password is too short!!");
    return;
  }
  if (pass !== cpass) {
    alert("Password doest matched!!");
    return;
  }
  let data = {
    username,
    email,
    pass,
    phone,
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(data);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "./signIn.html";
});
