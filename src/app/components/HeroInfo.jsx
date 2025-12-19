const HeroInfo = ({ nome, imagem, superpower }) => {
  return (
    <div className="hero-card">
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      {superpower && <p>{superpower}</p>}
    </div>
  );
};

export default HeroInfo;
