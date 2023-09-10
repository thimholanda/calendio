document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const header = document.querySelector("header");
    const className = "header--active";

    if (scrollPosition > 90) {
      header.classList.add(className);
    } else {
      header.classList.remove(className);
    }
  });

  const observerFeatures = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetAccordion();
          startProgressBar(currentIndex);
          isPaused = false;
        } else {
          isPaused = true;
          resetAccordion();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  const features = document.querySelector(".features");
  observerFeatures.observe(features);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("data-id");
        const img = document.querySelector(".benefits__content--sticky img");

        if (entry.isIntersecting) {
          img.classList.add("fade-out");

          switch (id) {
            case "1":
              img.src = "./imgs/calendio-benefit-1.webp";
              img.alt = "Image 1 description";
              break;
            case "2":
              img.src = "./imgs/calendio-benefit-2.webp";
              img.alt = "Image 2 description";
              break;
            case "3":
              img.src = "./imgs/calendio-benefit-3.webp";
              img.alt = "Image 3 description";
              break;
          }
          img.classList.remove("fade-out");
        }
      });
    },
    {
      threshold: 1,
    }
  );

  document.querySelectorAll(".benefits__content").forEach((section, index) => {
    section.setAttribute("data-id", index + 1);
    observer.observe(section);
  });

  const accordionItems = document.querySelectorAll(".features-accordion__item");
  let currentIndex = 0;
  let progressInterval = null;
  let isPaused = false;

  const imgsAccordion = document.querySelectorAll(".features-accordion__img img");

  function resetAccordion() {
    accordionItems.forEach((item, index) => {
      item.querySelector(".features-accordion__content").classList.remove("features-accordion__content--height-auto");
      item.querySelector(".features-accordion__content").style.paddingTop = "0";
      item.querySelector(".features-accordion__progress").style.width = "0%";
      item.querySelector(".features-accordion__progress-bar").style.display = "none";
      item.querySelector("button").style.pointerEvents = "auto";

      imgsAccordion[index].style.opacity = "0";
      imgsAccordion[index].style.transform = "scale(.9)";
      setTimeout(() => (imgsAccordion[index].style.display = "none"), 200);

      if (index === currentIndex) {
        setTimeout(() => (imgsAccordion[index].style.display = ""), 200);
        setTimeout(() => {
          imgsAccordion[index].style.opacity = "1";
          imgsAccordion[index].style.transform = "scale(1)";
        }, 400);
        item.querySelector(".features-accordion__content").style.paddingTop = "20px";
        item.querySelector(".features-accordion__content").style.display = "";
        item.querySelector(".features-accordion__content").style.height = "auto";
        item.querySelector("button").style.pointerEvents = "none";
        setTimeout(() => item.querySelector(".features-accordion__content").classList.add("features-accordion__content--height-auto"), 10);

        item.querySelector(".features-accordion__progress-bar").style.display = "";
      }
    });
  }

  const nextItem = () => {
    currentIndex = (currentIndex + 1) % accordionItems.length;
    resetAccordion();
    startProgressBar(currentIndex);
  };

  accordionItems.forEach((item, index) => {
    item.querySelector("button").addEventListener("click", () => {
      currentIndex = index;
      resetAccordion();
    });

    item.addEventListener("mouseover", () => {
      isPaused = true;
    });

    item.addEventListener("mouseout", () => {
      isPaused = false;
      startProgressBar(currentIndex);
    });
  });

  function startProgressBar(index) {
    let width = parseFloat(accordionItems[index].querySelector(".features-accordion__progress").style.width);

    if (progressInterval) clearInterval(progressInterval);

    progressInterval = setInterval(() => {
      if (width >= 100) {
        clearInterval(progressInterval);
        nextItem();
      } else {
        if (isPaused) return;
        width += 1;
        accordionItems[index].querySelector(".features-accordion__progress").style.width = width + "%";
      }
    }, 100);
  }

  const mobileButton = document.querySelector(".menu__btn-mobile");

  let menuIsOpen = false;

  mobileButton.addEventListener("click", () => {
    const img = document.querySelector(".menu__btn-mobile img");
    if (!menuIsOpen) {
      menuIsOpen = true;
      img.src = "./imgs/icon-close.svg";
      const wrapperSubmenu = document.querySelector(".menu__wrapper-submenu");
      wrapperSubmenu.style.left = "0";
    } else {
      menuIsOpen = false;
      img.src = "./imgs/icon-menu.svg";
      const wrapperSubmenu = document.querySelector(".menu__wrapper-submenu");
      wrapperSubmenu.style.left = "-100%";
    }
  });
});
