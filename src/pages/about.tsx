import React from "react";
import Layout from "@theme/Layout";
import Contributors from "../components/Contributors";

export default function Hello() {
  return (
    <Layout title="About" description="About INAV">
      <div className="container">
        <div className="row"></div>
        <h1>INAV Contributors List</h1>
        <Contributors />
      </div>
    </Layout>
  );
}
