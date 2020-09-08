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
  if (window.scrollY > 235) {
    scrollUpBtn.classList.remove("hidden");
  } else {
    scrollUpBtn.classList.add("hidden");
  }
};

window.addEventListener("scroll", debounce(onScroll, 250));

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