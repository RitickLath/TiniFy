
const About = () => {
  const styles = {
    section: "w-full px-6 py-16 bg-[#16181D] text-white lg:flex justify-center",
    container: "max-w-5xl mt-12 lg:mt-0 text-center space-y-6",
    title: "md:text-left text-3xl sm:text-4xl font-bold text-white",
    subtitle:
      "text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed",
  };

  return (
    <section className={styles.section}>
      <div>
        <img
          className="md:max-w-[650px]"
          src="https://docrdsfx76ssb.cloudfront.net/static/1745531555/pages/wp-content/uploads/2024/04/02_feature-img_desktop@2x.png"
          alt=""
        />
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>NO ONE ACCEPTS COOKIES, NO PROBLEM</h2>
        <p className={styles.subtitle}>
          Empower your links with actionable insights. Tinify helps you
          understand not just the numbers — but the ‘where’ and ‘why’ behind
          them.
        </p>

        <div>
          <div className="text-left">
            <h1 className="mb-4">✔️ Monitor real-time click activity and user behavior.</h1>
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
