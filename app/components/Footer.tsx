import Link from "next/link";

function Footer() {
  const navlinks = ["home", "about", "contact", "services"];
  const social = ["twitter", "github", "instagram", "youtube"];
  const pages = ["dairy", "timer", "notes", "todos", "events"];
  return (
    <footer className="w-full bg-muted dark:bg-primary/50 animate-fade-in border-t-2">
      <div className="flex flex-col md:flex-row justify-around items-center pb-5">
        <div className="text-4xl font-semibold">Daily Dock</div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 ">
          {/* Pages */}
          <div className="h-80 flex flex-col justify-start items-start gap-3 p-10 border-x-2">
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
          <div className="h-80 flex flex-col justify-start items-start gap-3 p-10 border-r-2">
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
          <div className="h-80 flex flex-col justify-start items-start gap-3 p-10 border-r-2">
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
      <div className="py-5 border-t border-primary mt-2 pt-4 text-center text-md">
        © {new Date().getFullYear()} Daily Dock. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
