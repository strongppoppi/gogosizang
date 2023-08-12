import data from "/public/data/editorContents.json";
import ContentCard from "./ContentCard";

export default function ContentGallery() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(data).map((key) => {
        const content = data[key];
        return (
          <ContentCard
            key={key}
            contentId={content.contentId}
            bgImage={content.backgroundImage}
            title={content.title}
          />
        );
      })}
    </div>
  );
}
