async function checkPhone() {
  const phone = document.getElementById("phone").value;
  if (!phone) return;

  const res = await fetch(`https://script.google.com/macros/s/AKfycbxbCHJ_4svpJNgXXIHbub-ISvn_fiiE4G_rzRB6VO58XmjkRcRWIUefrtrGIWEdu7Yz/exec?phone=${phone}`);
  const data = await res.json();

  const regDiv = document.getElementById("regFields");
  const msg = document.getElementById("msg");
  const submitBtn = document.getElementById("submitBtn");

  if (data.exists) {
    msg.innerText = "🙏 Thank you for your visit! Your darshan has been recorded.";
    regDiv.style.display = "none";
    submitBtn.style.display = "none";
  } else {
    regDiv.style.display = "block";
    submitBtn.style.display = "block";
    msg.innerText = "";
  }
}

async function submitForm(e) {
  e.preventDefault();
  const form = document.getElementById("visitForm");
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);
  const res = await fetch('https://script.google.com/macros/s/AKfycbxbCHJ_4svpJNgXXIHbub-ISvn_fiiE4G_rzRB6VO58XmjkRcRWIUefrtrGIWEdu7Yz/exec', {
    method: 'POST',
    body: params
  });
  const data = await res.json();
  document.getElementById("msg").innerText = data.message || 'Submitted!';
  form.reset();
  document.getElementById("regFields").style.display = "none";
  document.getElementById("submitBtn").style.display = "none";
}
