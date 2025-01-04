import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Agu+Display&display=swap"
        rel="stylesheet"
      />
      <Head />
      <body>
        <div id="root">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
