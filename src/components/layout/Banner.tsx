// components/shared/HeroBanner.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-fade";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600",
    badge: "Premium Properties",
    title: "Find Your Perfect",
    highlight: "Home",
    description:
      "Browse thousands of verified properties. Apply online, sign your lease digitally, and move in — all in one place.",
    primaryBtn: { label: "Browse units", href: "/units" },
    secondaryBtn: { label: "List your property", href: "/register" },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600",
    badge: "For Landlords",
    title: "Manage Properties",
    highlight: "Effortlessly",
    description:
      "List units, screen tenants, collect rent, and track maintenance — everything from one powerful dashboard.",
    primaryBtn: { label: "Start managing", href: "/register" },
    secondaryBtn: { label: "Learn more", href: "/about" },
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600",
    badge: "Smart Leasing",
    title: "Digital Lease",
    highlight: "Made Simple",
    description:
      "No paperwork, no hassle. Create, sign, and manage lease agreements completely online.",
    primaryBtn: { label: "Get started", href: "/register" },
    secondaryBtn: { label: "See how it works", href: "/how-it-works" },
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600",
    badge: "Easy Payments",
    title: "Pay Rent",
    highlight: "On Time",
    description:
      "Automated rent reminders, online payments, and instant receipts. Never miss a due date again.",
    primaryBtn: { label: "Browse units", href: "/browse" },
    secondaryBtn: { label: "How payments work", href: "/payments" },
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600",
    badge: "24/7 Support",
    title: "Maintenance",
    highlight: "Requests",
    description:
      "Submit maintenance tickets with photos, track progress in real time, and get notified when issues are resolved.",
    primaryBtn: { label: "Find a home", href: "/units" },
    secondaryBtn: { label: "Contact support", href: "/support" },
  },
];

const Banner = () => {
  return (
    <div className="relative w-full h-145 md:h-170">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: false,
          renderBullet: (_, className) =>
            `<span class="${className} bg-white! opacity-60! [&.swiper-pagination-bullet-active]:opacity-100! w-2! h-2! rounded-full! transition-all"></span>`,
        }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/55" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="h-3.5 w-3.5 text-primary" />
                    <span className="text-primary text-sm font-medium tracking-wide uppercase">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-4">
                    {slide.title}{" "}
                    <span className="text-primary">{slide.highlight}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-white/75 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg" className="gap-2">
                      <Link href={slide.primaryBtn.href}>
                        {slide.primaryBtn.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white"
                    >
                      <Link href={slide.secondaryBtn.href}>
                        {slide.secondaryBtn.label}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default Banner;
