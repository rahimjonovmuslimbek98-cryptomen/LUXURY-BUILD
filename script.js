// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        menuBtn.classList.toggle("active");
    });
}

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuBtn.classList.remove("active");
    });
});


// =========================
// HEADER SCROLL
// =========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector("button[type='submit']");

        const originalText =
            submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Yuborilmoqda...";


        const formData = {

            name: contactForm.name.value.trim(),

            phone: contactForm.phone.value.trim(),

            service: contactForm.service.value,

            message: contactForm.message.value.trim()

        };


        try {

            const response = await fetch(
                "https://luxurybuild-backend.onrender.com/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await response.json();


            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Xabar yuborilmadi."
                );
            }


            alert(
                "✅ So‘rovingiz muvaffaqiyatli yuborildi."
            );

            contactForm.reset();


        } catch (error) {

            console.error("FORM ERROR:", error);

            alert(
                "❌ Xabar yuborilmadi. Backend ishlayotganini tekshiring."
            );

        } finally {

            submitButton.disabled = false;

            submitButton.textContent = originalText;

        }

    });

}


// =========================
// PORTFOLIO MODAL
// =========================

const portfolioCards =
    document.querySelectorAll(".project-card");

const portfolioModal =
    document.getElementById("portfolioModal");

const portfolioImage =
    document.getElementById("portfolioImage");

const portfolioTitle =
    document.getElementById("portfolioTitle");

const portfolioDescription =
    document.getElementById("portfolioDescription");

const portfolioCounter =
    document.getElementById("portfolioCounter");

const portfolioClose =
    document.getElementById("portfolioClose");

const portfolioPrev =
    document.getElementById("portfolioPrev");

const portfolioNext =
    document.getElementById("portfolioNext");


let currentProject = 0;


// Open project

function openPortfolio(index) {

    currentProject = index;

    const card = portfolioCards[currentProject];

    const image = card.querySelector("img");

    const title = card.querySelector("h3");

    const description = card.querySelector("p");


    portfolioImage.src = image.src;

    portfolioImage.alt = image.alt;

    portfolioTitle.textContent =
        title.textContent;

    portfolioDescription.textContent =
        description.textContent;

    portfolioCounter.textContent =
        `${String(currentProject + 1).padStart(2, "0")} / ${String(portfolioCards.length).padStart(2, "0")}`;


    portfolioModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


// Close project

function closePortfolio() {

    portfolioModal.classList.remove("active");

    document.body.style.overflow = "";

}


// Previous

function previousProject() {

    currentProject--;

    if (currentProject < 0) {
        currentProject = portfolioCards.length - 1;
    }

    openPortfolio(currentProject);

}


// Next

function nextProject() {

    currentProject++;

    if (currentProject >= portfolioCards.length) {
        currentProject = 0;
    }

    openPortfolio(currentProject);

}


// Card click

portfolioCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        openPortfolio(index);

    });

});


// Buttons

portfolioClose.addEventListener(
    "click",
    closePortfolio
);

portfolioPrev.addEventListener(
    "click",
    previousProject
);

portfolioNext.addEventListener(
    "click",
    nextProject
);


// Click outside

portfolioModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === portfolioModal
        ) {
            closePortfolio();
        }

    }
);


// Keyboard controls

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !portfolioModal.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "Escape") {
            closePortfolio();
        }


        if (event.key === "ArrowLeft") {
            previousProject();
        }


        if (event.key === "ArrowRight") {
            nextProject();
        }

    }
);
// =========================================
// CLICK GLOW EFFECT
// =========================================

const clickGlow = document.createElement("div");

clickGlow.className = "click-glow";

document.body.appendChild(clickGlow);

document.addEventListener("pointerdown", (event) => {

    clickGlow.style.left = `${event.clientX}px`;
    clickGlow.style.top = `${event.clientY}px`;

    clickGlow.classList.remove("active");

    void clickGlow.offsetWidth;

    clickGlow.classList.add("active");

    setTimeout(() => {
        clickGlow.classList.remove("active");
    }, 550);

});
