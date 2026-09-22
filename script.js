/* =====================================================
   ZARAFSHON RESTAURANT
   MAIN JAVASCRIPT
===================================================== */

"use strict";


/* =========================
   ELEMENTS
========================= */

const body = document.body;

const header = document.getElementById("header");

const menuToggle =
    document.getElementById("menuToggle");

const navbar =
    document.getElementById("navbar");

const navLinks =
    document.querySelectorAll(".nav-link");

const themeBtn =
    document.getElementById("themeBtn");

const backTop =
    document.getElementById("backTop");

const preloader =
    document.getElementById("preloader");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const toastClose =
    document.getElementById("toastClose");


/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 500);

});


/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    navbar.classList.toggle("open");

    body.classList.toggle("no-scroll");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        navbar.classList.remove("open");

        body.classList.remove("no-scroll");

    });

});


/* =========================
   HEADER SCROLL
========================= */

function handleScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();


/* =========================
   BACK TO TOP
========================= */

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================
   DARK MODE
========================= */

const savedTheme =
    localStorage.getItem("zarafshon-theme");


if (savedTheme === "dark") {

    body.classList.add("dark-mode");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeBtn.addEventListener("click", () => {

    body.classList.toggle("dark-mode");


    const isDark =
        body.classList.contains("dark-mode");


    localStorage.setItem(
        "zarafshon-theme",
        isDark ? "dark" : "light"
    );


    themeBtn.innerHTML = isDark

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

});


/* =========================
   MENU FILTER
========================= */

const menuTabs =
    document.querySelectorAll(".menu-tab");

const foodCards =
    document.querySelectorAll(".food-card");


menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        menuTabs.forEach(item => {

            item.classList.remove("active");

        });


        tab.classList.add("active");


        const filter =
            tab.getAttribute("data-filter");


        foodCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hide");

                setTimeout(() => {

                    card.style.opacity = "1";

                }, 20);

            } else {

                card.classList.add("hide");

            }

        });

    });

});


/* =========================
   FAVORITE BUTTON
========================= */

const favoriteButtons =
    document.querySelectorAll(".food-favorite");


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");


        const icon =
            button.querySelector("i");


        if (
            button.classList.contains("active")
        ) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        } else {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

        }

    });

});


/* =========================
   REVIEWS SLIDER
========================= */

const reviews =
    document.querySelectorAll(".review");

const dots =
    document.querySelectorAll(".dot");

const nextReview =
    document.getElementById("nextReview");

const prevReview =
    document.getElementById("prevReview");

let currentReview = 0;


function showReview(index) {

    if (index < 0) {

        currentReview =
            reviews.length - 1;

    } else if (
        index >= reviews.length
    ) {

        currentReview = 0;

    } else {

        currentReview = index;

    }


    reviews.forEach(review => {

        review.classList.remove("active");

    });


    dots.forEach(dot => {

        dot.classList.remove("active");

    });


    reviews[currentReview]
        .classList.add("active");


    dots[currentReview]
        .classList.add("active");

}


nextReview.addEventListener("click", () => {

    showReview(currentReview + 1);

});


prevReview.addEventListener("click", () => {

    showReview(currentReview - 1);

});


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showReview(index);

    });

});


/* Auto slider */

let reviewInterval =
    setInterval(() => {

        showReview(currentReview + 1);

    }, 6000);


const reviewSlider =
    document.querySelector(".reviews-slider");


reviewSlider.addEventListener(
    "mouseenter",
    () => clearInterval(reviewInterval)
);


reviewSlider.addEventListener(
    "mouseleave",
    () => {

        reviewInterval =
            setInterval(() => {

                showReview(currentReview + 1);

            }, 6000);

    }
);


/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.querySelector("img");


        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;


        lightbox.classList.add("active");

        body.classList.add("no-scroll");

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    body.classList.remove("no-scroll");

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    }
);


/* =========================
   TOAST
========================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 5000);

}


toastClose.addEventListener(
    "click",
    () => {

        toast.classList.remove("show");

    }
);


/* =========================
   BOOKING FORM
========================= */

const bookingForm =
    document.getElementById("bookingForm");


const dateInput =
    document.getElementById("date");


/* Minimum date = today */

const today =
    new Date();


const year =
    today.getFullYear();

const month =
    String(
        today.getMonth() + 1
    ).padStart(2, "0");

const day =
    String(
        today.getDate()
    ).padStart(2, "0");


dateInput.min =
    `${year}-${month}-${day}`;


bookingForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById("name")
                .value.trim();


        const phone =
            document.getElementById("phone")
                .value.trim();


        const date =
            document.getElementById("date")
                .value;


        const time =
            document.getElementById("time")
                .value;


        const guests =
            document.getElementById("guests")
                .value;


        if (
            !name ||
            !phone ||
            !date ||
            !time ||
            !guests
        ) {

            showToast(
                "Лутфан ҳамаи майдонҳои заруриро пур кунед."
            );

            return;

        }


        /*
         * Дар версияи оддӣ маълумот
         * танҳо дар браузер қабул мешавад.
         *
         * Барои фиристодани воқеӣ ба WhatsApp,
         * Telegram ё Email метавонед баъд
         * backend пайваст кунед.
         */


        showToast(
            `Ташаккур, ${name}! Дархости бронкунии шумо қабул шуд.`
        );


        bookingForm.reset();

    }
);


/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const input =
            newsletterForm.querySelector(
                "input"
            );


        if (!input.value.trim()) {

            return;

        }


        showToast(
            "Шумо ба хабарҳои мо обуна шудед!"
        );


        newsletterForm.reset();

    }
);


/* =========================
   SHOW MORE MENU
========================= */

const showMoreMenu =
    document.getElementById(
        "showMoreMenu"
    );


showMoreMenu.addEventListener(
    "click",
    () => {

        showToast(
            "Менюи пурра дар версияи оянда илова мешавад."
        );

    }
);


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById(
    "currentYear"
).textContent =
    new Date().getFullYear();


/* =========================
   PHONE NUMBER FORMATTING
========================= */

const phoneInput =
    document.getElementById("phone");


phoneInput.addEventListener(
    "input",
    () => {

        let value =
            phoneInput.value;

        value =
            value.replace(
                /[^\d+]/g,
                ""
            );


        phoneInput.value =
            value;

    }
);


/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {

                return;

            }


            event.preventDefault();


            const target =
                document.querySelector(
                    targetId
                );


            const headerHeight =
                header.offsetHeight;


            const targetPosition =
                target.offsetTop -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================
   CONSOLE MESSAGE
========================= */

console.log(
    "Zarafshon Restaurant website loaded successfully."
);