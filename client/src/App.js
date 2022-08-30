import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Staff from "./components/Staff";
import Error from "./components/Error";
import Home from "./components/Home";
import Specialties from "./components/Specialties";
import Prepaid from "./components/Prepaid";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Turnos from "./components/Turnos";
import Calendar from "./components/Calendar";
import MakePayments from "./components/MakePayments";
import PrivateRouteAdmin from "./components/private/PrivateRouteAdmin";
import PrivateRoutePerfil from "./components/private/PrivateRoutePerfil";
import PrivateRouterPago from "./components/private/PrivateRoutePago";
import PrivateRouterCalendario from "./components/private/PrivateRouterCalendario";

import AdminProfile from "./components/admin/AdminProfile";

export default function App() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <BrowserRouter>
      <Route path="/">
        <NavBar />
      </Route>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/especialidades">
          <Specialties />
        </Route>
        <Route exact path="/prestaciones">
          <Prepaid />
        </Route>
        <Route exact path="/staff">
          <Staff />
        </Route>
        <PrivateRouterCalendario exact path="/turnos">
          <Turnos />
        </PrivateRouterCalendario>
        <PrivateRoutePerfil exact path="/userProfile/:id">
          <UserProfile />
        </PrivateRoutePerfil>
        <PrivateRouterCalendario exact path="/calendar/:idDoctor">
          <Calendar />
        </PrivateRouterCalendario>
        <PrivateRouteAdmin exact path="/admin">
          <AdminProfile />
        </PrivateRouteAdmin>
        <PrivateRouterPago exact path="/payments">
          <MakePayments />
        </PrivateRouterPago>
        <Route exact path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
