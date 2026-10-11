
/* =========================================
   VÆLZAROTH — INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const soundToggle = document.getElementById("soundToggle");
    const soundIcon = document.getElementById("soundIcon");
    const videos = Array.from(document.querySelectorAll("video"));

    // MOBILE NAVIGATION
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
            menuToggle.querySelector(".menu-lines").textContent =
                isOpen ? "✕" : "☰";
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.querySelector(".menu-lines").textContent = "☰";
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                mainNav.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.querySelector(".menu-lines").textContent = "☰";
            }
        });
    }

    // PLAY ONLY ONE VIDEO AT A TIME
    videos.forEach((video) => {
        video.addEventListener("play", () => {
            videos.forEach((otherVideo) => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });

    // MUTE / UNMUTE ALL VIDEOS
    let videosMuted = false;

    if (soundToggle && soundIcon) {
        soundToggle.addEventListener("click", () => {
            videosMuted = !videosMuted;

            videos.forEach((video) => {
                video.muted = videosMuted;
            });

            soundIcon.textContent = videosMuted ? "×" : "♫";
            soundToggle.setAttribute(
                "aria-label",
                videosMuted
                    ? "Unmute videos"
                    : "Mute videos"
            );
            soundToggle.title = videosMuted
                ? "Unmute videos"
                : "Mute videos";
        });
    }

    // SMOOTH SECTION REVEAL
    const revealTargets = document.querySelectorAll(
        ".section-heading, .chamber-card, .video-card, .creed-item"
    );

    if ("IntersectionObserver" in window) {
        document.documentElement.classList.add("reveal-ready");

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -25px 0px"
            }
        );

        revealTargets.forEach((element) => {
            element.classList.add("reveal-item");
            revealObserver.observe(element);
        });
    }

    // UPDATE VIDEO ERROR MESSAGES WHEN A FILE CANNOT LOAD
    videos.forEach((video) => {
        video.addEventListener("error", () => {
            const frame = video.closest(".video-frame");

            if (frame && !frame.querySelector(".video-error")) {
                const message = document.createElement("p");
                message.className = "video-error";
                message.textContent =
                    "Video unavailable — check the MP4 filename and location.";

                message.style.cssText =
                    "padding:12px;color:#e5bd86;text-align:center;font-size:15px;";

                frame.appendChild(message);
            }
        });
    });
});
