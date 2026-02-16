import { IconBrandInstagram } from "@tabler/icons-react";
import { InstagramIcon } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex items-center bg-primary  justify-center">
      <div className="max-w-full w-6xl text-white p-8 flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-4 leading-7">
        <div>
          میلاپلن، دوست شما در مسیر رشد و توسعۀ فردی است و کمکتان می‌کند به
          بهترین ورژن خودتان تبدیل شوید 🤍
        </div>
        <div>
          <h4 className="text-[#eee3d3] text-lg mb-6">توسعه فردی</h4>
          <ul>
            <li>
              <a href="https://milaaplan.com/">مهارت‌های محیط کار</a>
            </li>
            <li>
              <a href="https://milaaplan.com/">آموزش برنامه‌ریزی</a>
            </li>
            <li>
              <a href="https://milaaplan.com/">مهارت‌های ارتباطی</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#eee3d3] text-lg mb-6">جعبه ابزار</h4>
          <ul>
            <li>
              <a href="https://milaaplan.com/">تمپلیت نوشن</a>
            </li>
            <li>
              <a href="https://milaaplan.com/">تست‌های خودشناسی</a>
            </li>
            <li>
              <a href="https://milaaplan.com/">کتاب‌های توسعه فردی</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#eee3d3] text-lg mb-6">میلاپلن</h4>
          <ul>
            <li>
              <a href="https://milaaplan.com/">ارتباط با ما</a>
            </li>
            <li>
              <a href="https://milaaplan.com/">درباره ما</a>
            </li>
          </ul>
          <div className="flex items-center">
            <a href="">
              <IconBrandInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
