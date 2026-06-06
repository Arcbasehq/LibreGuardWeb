import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
};

/* Shared top band for interior pages — keeps the editorial rhythm consistent. */
export default function PageHero({ kicker, title, lede, children, compact }: Props) {
  return (
    <section className="border-b border-line bg-panel">
      <div className={`mx-auto max-w-6xl px-6 sm:px-8 ${compact ? "py-12 lg:py-14" : "py-20 lg:py-24"}`}>
        <p className="kicker reveal d1">{kicker}</p>
        <h1 className={`display reveal d2 mt-5 max-w-3xl ${compact ? "text-[2rem] leading-[1.08] sm:text-[2.4rem]" : "text-[2.6rem] leading-[1.04] sm:text-[3.3rem]"}`}>
          {title}
        </h1>
        {lede && (
          <p className="reveal d3 mt-6 max-w-xl text-[1.08rem] leading-relaxed text-soft">
            {lede}
          </p>
        )}
        {children && <div className="reveal d4 mt-9">{children}</div>}
      </div>
    </section>
  );
}
