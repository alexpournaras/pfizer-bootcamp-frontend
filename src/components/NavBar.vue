<template>
    
    <nav>
      <div id="logo">Pharaceutical app</div>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
  <style scoped>
  /* Basic Navbar Styles */
  nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fe8888;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adds shadow to the navbar */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px; /* Adds padding for spacing */
  z-index: 1000; /* Ensures it stays on top */
  overflow: hidden; /* Prevents overflow */
}

#logo {
  color: white;
  font-size: 1.8rem;
  font-weight: 800; /* Bolder text */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* Adds a subtle shadow to the text */
  letter-spacing: 1px;
  letter-spacing: 1px;
  margin-right: 35%; /* Position logo 5% from the left */
}

ul.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
}

ul.nav-links li {
  margin-left: 30px; /* Space between the menu items */
}

ul.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: 600; /* Semi-bold for improved visibility */
  transition: color 0.3s ease-in-out; /* Smooth hover effect */
}

ul.nav-links a:hover {
  color: #fefefe;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Shadow effect on hover */
}

/* Add media queries for responsive design */
@media screen and (max-width: 768px) {
  nav {
    padding: 10px 20px;
  }

  ul.nav-links {
    flex-direction: column; /* Stack items vertically on smaller screens */
    position: absolute;
    background-color: #fe8888;
    width: 100%;
    top: 60px; /* Below the navbar */
    left: 0;
    padding: 10px;
    display: none;
  }

  ul.nav-links li {
    margin: 10px 0;
  }

  nav.active ul.nav-links {
    display: flex;
  }
}

  </style>
  