"use client";

import { NextPage } from "next";

import FormTabs from "~features/form-questions/FormTabs";

type ContentPageProps = {
  params: {
    slug?: string[];
  };
};

const FormBuilderPage: NextPage<ContentPageProps> = ({ params: { slug } }) => {
  const tabs = [...(slug ?? [])];

  return <FormTabs tab={tabs[0]} />;
};

export default FormBuilderPage;
