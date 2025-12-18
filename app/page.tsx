import { Project } from "@/components/project";

interface ISocialMedia {
  url: string;
  label: string;
}

export default function Home() {
  const socialMedia: ISocialMedia[] = [
    { url: "https://git.sr.ht/~pixie", label: "SourceHut" },
    { url: "https://github.com/drainpixie", label: "GitHub" },
    { url: "https://matrix.to/#/@pixie:kludgecs.com", label: "Matrix" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Enchantress of digital ecosystems</p>
        <p>Making computers behave since 2006</p>

        <div className="flex flex-row gap-2 mt-2">
          {socialMedia.map(({ url, label }) => (
            <a
              className="text-accent font-body text-xs hover:text-foreground ease-linear duration-200 !no-underline"
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2>Philosophy</h2>
        <ul>
          <li>Programming is an artistic craft.</li>
          <li>Beauty lies within purposeful function.</li>
          <li>Form follows logic, clarity, and intention.</li>
        </ul>
      </div>

      <div>
        <h2>Projects</h2>

        <ul>
          <Project
            href="https://github.com/kludge-cs/docile"
            name="Docile"
            description="a document tamer"
          />

          <Project
            href="https://github.com/amperser/proselint"
            name="Proselint"
            description="a linter for English prose"
          />
        </ul>
      </div>
    </div>
  );
}
