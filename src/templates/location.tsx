/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import RTF from "../components/RTF";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Schema from "../components/Schema";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_metaDescription",
      "c_bannerImage",
      "c_sEOPageBody",
      "c_headerImage",
      "c_footerImage",
      "c_relatedFAQs.question",
      "c_relatedFAQs.answer",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["4444918822597713142"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : `${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const cpy = document;
  const {
    _site,
    name,
    c_metaDescription,
    c_bannerImage,
    c_sEOPageBody,
    c_headerImage,
    c_footerImage,
    c_relatedFAQs,
  } = document;

  return (
    <>
      <Schema document={cpy}></Schema>
      <Image image={c_headerImage} style={{ height: "7.3rem" }}></Image>
      <div className="centered-container">
        <div className="section">
          <div className="space-y-6">
            <div className="w-2/3 space-y-4">
              <div className="text-sm flex gap-2">
                <div className="underline hover:cursor-pointer hover:no-underline">
                  Data Optimization
                </div>
                <div>/</div> <div className="font-bold">{name}</div>
              </div>
              <h1 className=" text-3xl font-bold ">{name}</h1>
              <h2 className="text-lg font-bold ">
                <RTF>{c_metaDescription.replaceAll('"', "")}</RTF>
              </h2>
              <div className="flex justify-start gap-4">
                <div>
                  <span className="font-bold">Reviewed by:</span> Tracfone
                  Editorial Team
                </div>
                <div>
                  <span className="font-bold">Last reviewed:</span> 6.19.2023
                </div>
              </div>
              <div className="flex justify-start gap-4 items-center font-semibold hover:cursor-pointer">
                <div className="px-4 py-2 rounded-full border-2 bg-red-600 text-white hover:bg-white  hover:text-black hover:border-black hover:border-2">
                  Check Your Data Usage
                </div>
                <div className="hover:underline">View Data Plans</div>
              </div>
            </div>
            <Image image={c_bannerImage}></Image>
            <div className="w-2/3 space-y-4">
              <RTF>{c_sEOPageBody}</RTF>
              <hr />

              <div className="w-full pt-2">
                <div className="text-2xl font-bold mb-2">Related FAQs</div>
                {c_relatedFAQs.map((item: any, index: any) => (
                  <div className="mx-auto w-full rounded-2xl bg-white py-2">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-200  px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                            <span className="text-lg font-medium">
                              {item.question}
                            </span>
                            <ChevronDownIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-gray-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-col">
                            <RTF>{item.answer}</RTF>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image image={c_footerImage}></Image>
    </>
  );
};

export default Location;
