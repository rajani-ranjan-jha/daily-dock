import Link from "next/link";

function Footer() {
  const pages = ["diary", "timer", "note", "todo", "event"];
  const navlinks = ["home", "about", "contact", "services"];
  const social = ["twitter", "github", "instagram", "youtube"];
  return (
    <footer className="w-full bg-muted/30 dark:bg-secondary-foreground animate-fade-in border-t">
      <div className="flex flex-col md:flex-row justify-around items-center pb-0">
        <div className="text-4xl font-semibold">Daily Dock</div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 ">
          {/* Pages */}
          <div className="h-80 flex flex-col justify-start items-start gap-3 p-10 border-x">
            <h2>Pages:</h2>
            {pages.map((item, idx) => (
              <Link
                key={idx}
                href={`/${item}`}
                className="underline capitalize"
              >
                {item}
              </Link>
            ))}
          </div>
          {/* Navigation */}
          <div className="h-80 flex flex-col justify-start items-start gap-3 p-10 border-r">
            <h2>Navigation:</h2>
            {navlinks.map((item, idx) => (
              <Link
                key={idx}
                href={`/${item}`}
                className="underline capitalize"
              >
                {item}
              </Link>
            ))}
          </div>
          {/* Social */}
          <div className="h-80 flex flex-col justify-start items-start gap-3 p-10 border-r">
            <h2>Social:</h2>
            {social.map((item, idx) => (
              <Link
                key={idx}
                href={`/${item}`}
                className="underline capitalize"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="py-5 border-t mt-0 pt-4 text-center text-md">
        © {new Date().getFullYear()} Daily Dock. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
