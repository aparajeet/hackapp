console.log("learn.js is working");

fetch("http://127.0.0.1:5000/")
  .then(response => response.json())
  .then(data => {
    console.log("Message from backend:", data);
  });
