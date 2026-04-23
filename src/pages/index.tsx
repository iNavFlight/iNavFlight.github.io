import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import BGV from "/img/inavbgv.mp4";
import Inavpng from "/img/inav_home.png";

import Carousel from "../components/Carousel";

import styles from "./index.module.css";

// Image array for the carousel component
const images = [
  ["/img/inav_home.png", "/img/inav_home_dark.svg", "/img/inav_home_light.svg"],
  ["/img/assets/airplane.svg", "/img/assets/blackbox-screenshot-1.jpg"],
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    // <p>Hello</p>
    <div className={styles.wrapper}>
      <video
        src={BGV}
        className={styles.video}
        autoPlay
        playsInline
        loop
        muted
      />
      <div className={styles.mask}></div>
      <img src={Inavpng} className={styles.content} />
    </div>
    // <header
    //   className={clsx("hero shadow--lw", styles.heroBanner)}
    //   style={{
    //     backgroundImage: `url("img/g2.svg")`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //   }}
    // >
    //   <div className="container">
    //     {/* <Heading as="h1" className="hero__title">
    //       {siteConfig.title}
    //     </Heading> */}
    //     <ThemedImage
    //       alt="INAV"
    //       sources={{
    //         light: useBaseUrl("img/inav_home_light.svg"),
    //         dark: useBaseUrl("img/inav_home_dark.svg"),
    //       }}
    //     />
    //     <p className="hero__subtitle">{siteConfig.tagline}</p>
    //     <div className="container">
    //       <div className="row margin-bottom--md">
    //         <div className="col col--6 col--offset-3 card padding--md"
    //         style={{opacity: 0.8,}}>
    //           <div className="text--justify">
    //             INAV is a cutting-edge flight controller software whose focus is
    //             to bring easy to setup and use, semi-autonomous flight
    //             capabilities to a variety of RC vehicles such as: fixed wings,
    //             rotary wings, VTOLs, boats, and rovers.
    //           </div>
    //         </div>
    //       </div>
    //       <div className="row margin-top--md">
    //         <div className="col">
    //         <div className={styles.buttons}>
    //         <Link
    //           className="button button--secondary button--lg"
    //           to="/docs/welcome"
    //         >
    //           Get Started! 🛨
    //         </Link>
    //       </div>
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="The cutting edge Open source UAV flight controller software suite"
    >
      <HomepageHeader />
      <main>
        <div className="text--center margin-top--lg margin-left--lg">
          {/* <Heading as="h1">At a Glance</Heading> */}
        </div>
        <HomepageFeatures />
        {/* <Carousel slides={images} interval={5000} /> */}
      </main>
    </Layout>
  );
}
