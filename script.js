function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.classList.toggle("hidden");
  }
  
  function loadSection(section) {
    document.getElementById("content-area").innerHTML = "Loading...";
  
    const script = document.createElement('script');
    script.src = `js/${section}.js`;
    script.onload = () => {
      document.getElementById("content-area").innerHTML = "";
      if (typeof initSection === 'function') {
        initSection();
      }
    };
    document.head.appendChild(script);
  }
  