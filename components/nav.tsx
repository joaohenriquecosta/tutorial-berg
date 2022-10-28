import Link from "next/link";

const links = [
  {
    href: "https://instagram.com/joaohenrique_costa",
    label: "Instagram",
  },
  {
    href: "https://api.whatsapp.com/send?phone=5516982441889",
    label: "Whatsapp",
  },
];

export default function NavBar(): JSX.Element {
  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link className="text-blue-500 no-underline" href="/">
            Home
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a href={href} className="btn-blue no-underline">
                {label}
              </a>
            </li>
          ))}
          {/* <li>
            <LoginBtn />
          </li> */}
        </ul>
      </ul>
    </nav>
  );
}
