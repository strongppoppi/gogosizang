import Link from "next/link";

export default function BottomTab() {
  return (
    <footer>
      <div className="flex flex-row justify-around mb-6 border-t-2 py-4">
        <Link href="/" className="grow justify-center items-center">
          <div className="flex-col justify-center items-center text-center space-y-1">
            <h4 className="text-base font-medium">Home</h4>
          </div>
        </Link>
        <Link href="/map" className="grow justify-center items-center">
          <div className="flex-col justify-center items-center text-center space-y-1">
            <h4 className="text-base font-medium">Map</h4>
          </div>
        </Link>
        <Link href="/mypage" className="grow justify-center items-center">
          <div className="flex-col justify-center items-center text-center space-y-1">
            <h4 className="text-base font-medium">Mypage</h4>
          </div>
        </Link>
      </div>
    </footer>
  );
};