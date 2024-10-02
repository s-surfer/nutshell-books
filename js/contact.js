// /* mail webfrom from web3form */
// catching the submit from the modal window without using submit
function modalSubmit(e) {
  e.preventDefault();
  // const form = document.getElementById("form");
  // const result = document.getElementById("result");
  // const formData = new FormData(form);
  // var object = {};
  // formData.forEach((value, key) => {
  //   object[key] = value;
  // });
  // var json = JSON.stringify(object);
  // result.innerHTML = "Please wait...";

  // fetch("https://api.web3forms.com/submit", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: json
  // })
  //   .then(async (response) => {
  //     let json = await response.json();
  //     if (response.status == 200) {
  //       result.innerHTML = json.message;
  //     } else {
  //       console.log(response);
  //       result.innerHTML = json.message;
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     result.innerHTML = "Something went wrong!";
  //   })
  //   .then(function () {
  //     form.reset();
  //     setTimeout(() => {
  //       result.style.display = "none";
  //     }, 5000);
      // close the modal window
      closeModal();

      // Open the modal
      openThankYouModal();

    // });

 };

 // Function to create and open a modal dynamically
function openThankYouModal() {
    
  // Create modal elements dynamically
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  
  alert("here");

  setTimeout(() => {
    modalContent.classList.add('active');
  }, 5000);

  // Create close button
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = function() {
    modal.style.display = 'none'; // Close the modal when clicked
  };

  // Create envelope image
  const envelopeHeader = document.createElement('h2');
  envelopeHeader.innerHTML = "<i class='fas fa-envelope-open-text'></i><br /><br />Your mail was sent successfully!<br />";
  
  // Create thank you message
  const thankYouMessage = document.createElement('p');
  thankYouMessage.textContent = "Thank you for reaching out to us, we'll be in touch shortly!";

  // Append elements to modal content
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(envelopeHeader);
  modalContent.appendChild(thankYouMessage);

  // Append modal content to modal
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);

  // Show the modal
  modal.style.display = 'block';

  // Close the modal when clicking outside the modal content
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

}
