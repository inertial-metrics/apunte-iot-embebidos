const mode = document.getElementById('mode');


function toggleDarkMode(isDarkMode) {
    const syntaxStyle = document.getElementById('syntax-style');
    let BaseURL = syntaxStyle.getAttribute('data-base');
    if (isDarkMode) {
      syntaxStyle.href = BaseURL+'css/dracula.css';
    } else {
      syntaxStyle.href = BaseURL+'css/github.css';
    }
  }

if (mode !== null) {

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {

    if (event.matches) {

      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-dark-mode', '');

    } else {

      localStorage.setItem('theme', 'light');
      document.documentElement.removeAttribute('data-dark-mode');

    }

  })

  mode.addEventListener('click', () => {

    document.documentElement.toggleAttribute('data-dark-mode');
    localStorage.setItem('theme', document.documentElement.hasAttribute('data-dark-mode') ? 'dark' : 'light');
    toggleDarkMode(document.documentElement.hasAttribute('data-dark-mode'));
  });

  if (localStorage.getItem('theme') === 'dark') {

    document.documentElement.setAttribute('data-dark-mode', '');

  } else {

    document.documentElement.removeAttribute('data-dark-mode');
  }

}

toggleDarkMode(document.documentElement.hasAttribute('data-dark-mode'));