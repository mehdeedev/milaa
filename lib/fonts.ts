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
  variable: '--font-yekan'
});

const pinar = localFont({
  src: [
    {
      path: "../public/fonts/pinar.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../public/fonts/pinar.ttf",
      style: "bold",
      weight: "700",
    },
  ],
  variable: '--font-pinar'
})

export { yekan, pinar };
