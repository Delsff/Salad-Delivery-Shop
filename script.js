document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector(".order-input");
  const phone = input.value.trim();
  if (!phone) {
    alert("Enter your phone number");
    return;
  }
  console.log("Phone number:", phone);
  input.value = "";
});
