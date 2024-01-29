export default function Footer() {
    return (
      <div style={{padding: "10px", backgroundColor: "rgb(232, 227, 227)", textAlign: 'center', position: 'sticky', width: '100%', height: '50px', bottom: '0', left: '0', right: '0', zIndex: '999'}}>
        <div className="text-center float-left">
          <h5>Made with ❤️ by <a href="https://akshata-ganbote.netlify.app/" style={{textDecoration: "none", color: "red"}}>Srinivas Reddy</a></h5>
        </div>
        <div className="text-center pt-1 float-right">
          <a href="#" target="_blank" rel="noreferrer"><i className="bi bi-linkedin mx-2" style={{fontSize: "20px"}}></i></a>
          <a href="#" target="_blank" rel="noreferrer"><i className="bi bi-globe mx-2" style={{fontSize: "20px"}}></i></a>
          <a href="#" target="_blank" rel="noreferrer"><i className="bi bi-github mx-2" style={{fontSize: "21px"}}></i></a>
          <a href="mailto:srinivas.reddy.94807@gmail.com" target="_blank" rel="noreferrer"><i className="bi bi-envelope-fill mx-2" style={{fontSize: "21px"}}></i></a>
        </div>
      </div>
    );
  }
  