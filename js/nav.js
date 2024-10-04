// set current year in footer section
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById('year-span');
yearSpan.textContent = currentYear;

// search-box open close js code
let navbar = document.querySelector(".navbar");
 
// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .fa-bars");
let menuCloseBtn = document.querySelector(".nav-links .fa-close");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-120%";
}

// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow, .submenu-link");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}

//////////////////// modal contact window code //////////////////

function openModal(modalform, breed) {
    
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modalContent');
    const htmlContentDiv = document.getElementById('htmlContent');
    
    setTimeout(() => {
        modalContent.classList.add('active');
    }, 100);
    
    // Fetch external HTML content and inject it into the modal
    fetch('./'+modalform+'-modal.html') // Load external HTML
        .then(response => response.text())
        .then(data => {
            htmlContentDiv.innerHTML = data;
            modal.style.display = 'block';
           
            const imgElements = document.querySelectorAll('.breed-images');
            // Loop through each image element and replace "breed" with the new value for the look-inside window
            imgElements.forEach(imgElement => {
                imgElement.src = imgElement.src.replace("breed", breed);
            });
            console.log(">"+breed+"<");
            // change top and height for look inside
            const modalDiv = document.getElementById("modalContent");
            if (breed !== "") {
              modalDiv.style.setProperty("margin","50px auto");
              modalDiv.style.setProperty("padding","10px auto");
              
              if (window.matchMedia("(max-width: 600px)").matches) {
                modalDiv.style.setProperty("max-width","90%");
              } else if (window.matchMedia("(max-width: 1000px)").matches) {
                modalDiv.style.setProperty("max-width","60%");
              } else {
                modalDiv.style.setProperty("max-width","35%");
              };
            } 
            // Adjust modal width based on content width
            setTimeout(() => {
                let contentWidth = htmlContentDiv.scrollWidth;
                modalContent.style.width = contentWidth + 'px';
            }, 100); // Timeout to ensure content is rendered first
        });
}

// Function to close the modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    const modalContent = document.querySelector('.modal-content');
    modalContent.removeAttribute('style'); // Reset inline styles
    modalContent.classList.remove('active');
}

// Event listeners for opening and closing the modal
document.getElementById('openModalLink').addEventListener('click', () => {openModal("contact-us", "");});
// this one is for look inside where breed is passed as an attribute
const element = document.getElementById("openLookInside");
if (element) {
  document.getElementById('openLookInside').addEventListener('click', (e) => {
    openModal("look-inside", e.target.getAttribute("breed"));
  });
};

document.getElementById('closeModal').addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        modalContent.classList.remove('active');
    }
};

// Close modal when Escape pressed
document.addEventListener('keydown', function(event) {
    // Check if the pressed key is 'Escape' or 'Esc'
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeModal();
    }
});

// /* mail webfrom from web3form */
// catching the submit from the modal window without using submit
function modalSubmit(e) {
    e.preventDefault();
    const form = document.getElementById("form");
    const result = document.getElementById("result");
    const formData = new FormData(form);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    result.innerHTML = "Please wait...";
  
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: json
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
        } else {
          console.log(response);
          result.innerHTML = json.message;
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
        // close the modal window
        closeModal();
  
        // Open the modal
        openThankYouModal();
  
      });
  };
  
   // Function to create and open a modal dynamically
  function openThankYouModal() {
      
    // Create modal elements dynamically
    const modal = document.createElement('div');
    modal.classList.add('modal');
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    setTimeout(() => {
      modalContent.classList.add('active');
    }, 100);
  
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
  
