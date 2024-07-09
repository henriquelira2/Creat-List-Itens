import "./styles.css";
import logo from "../../assets/logo3.png"

const Header = () => {


  return (
    <>
      <div className="header">
        <div className="header-left">
          <img className="logo-icon" src={logo} alt="" />
        </div>

        <div className="header-right">
          <a className="Name" href="/">Home</a>
          <a className="Name" href="/Teste">Teste</a>
        </div>
      </div>
    </>
  );
};
export default Header;