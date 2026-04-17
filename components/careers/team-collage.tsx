import Image from "next/image";

export function TeamCollage() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-2xl">
      <div className="absolute left-0 top-8 h-56 w-44 overflow-hidden rounded-2xl shadow-lg sm:h-72 sm:w-56 md:h-80 md:w-64">
        <Image
          src="/assets/team-01.jpg"
          alt="Head Up Agency team member"
          fill
          sizes="(max-width: 768px) 45vw, 260px"
          className="object-cover"
        />
      </div>
      <div className="absolute right-0 top-0 h-48 w-40 overflow-hidden rounded-2xl shadow-lg sm:h-60 sm:w-48 md:h-72 md:w-56">
        <Image
          src="/assets/team-02.jpg"
          alt="Head Up Agency team member"
          fill
          sizes="(max-width: 768px) 40vw, 220px"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 overflow-hidden rounded-2xl shadow-lg sm:h-52 sm:w-52 md:h-60 md:w-60">
        <Image
          src="/assets/team-03.jpg"
          alt="Head Up Agency team member"
          fill
          sizes="(max-width: 768px) 45vw, 240px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
