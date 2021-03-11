import './header.scss';
import { Link } from "@reach/router";


function Header() {
  return (
    <div className="header1">
      <Link to="/">
        {/* <img src={require('../images/concredito-logo.png')} alt='concredito-logo'></img> */}
        <img alt='concredito-logo' src="data:image/png;base64,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"></img>
      </Link>
      <div className="header-title">
        <Link to="/">
          <h3>Prospectos App</h3>
        </Link>
      </div>
    </div>
  );
}

export default Header;