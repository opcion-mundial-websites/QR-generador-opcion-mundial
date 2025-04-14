



  
  // Inicializa una variable qrGenerated como false para rastrear si un código QR ha sido generado.//




  let qrGenerated = false; 
    





  // FUNCION QUE GENERA EL QR SEGUN SU TAMAÑO FORMA Y EL FORMATO ( PNG )  //
  
  
      function generateQR() {
  
  
        let number = document.getElementById('escribe').value; 
            
        const qr = new QRious({
          element: document.getElementById('qr'),
          value: number,
          size: 200
        });
      
  
        qrGenerated = true; 
      
        const canvas = document.getElementById('qr');
        const img = canvas.toDataURL("image/png");
      
        let downloadLink = document.getElementById('downloadLink');
        downloadLink.href = img;
        downloadLink.download = number.replace(/[^a-zA-Z0-9]/g,'_') + '.png';
  
  
      }
  
  
  
  
  
  
  
      
  
  
  
  // SCRIPT PARA MOSTRAR UN MENSAJE QUE NO  SE DESCARGUE HASTA QUE GENERE UN QR PRIMERO //
  
   
      function showErrorMessage(message) {
  
  
          var errorMessage = document.getElementById('error-message');
          errorMessage.textContent = message;
          errorMessage.classList.add('error-message');
      
          setTimeout(function() {
              errorMessage.textContent = "";
              errorMessage.classList.remove('error-message');
          }, 8000);
  
  
      }
  
  
      function checkQRBeforeDownload() {
  
  
          if (!qrGenerated) {
              showErrorMessage('No se está mostrando un QR, genera uno primero.');
          } else {
              showSuccessMessage();
          }
  
  
      }
      
  
  
  
  
  
  
  
  
  
  
  
  // SCRIPT DE MENSAJE DE EXITO DESPUES DE LA DESCARGA DEL QR//
  
  
      function showSuccessMessage() {
  
  
          var mensajeExito = document.getElementById('mensajeExito');
          mensajeExito.style.display = 'block';
      
          setTimeout(function() {
              mensajeExito.style.display = 'none';
          }, 18000);
  
      }
  
  
  
  
  
  
  
  
  
  
  
      // SCRIPT DE EL RELOJ //
  
  
      
      function displayTime() {
  
  
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;
        const time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        document.getElementById("myClock").innerText = time;
        setTimeout(displayTime, 1000);
        
      }
  
      
      displayTime();
      
  
  
  
  
  
  
  
  
  
  
  
  // ESCRIPT para abrir el modal con el QR ampliado
  
  
  
  
  
  function openModalWithQR() {
      const canvas = document.getElementById('qr');
  
      // Crear el modal y sus elementos
      const modal = document.createElement('div');
      modal.classList.add('modal');
      
      const content = document.createElement('div');
      content.classList.add('modal-content');
  
      const closeButton = document.createElement('span');
      closeButton.classList.add('close-button');
      closeButton.textContent = '×';
  
      closeButton.addEventListener('click', () => closeModal(modal));
  
      const qrClone = document.createElement('canvas');
      const ctx = qrClone.getContext('2d');
      qrClone.width = canvas.width * 2;
      qrClone.height = canvas.height * 2;
      ctx.drawImage(canvas, 0, 0, qrClone.width, qrClone.height);
  
      content.appendChild(closeButton);
      content.appendChild(qrClone);
      modal.appendChild(content);
  
      document.body.appendChild(modal);
  
      
      // Agregar evento para cerrar el modal cuando se hace clic fuera de él
      modal.addEventListener('click', function(event) {
          if (event.target === modal) {
              closeModal(modal);
          }
      });
  }
  
  
  // Función para cerrar el modal con animación
  function closeModal(modal) {
      modal.querySelector('.modal-content').style.animation = 'scaleDown 0.5s ease';
      modal.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => {
          document.body.removeChild(modal);
      }, 500);
  }
  
  // Asignar el evento al QR (Canvas) para abrir el modal
  document.getElementById('qr').addEventListener('click', openModalWithQR);
  
  
  
  
  
  
  // FIN //
  
  
  
  
  