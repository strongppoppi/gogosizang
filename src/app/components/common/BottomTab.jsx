import Link from "next/link";

export default function BottomTab() {
  return (
    <footer>
      <div>
        <Link href="/">
          <div>
            <h3>
              Home
            </h3>
          </div>
        </Link>
        <Link href="/">
          <div>
            <h3>
              Home
            </h3>
          </div>
        </Link>
        <Link href="/">
          <div>
            <h3>
              Home
            </h3>
          </div>
        </Link>
      </div>
    </footer>
  );
};