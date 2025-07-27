// Header Dropdown Logic
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll("[data-dropdown]");
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // ✅ Hover logic (Desktop only)
  if (!isTouchDevice) {
    dropdownButtons.forEach((button) => {
      const parent = button.closest(".dropdown");
      const menu = parent.querySelector(".dropdown-menu");

      parent.addEventListener("mouseenter", () => {
        parent.classList.add("showDropdown");
        menu.classList.add("show");
      });

      parent.addEventListener("mouseleave", () => {
        parent.classList.remove("showDropdown");
        menu.classList.remove("show");
      });
    });
  }

  // ✅ Click logic (Always enabled)
  document.addEventListener("click", function (e) {
    const isDropdownBtn = e.target.closest("[data-dropdown]");
    const isInsideDropdown = e.target.closest(".dropdown");
    const allMenus = document.querySelectorAll(".dropdown-menu");
    const allDropdowns = document.querySelectorAll(".dropdown");

    if (isDropdownBtn) {
      const parent = isDropdownBtn.closest(".dropdown");
      const menu = parent.querySelector(".dropdown-menu");

      allMenus.forEach((m) => {
        if (m !== menu) m.classList.remove("show");
      });

      allDropdowns.forEach((d) => {
        if (d !== parent) d.classList.remove("showDropdown");
      });

      parent.classList.toggle("showDropdown");
      menu.classList.toggle("show");
    } else if (!isInsideDropdown) {
      allMenus.forEach((m) => m.classList.remove("show"));
      allDropdowns.forEach((d) => d.classList.remove("showDropdown"));
    }
  });
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggleBtn = document.querySelector("[data-mobile-menu-toggle]");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileBtn = document.querySelector("[data-close-mobile]");

  if (mobileToggleBtn && mobileMenu && closeMobileBtn) {
    mobileToggleBtn.addEventListener("click", () => {
      mobileMenu.classList.add("offcanvas-open");
      document.body.classList.add("overflow-hidden"); // Prevent scrolling when menu is open
    });

    closeMobileBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("offcanvas-open");
      document.body.classList.remove("overflow-hidden"); // Allow scrolling when menu is closed
    });

    // Close mobile menu when clicking outside (on the overlay)
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("offcanvas-open");
        document.body.classList.remove("overflow-hidden");
      }
    });
  }
});

// Header background and text color change on scroll
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("mainHeader");
  const desktopNavLinks = document.querySelectorAll(
    "#desktopNavLinks > li > a, #desktopNavLinks > li > button"
  );

  // Function to update header styles based on scroll position
  function updateHeaderStyles() {
    if (window.scrollY > 100) {
      // Apply blur background and ensure shadow is present
      header.classList.remove("bg-transparent", "lg:shadow-none");
      header.classList.add("bg-blur-header", "shadow-xl");

      // Change text color for main nav items (excluding the 'Contáctanos' button)
      desktopNavLinks.forEach((link) => {
        // Check if the link is not the "Contáctanos" button (which has bg-slate-500)
        if (!link.classList.contains("bg-slate-500")) {
          link.classList.remove("text-slate-800", "hover:text-slate-500");
          link.classList.add("text-white", "hover:text-gray-300");
        }
        // Also update SVG stroke color for dropdown arrows
        const svgPath = link.querySelector("svg path");
        if (svgPath) {
          svgPath.setAttribute("stroke", "#ffffff"); // Change SVG stroke to white
        }
      });
    } else {
      // Revert to transparent background and large screen no-shadow
      header.classList.remove("bg-blur-header", "shadow-xl");
      header.classList.add("bg-transparent", "lg:shadow-none");

      // Revert text color for main nav items
      desktopNavLinks.forEach((link) => {
        if (!link.classList.contains("bg-slate-500")) {
          link.classList.remove("text-white", "hover:text-gray-300");
          link.classList.add("text-slate-800", "hover:text-slate-500");
        }
        const svgPath = link.querySelector("svg path");
        if (svgPath) {
          svgPath.setAttribute("stroke", "#425464"); // Revert SVG stroke to original dark color
        }
      });
    }
  }

  if (header) {
    // Call the function once on DOMContentLoaded to set initial state
    updateHeaderStyles();
    // Add scroll event listener
    window.addEventListener("scroll", updateHeaderStyles);
  }
});

