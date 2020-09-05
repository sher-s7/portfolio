window.onload = () => {
  const anchors = document.querySelectorAll('a[href^="#project"]');
  const nav = document.getElementById("projectsNav");
  const scrollUpBtn = document.getElementById("scrollToTop");

  const onScroll = function () {
    const scrollHeight = document.getElementById("project-reddit").scrollHeight;
    // const scrollLeftMax = nav.scrollWidth - nav.clientWidth;
    // const scrollMaxY =
    //   document.documentElement.scrollHeight -
    //   document.documentElement.clientHeight;
    // nav.scrollLeft = window.scrollY / (scrollMaxY / scrollLeftMax)

    if (window.scrollY > 235) {
      scrollUpBtn.classList.remove("hidden");
    } else {
      scrollUpBtn.classList.add("hidden");
    }
    if (window.scrollY < 220) {
      document.body.style.setProperty(
        "--currentColor",
        getComputedStyle(document.body).getPropertyValue("--bg")
      );
    }
    if (window.scrollY >= 220 && window.scrollY < scrollHeight) {
      document.querySelector(".selected").classList.remove("selected");
      document.getElementById("redditClone").classList.add("selected");
      document.body.style.setProperty(
        "--currentColor",
        getComputedStyle(document.body).getPropertyValue("--breddit")
      );
    } else if (
      window.scrollY >= scrollHeight &&
      window.scrollY < scrollHeight * 2
    ) {
      document.querySelector(".selected").classList.remove("selected");
      document.getElementById("weatherCheck").classList.add("selected");
      document.body.style.setProperty(
        "--currentColor",
        getComputedStyle(document.body).getPropertyValue("--weather")
      );
    } else if (
      window.scrollY >= scrollHeight * 2 &&
      window.scrollY < scrollHeight * 3
    ) {
      document.querySelector(".selected").classList.remove("selected");
      document.getElementById("todoList").classList.add("selected");
      document.body.style.setProperty(
        "--currentColor",
        getComputedStyle(document.body).getPropertyValue("--todo")
      );
    } else if (window.scrollY >= scrollHeight * 3) {
      document.querySelector(".selected").classList.remove("selected");
      document.getElementById("teaTime").classList.add("selected");
      document.body.style.setProperty(
        "--currentColor",
        getComputedStyle(document.body).getPropertyValue("--tea")
      );
    }
  };

  window.addEventListener("scroll", onScroll);

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      document.querySelector(".selected").classList.remove("selected");
      anchor.classList.add("selected");
      anchor.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    });
  });
};
