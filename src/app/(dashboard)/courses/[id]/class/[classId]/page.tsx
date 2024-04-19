import { getClassDetails } from "@/actions/courses";
import YoutubeEmbed from "@/components/YoutubeEmbed";

export default async function Class({
  params,
}: {
  params: { classId: string };
}) {
  const details = await getClassDetails(params.classId);
  var pattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  var match = details?.video.videoLink?.match(pattern);
  let YoutubeId;
  if (match && match[1]) {
    YoutubeId = match[1];
  }

  return (
    <div className="w-full flex justify-between m-8">
      <div>
        <h1>{details?.title}</h1>
        <pre>{JSON.stringify(details?.video, null, 2)}</pre>
        {YoutubeId && <YoutubeEmbed embedId={YoutubeId} />}
        <div className="mt-2 rounded bg-secondary-500 p-4">
          Attachments
          <pre>{JSON.stringify(details?.attachments, null, 2)}</pre>
        </div>
      </div>
      <div className="w-[400px] rounded bg-secondary-600 p-4">
        Doubts | Timestamps
      </div>
    </div>
  );
}
