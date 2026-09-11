import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Hardware',
    Svg: require('@site/static/img/assets/cpu.svg').default,
    description: (
      <>
        INAV works on many flight controllers from many different manufacturers with further support of additional peripherals such as pitot tubes, rangefinder/optical flow sensors, and more.
      </>
    ),
  },
  {
    title: 'Open Source Software',
    Svg: require('@site/static/img/assets/code.svg').default,
    description: (
      <>
        INAV is free and open source software that is actively developed by many contributors from around the world. Large version releases occur annually and smaller, maintenance releases throughout the year.
      </>
    ),
  },
  {
    title: 'Community',
    Svg: require('@site/static/img/assets/users.svg').default,
    description: (
      <>
        With a large, enthusiastic, and active community of 16.4k members in the official Facebook and 8900 in Discord, getting up and going with your INAV build will be a breeze. 
      </>
    ),
  },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p className="text--left">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
