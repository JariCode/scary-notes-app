function Header() {
  return (
    // Header-alue: sisältää teemaelementit ja sovelluksen logon
    <header className="header">

      {/* Pyörivä aavemainen sumu- / energiaefekti */}
      <div className="header-fog"></div>

      {/* Taustalla oleva kuu */}
      <div className="moon"></div>

      {/* Hämähäkin seitti oikeassa yläkulmassa */}
      <div className="spider-web"></div>

      {/* Sovelluksen logo / otsikko */}
      <h1 className="logo">Scary Notes</h1>

    </header>
  );
}

export default Header;
