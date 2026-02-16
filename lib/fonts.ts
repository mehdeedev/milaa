import localFont from "next/font/local";

const yekan = localFont({
  src: [
    {
      path: "../public/fonts/YekanBakhFaNum-Regular.woff",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-Bold.woff",
      style: "bold",
      weight: "700",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-SemiBold.woff",
      style: "semi-bold",
      weight: "600",
    },
  ],
});

export { yekan };