// Floating Chat Button and Notification Functionality
document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.getElementById("chatButton");
  const chatNotification = document.getElementById("chatNotification");
  const chatboxOverlay = document.getElementById("chatboxOverlay");
  const chatbox = document.getElementById("chatbox");
  const chatboxCloseButton = document.getElementById("chatboxCloseButton");
  const chatInput = document.getElementById("chatInput");
  const sendMessageButton = document.getElementById("sendMessageButton");
  const chatboxBody = document.getElementById("chatboxBody");

  let notificationTimeout;

  // Function to show notification
  function showNotification() {
    chatNotification.classList.remove(
      "opacity-0",
      "invisible",
      "translate-y-2.5"
    );
    chatNotification.classList.add("opacity-100", "visible", "translate-y-0");
    // Clear any existing timeout before setting a new one
    clearTimeout(notificationTimeout);
    // Hide after 5 seconds
    notificationTimeout = setTimeout(() => {
      chatNotification.classList.remove(
        "opacity-100",
        "visible",
        "translate-y-0"
      );
      chatNotification.classList.add(
        "opacity-0",
        "invisible",
        "translate-y-2.5"
      );
    }, 5000);
  }

  // Function to hide notification
  function hideNotification() {
    chatNotification.classList.remove(
      "opacity-100",
      "visible",
      "translate-y-0"
    );
    chatNotification.classList.add("opacity-0", "invisible", "translate-y-2.5");
    clearTimeout(notificationTimeout); // Clear timeout if hidden manually
  }

  // Function to open chatbox
  function openChatbox() {
    hideNotification(); // Hide notification when chatbox opens
    chatboxOverlay.classList.remove("opacity-0", "invisible");
    chatboxOverlay.classList.add("opacity-100", "visible");
    chatbox.classList.remove("translate-x-full");
    chatbox.classList.add("translate-x-0");
    document.body.classList.add("overflow-hidden"); // Prevent body scrolling
  }

  // Function to close chatbox
  function closeChatbox() {
    chatboxOverlay.classList.remove("opacity-100", "visible");
    chatboxOverlay.classList.add("opacity-0", "invisible");
    chatbox.classList.remove("translate-x-0");
    chatbox.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden"); // Allow body scrolling
  }

  // Toggle chatbox on button click
  if (
    chatButton &&
    chatNotification &&
    chatboxOverlay &&
    chatbox &&
    chatboxCloseButton
  ) {
    chatButton.addEventListener("click", () => {
      if (chatbox.classList.contains("translate-x-0")) {
        // Check for 'open' state via Tailwind class
        closeChatbox();
      } else {
        openChatbox();
      }
    });

    // Close chatbox when clicking the close button
    chatboxCloseButton.addEventListener("click", closeChatbox);

    // Close chatbox when clicking on the overlay
    chatboxOverlay.addEventListener("click", (e) => {
      if (e.target === chatboxOverlay) {
        closeChatbox();
      }
    });

    // Send message functionality
    if (sendMessageButton && chatInput && chatboxBody) {
      const sendMessage = () => {
        const messageText = chatInput.value.trim();
        if (messageText) {
          const messageDiv = document.createElement("div");
          // Apply Tailwind classes directly here
          messageDiv.classList.add(
            "bg-indigo-600",
            "text-white",
            "p-3",
            "rounded-lg",
            "mb-2",
            "max-w-[80%]",
            "self-end"
          );
          messageDiv.textContent = messageText;
          chatboxBody.appendChild(messageDiv);
          chatInput.value = ""; // Clear input
          chatboxBody.scrollTop = chatboxBody.scrollHeight; // Scroll to bottom
        }
      };

      sendMessageButton.addEventListener("click", sendMessage);
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      });
    }

    // Show notification initially on page load for a few seconds
    showNotification();
  }
});

//slider

document.addEventListener("DOMContentLoaded", function () {
  new Splide(".testimonialsSplide", {
    type: "loop",
    autoWidth: true,
    focus: "center",
    gap: "32px",
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    arrows: false,
    pagination: {
      el: ".custom-pagination",
    },
  }).mount();
});
