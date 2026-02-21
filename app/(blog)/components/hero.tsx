import { HeroSvg } from "@/app/(blog)/components/hero-svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div className="bg-[#7B79BD1A] flex justify-center h-screen md:h-auto px-4 pt-10">
      <div className="absolute bottom-30 left-0 w-full bg-gray-50 z-0">
        <HeroSvg />
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 w-6xl">
        <div className="flex flex-col items-start justify-center gap-6 text-sm">
          <div className="rounded bg-primary p-2 text-white">
            <h1 className=" text-2xl font-pinar font-normal">
              <Link href="/">میــلاپلن</Link>
            </h1>
          </div>
          <h2 className="font-pinar text-3xl font-bold text-justify leading-10">
            همراه برنامه‌ریزی و توسعه فردی
          </h2>
          <p>میلاپلن مثل یک دوست خوب، در مسیر توسعه فردی همراه شماست.</p>
          <ul>
            <li className="flex items-center gap-2 mb-2">
              <CheckCircleIcon size={16} className="text-primary" />
              به‌روزترین آموزش‌ها و راهکارهای عملی
            </li>
            <li className="flex items-center gap-2  mb-2">
              <CheckCircleIcon size={16} className="text-primary" />
              تمپلیت‌های کاربردی
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon size={16} className="text-primary" />
              ابزارهای برنامه‌ریزی و توسعه‌فردی
            </li>
          </ul>

          <p>
            برای اطلاع از آخرین آپدیت‌ها و دریافت راهکارهای مفید و علمی برای
            پیشرفت و بهبود سبک زندگی، ایمیلتان را وارد کنید.
          </p>

          <div className="w-full">
            <form className="flex flex-col gap-4 w-full">
              <Input
                placeholder="ایمیل خود را وارد کنید"
                className="bg-white text-sm w-full"
              />
              <Button size={"lg"}>عضویت</Button>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-end">
          <div className="relative w-3/4">
            <Image
              src={"/main-photo-900.png"}
              alt="hero image"
              width={200}
              height={200}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
