export function Video() {
  return (
    <video controls preload="none" className="w-full" poster="/thumbnail.png">
      <source src="/wbfs-ad.mp4" type="video/mp4" />
      {/* <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      /> */}
      Your browser does not support the video tag.
    </video>
  );
}
