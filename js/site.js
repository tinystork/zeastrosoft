(() => {
    "use strict";

    const body = document.body;

    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector("#main-nav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const open = mainNav.classList.toggle("open");

            navToggle.setAttribute("aria-expanded", String(open));
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    function openModal(modal) {
        if (!modal) return;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        body.classList.add("modal-open");
    }


    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");

        if (!document.querySelector(".modal.open, .crest-modal.open")) {
            body.classList.remove("modal-open");
        }
    }


    const creditsButton = document.querySelector("#credits-button");
    const creditsModal = document.querySelector("#credits-modal");

    if (creditsButton && creditsModal) {
        creditsButton.addEventListener("click", () => {
            openModal(creditsModal);
        });

        creditsModal
            .querySelectorAll("[data-close-modal]")
            .forEach((element) => {
                element.addEventListener("click", () => {
                    closeModal(creditsModal);
                });
            });
    }


    const secretStar = document.querySelector("#secret-star");
    const crestModal = document.querySelector("#crest-modal");

    if (secretStar && crestModal) {
        let hoverTimer = null;

        const revealCrest = () => {
            clearTimeout(hoverTimer);
            openModal(crestModal);
        };

        secretStar.addEventListener("click", revealCrest);

        secretStar.addEventListener("mouseenter", () => {
            hoverTimer = window.setTimeout(() => {
                revealCrest();
            }, 1600);
        });

        secretStar.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimer);
        });

        crestModal
            .querySelectorAll("[data-close-crest]")
            .forEach((element) => {
                element.addEventListener("click", () => {
                    closeModal(crestModal);
                });
            });
    }


    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        closeModal(creditsModal);
        closeModal(crestModal);
    });


    const header = document.querySelector(".site-header");

    if (header) {
        const updateHeader = () => {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );
        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );
    }
})();
