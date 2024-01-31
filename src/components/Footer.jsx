import React from 'react';

export default function Footer() {
  return (
    <footer className="footer fixed-bottom mt-auto py-3" style={{ backgroundColor: "rgb(232, 227, 227)" }}>
      <div className="container text-center">
        <div className="float-left">
          <h5>Made with ❤️ by <a href="https://akshata-ganbote.netlify.app/" style={{ textDecoration: "none", color: "red" }}>Srinivas Reddy</a></h5>
        </div>
        <div className="pt-1 float-right">
          <a href="#" target="_blank" rel="noreferrer"><i className="bi bi-linkedin mx-2" style={{ fontSize: "20px" }}></i></a>
          <a href="#" target="_blank" rel="noreferrer"><i className="bi bi-globe mx-2" style={{ fontSize: "20px" }}></i></a>
          <a href="#" target="_blank" rel="noreferrer"><i className="bi bi-github mx-2" style={{ fontSize: "21px" }}></i></a>
          <a href="mailto:srinivas.reddy.94807@gmail.com" target="_blank" rel="noreferrer"><i className="bi bi-envelope-fill mx-2" style={{ fontSize: "21px" }}></i></a>
        </div>
      </div>
    </footer>
  );
}
