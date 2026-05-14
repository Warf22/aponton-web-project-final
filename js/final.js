const contrastToggle = document.getElementById("contrastToggle");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");
const productSearch = document.getElementById("productSearch");
const productFilter = document.getElementById("productFilter");
const productCards = document.querySelectorAll(".product-card");
const contactForm = document.getElementById("contactForm");
const contactResponse = document.getElementById("contactResponse");

if (contrastToggle) {
   const savedMode = localStorage.getItem("contrastMode");

   if (savedMode === "on") {
      document.body.classList.add("high-contrast");
      contrastToggle.setAttribute("aria-pressed", "true");
   }

   contrastToggle.addEventListener("click", function () {
      document.body.classList.toggle("high-contrast");
      const enabled = document.body.classList.contains("high-contrast");
      contrastToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      localStorage.setItem("contrastMode", enabled ? "on" : "off");
   });
}

if (newsletterForm) {
   newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("newsletterName").value.trim();
      const email = document.getElementById("newsletterEmail").value.trim();

      if (name === "" || email === "") {
         newsletterMessage.textContent = "Please enter your name and email.";
         return;
      }

      newsletterMessage.textContent = "Thanks, " + name + ". You have been added to the GreenTech newsletter.";
      newsletterForm.reset();
   });
}

function filterProducts() {
   if (!productCards.length || !productSearch || !productFilter) {
      return;
   }

   const searchValue = productSearch.value.trim().toLowerCase();
   const filterValue = productFilter.value;

   productCards.forEach(function (card) {
      const category = card.getAttribute("data-category");
      const text = card.textContent.toLowerCase();

      const matchesSearch = text.includes(searchValue);
      const matchesFilter = filterValue === "all" || category === filterValue;

      if (matchesSearch && matchesFilter) {
         card.classList.remove("hidden");
      } else {
         card.classList.add("hidden");
      }
   });
}

if (productSearch && productFilter) {
   productSearch.addEventListener("input", filterProducts);
   productFilter.addEventListener("change", filterProducts);
}

if (contactForm) {
   contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      if (name === "" || email === "" || message === "") {
         contactResponse.textContent = "Please complete all contact form fields.";
         return;
      }

      contactResponse.textContent = "Thank you, " + name + ". Your message has been sent to GreenTech Solutions.";
      contactForm.reset();
   });
}