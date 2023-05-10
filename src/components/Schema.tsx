import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { FAQPage, BlogPosting, BreadcrumbList } from "schema-dts";
const Schema = (props: any) => {
  const { document } = props;
  const name = `${document.name}`;
  const faqsList: any = [];
  document.c_relatedFAQs.map((item: any) =>
    faqsList.push({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })
  );

  return (
    <>
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": "https://www.verizon.com/internet-service/index.html",
                name: "Inrternet Services",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@id":
                  "https://www.verizon.com/answers/why-is-my-5g-so-slow?query=why%20is%20my%205g%20so%20slow",
                name: "Why is My 5G So SLow",
              },
            },
          ],
        }}
      />
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id":
              "https://www.verizon.com/answers/why-is-my-5g-so-slow?query=why%20is%20my%205g%20so%20slow",
          },
          headline: name,
          description: document.c_metaDescription,
          image: [document.c_bannerImage.image.url],
          author: {
            "@type": "Organization",
            name: "Verizon",
          },
          publisher: {
            "@type": "Organization",
            name: "Verizon",
            logo: {
              "@type": "ImageObject",
              url: "https://www.verizon.com/",
            },
          },
          datePublished: "2023-03-15",
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsList,
        }}
      />
    </>
  );
};

export default Schema;
