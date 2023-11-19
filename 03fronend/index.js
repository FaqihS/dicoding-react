document.addEventListener("DOMContentLoaded", function () {
  const inputMaxLengthOnLoad = document.getElementById("inputNama").maxLength;
  document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;


  const inputNama = document.getElementById("inputNama");
  inputNama.addEventListener("input", function () {
    const jumlahInput = inputNama.value.length;
    const maxInput = inputNama.maxLength;

    const sisaKarakter = maxInput - jumlahInput;
    document.getElementById('sisaKarakter').innerText = sisaKarakter


    if (sisaKarakter === 0) {
      document.getElementById("sisaKarakter").innerText = "Batas Maks Tercapai";
    } else if (sisaKarakter <= 5) {
      document.getElementById("notifikasiSisaKarakter").style.color = "red";
    } else {
      document.getElementById("notifikasiSisaKarakter").style.color = "black";
    }
  });

  inputNama.addEventListener('focus',function(){
    document.getElementById('notifikasiSisaKarakter').style.visibility = 'visible'
  })

  inputNama.addEventListener('blur',function(){
    document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden'
  })

  const inputCapta = document.getElementById('inputCaptcha')
  inputCapta.addEventListener('change',function (){
    const captcha = inputCapta.value
    const submitButton = document.getElementById('submitButton')

    if(captcha == 'PRNU'){
      submitButton.removeAttribute('disabled')
    }else{
      submitButton.setAttribute('disabled','')
    }
  })

  document.getElementById('formDataDiri').addEventListener('submit',function(e){
    const capta = inputCapta.value

    if(capta == 'PRNU'){
      alert('Yeay')
    }else{
      alert('Kamu Salah capta')
      document.getElementById('submitButton').setAttribute('disabled','')
    }

    e.preventDefault()

  })

  document.getElementById('inputCopy').addEventListener('copy',function(){
    alert('Hayo Lo')
  })

  document.getElementById('inputPaste').addEventListener('paste',function(){
    alert('Nah Lo')
  })



});
