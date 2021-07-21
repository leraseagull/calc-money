import logo from '../images/E.svg';


function Header() {
        return (
            <header className="header">
                <img src={logo} className="header__logo" alt="Логотип" href="#" target="_self" />
            </header>
        );
}

export default Header;