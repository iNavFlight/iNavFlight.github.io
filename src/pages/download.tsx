import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Downloads() {
  return (
    <Layout title="Downloads" description="Download INAV">
      <div className="hero shadow--lw">
        <div className="container">
          <h1 className="hero__title">Downloads</h1>
          <p className="hero__subtitle">Get all things INAV</p>
          <div></div>
        </div>
      </div>
      <div className="container">
        <div className="row margin-top--xl"></div>
        <div className="row text--center">
          <div className="col">
            <div className="col-demo">
              <div className="card-demo">
                <div className="card">
                  <div className="card__header">
                    <h1> INAV Configurator</h1>
                  </div>
                  <div className="card__body">
                    <img
                      src="/img/assets/inav-configurator.jpg"
                      alt="Blackbox alt text"
                      title="INAV Blackbox Tools"
                    />
                    <p>
                      Configurator is the desktop based tool used to setup and
                      configure INAV on your flight controller. Download the
                      latest version to use with the latest INAV version.
                    </p>
                  </div>
                  <div className="card__footer">
                    <a
                      className="button button--block button--lg button--primary"
                      href="https://github.com/iNavFlight/inav-configurator/releases/latest"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="col-demo">
              <div className="card-demo">
                <div className="card">
                  <div className="card__header">
                    <h1> INAV EdgeTX Lua Widget</h1>
                  </div>
                  <div className="card__body">
                    <img
                      src="https://raw.githubusercontent.com/iNavFlight/OpenTX-Telemetry-Widget/master/assets/iNavHorus.png"
                      alt="Lua alt text"
                      title="INAV Lua widget text"
                    />
                    <p>
                      Enhance the INAV experience with the Lua widget for EdgeTX
                      and OpenTX based radios that fully uses telemetry data.
                    </p>
                  </div>
                  <div className="card__footer">
                    <div className="button-group button-group--block button--lg">
                      <a
                        className="button button--primary"
                        href="https://github.com/iNavFlight/OpenTX-Telemetry-Widget/releases/latest"
                      >
                        Download
                      </a>
                      <a
                        className="button button--primary"
                        href="https://luatelemetry.readthedocs.io/en/latest/"
                      >
                        Documentation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="col-demo">
              <div className="card-demo">
                <div className="card">
                  <div className="card__header">
                    <h1> INAV Blackbox Tools</h1>
                  </div>
                  <div className="card__body">
                    <img
                      src="/img/assets/blackbox-screenshot-1.jpg"
                      alt="Blackbox alt text"
                      title="INAV Blackbox Tools"
                    />
                    <p>
                      These tools allow you to convert flight data logs recorded
                      by INAV's Blackbox feature into CSV files (comma-separated
                      values) for analysis, or into a series of PNG files which
                      you could turn into a video.
                    </p>
                  </div>
                  <div className="card__footer">
                    <a
                      className="button button--block button--lg button--primary"
                      href="https://github.com/iNavFlight/blackbox-tools/releases/latest"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
