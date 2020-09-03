const anchors = document.querySelectorAll('a[href^="#"]');
const nav = document.getElementById("projectsNav");

const onScroll = function () {
  const scrollHeight = document.getElementById("project-reddit").scrollHeight;
  if (window.scrollY >= 0 && window.scrollY < scrollHeight) {
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
