import { aboutPageImageUrl, Aboutstyles } from "../constants/style";

const About = () => {
  return (
    <section className={Aboutstyles.section}>
      <div>
        <img className="md:max-w-[650px]" src={aboutPageImageUrl} alt="" />
      </div>
      <div className={Aboutstyles.container}>
        <h2 className={Aboutstyles.title}>
          NO ONE ACCEPTS COOKIES, NO PROBLEM
        </h2>
        <p className={Aboutstyles.subtitle}>
          Empower your links with actionable insights. Tinify helps you
          understand not just the numbers — but the ‘where’ and ‘why’ behind
          them.
        </p>

        <div>
          <div className="text-left">
            <h1 className="mb-4">
              ✔️ Monitor real-time click activity and user behavior.
            </h1>
            <h1 className="mb-4">
              ✔️ Compare link performance across online and offline platforms.
            </h1>
            <h1 className="mb-4">
              ✔️ Reveal your audience's location, device, and referral source.
            </h1>
            <h1 className="mb-4">
              ✔️ Identify top-performing channels to guide business strategy.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
