"use client";

import DefaultAuthLayout from "src/layouts/DefaultAuthLayout";

import LoginPage from "./page";

const LoginLayout = () => (
  <DefaultAuthLayout
    title="Live your life freely"
    description="We are here to provide easiest path to visa in your desired destination, so you can live true digital nomad life."
    imageUrl="https://img.freepik.com/free-photo/freelancer-girl-working-vacation-young-woman-with-laptop-works-while-sitting-sun-lounger-work-from-anywhere-freelance_1321-2242.jpg?w=1380&t=st=1693486945~exp=1693487545~hmac=90cf3b8c1610305e05b68a94f98a029cef4b5447f17266c55497773e736693f6"
  >
    <LoginPage />
  </DefaultAuthLayout>
);

export default LoginLayout;
