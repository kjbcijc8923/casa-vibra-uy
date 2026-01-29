type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-balance text-muted-foreground">{description}</p> : null}
    </div>
  );
}
