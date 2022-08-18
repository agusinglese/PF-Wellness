import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return(
      <div>
      <div>
        <h4>CONTACTO</h4>
        <div>
           <p>0800-354-5050</p>
        </div>
        <div>
          <p>+54 9 351 365-4238</p>
        </div>
        <div>
            <p>consultaswellness@gmail.com</p>
        </div>
        <div>
            <p>Av. Colón 299, Córdoba, Argentina</p>
        </div>
      </div>
      <div>
        <h3>WELLNESS</h3>
        <p>"Constituirnos como un centro líder en rehabilitación física, <br></br>
        con los mejores profesionales y la más alta calidad de atención<br></br>
        a nuestros pacientes."
        </p>
      </div>
      <div>
        <Link to={"/about"}>
          <button>Nosotros</button>
        </Link>
        <Link to={"/especialidades"}>
          <button>Especialidades</button>
        </Link>
        <Link to={"/prestaciones"}>
          <button>Prestaciones</button>
        </Link>
        <Link to={"/staff"}>
          <button>Staff</button>
        </Link>
      </div>
     </div>
    );
  }

  export default Footer;