// set current year in footer section
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById('year-span');
yearSpan.textContent = currentYear;

const focusableElements = 'button, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
let firstFocusableElement,lastFocusableElement, focusableCount = 0;

// search-box open close js code
let navbar = document.querySelector(".navbar");
 
// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .icon-bars");
let menuCloseBtn = document.querySelector(".nav-links .icon-close");

if (menuOpenBtn) {
  menuOpenBtn.onclick = function() {
    navLinks.style.left = "0";
  }
}
if (menuCloseBtn) {
  menuCloseBtn.onclick = function() {
    navLinks.style.left = "-120%";
  }
}

// sidebar submenu open close js code
let arrow = document.querySelector(".menu-arrow, .link-to-submenu");
if (arrow) {
  arrow.onclick = function() {
    navLinks.classList.toggle("show1");
  }
}

//////////////////// modal contact window code //////////////////

function openModal(modalform, breed) {
    
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modalContent');
    const htmlContentDiv = document.getElementById('htmlContent');

    document.body.classList.add('modal-open'); // Prevent background shift
    
    setTimeout(() => {
        modalContent.classList.add('show');
    }, 100);
    
    // Fetch external HTML content and inject it into the modal
    fetch('./'+modalform+'-modal.html') // Load external HTML
        .then(response => response.text())
        .then(data => {
            htmlContentDiv.innerHTML = data;
            // this is what activates the moda; by turing display to block
            modal.style.display = 'block';
           
            const imgElements = document.querySelectorAll('.breed-images');
            // Loop through each image element and replace "breed" with the new value for the look-inside window
            imgElements.forEach(imgElement => {
                imgElement.src = imgElement.src.replace("breed", breed);
            });
            // change top and height for look inside
            const modalDiv = document.getElementById("modalContent");
                        
            if (breed !== "") {
              // lookinside
              modalContent.classList.add('modal-center'); //position of modal window

              modalDiv.style.setProperty("top","520px");
              modalDiv.style.setProperty("left","50%");
              modalDiv.style.setProperty("padding","10px auto");
                          
              if (window.matchMedia("(max-width: 600px)").matches) {
                modalDiv.style.setProperty("max-width","92%");
              } else if (window.matchMedia("(max-width: 1000px)").matches) {
                modalDiv.style.setProperty("max-width","70%");
              } else {
                modalDiv.style.setProperty("max-width","600px");
              };
            } else {
              modalContent.classList.add('modal-right'); //position of modal window
            } 
            // Adjust modal width based on content width
            // setTimeout(() => {
                // let contentWidth = htmlContentDiv.scrollWidth;
                // modalContent.style.width = contentWidth + 'px';
            // }, 100); // Timeout to ensure content is rendered first
  
            const focusableContent = getFocusableElements(modal); // Get visible focusable elements
            focusableCount = focusableContent.length
            firstFocusableElement = focusableContent[0];
            lastFocusableElement = focusableContent[focusableCount - 1];
            firstFocusableElement.focus();
            
        });
}

// make sure onl visible elements are focusable - for tab
function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(focusableElements)).filter(
    el => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden'
  );
}

// Function to close the modal
function closeModal() {
  
  document.body.classList.remove('modal-open'); // Prevent background shift
  
  document.getElementById('myModal').style.display = 'none';
    const modalContent = document.querySelector('.modal-content');
    modalContent.removeAttribute('style'); // Reset inline styles
    modalContent.classList.remove('show');
    modalContent.classList.remove('modal-center');
    modalContent.classList.remove('modal-right');
    // remove htmlcontent
    document.getElementById("htmlContent").innerHTML = "";
}

// Event listeners for opening and closing the modal
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('openModalLink')) {
    openModal("contact-us", "");
  };
});

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
      closeModal();
    }
};

// Close modal when Escape pressed
document.addEventListener('keydown', function(event) {
  // check for tab key  
  if (event.key === "Tab") {
    if (focusableCount) {
      if (event.shiftKey) {
        // Shift + Tab: cycle backward
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab: cycle forward
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    } else {
      event.preventDefault();     // ignore tab
      closeModal();
    }
  
  // Check if the pressed key is 'Escape' or 'Esc'
  } else  if (event.key === 'Escape' || event.key === 'Esc') {
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
        }, 200);
    //     // close the modal window
        closeModal();
  
        // Open the modal
        setTimeout(() => {
          openModal("message-sent","");
        }, 100);      
      });
  };


////// lazy loading images for mobiles ////////
function applyLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy'); // Select only images with class "lazy"
  const screenWidth = window.innerWidth;

  if (screenWidth <= 700) {
      lazyImages.forEach(img => {
          img.setAttribute('loading', 'lazy');
      });
  } else {
      lazyImages.forEach(img => {
          img.removeAttribute('loading'); // Remove lazy loading for larger screens
      });
  }
}
// Run the function initially
applyLazyLoading();

// Reapply on window resize
window.addEventListener('resize', applyLazyLoading);