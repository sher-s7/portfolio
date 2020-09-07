const anchors = document.querySelectorAll('a[href^="#project"]');
const nav = document.getElementById("projectsNav");
const scrollUpBtn = document.getElementById("scrollToTop");

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function onScroll() {
  const scrollHeight = document.getElementById("project-reddit").scrollHeight;

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

document.getElementById('copyBtn').addEventListener('click', () => {
  const copyText = document.getElementById('email');
  const copySuccess = document.getElementById('copySuccess');
  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand('copy');
  copySuccess.classList.remove('hidden')
  setTimeout(() => {
    copySuccess.classList.add('hidden')
  }, 2000);
})