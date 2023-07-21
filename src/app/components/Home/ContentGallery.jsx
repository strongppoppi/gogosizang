import ContentCard from "./ContentCard";

export default function ContentGallery() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row space-x-4">
          <ContentCard />
          <ContentCard />
        </div>
        <div className="flex flex-row space-x-4">
          <ContentCard />
          <ContentCard />
        </div>
      </div>
    </>
  );
}
