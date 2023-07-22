export default function Page({ params }) {
  return (
    <div className="flex-col grow overflow-y-scroll px-4">
      My Post: {params.slug}
    </div>
  );
}
