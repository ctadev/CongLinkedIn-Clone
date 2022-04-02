import s from "./hero.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Hero() {
  return (
    <main className={s.hero}>
      <section className={s.info}>
        <h1>Welcome to your professional community</h1>
        <div className={s.links}>
          <div>
            <p>Search for a job</p>
            <ArrowForwardIosIcon />
          </div>
          <div>
            <p>Find a person you know</p>
            <ArrowForwardIosIcon />
          </div>
          <div>
            <p>Learn a new skill</p>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </section>
      <section className={s.images}>
        <img alt="" src="https://static-exp1.licdn.com/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" />
      </section>
    </main>
  );
}

export default Hero;
