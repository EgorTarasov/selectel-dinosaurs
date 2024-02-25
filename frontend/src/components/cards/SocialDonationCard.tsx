import { SocialDonation } from "@/api/models";

const SocialDonationCard = ({ link, summary, images }: SocialDonation) => {
  return (
    <>
      <div className="flex flex-col p-4 rounded-md bg-white">
        <h2 className="text-xl font-semibold">Пост из VK</h2>

        {images.length && (
          <div className="social-image">
            <img className="h-200 w-full object-cover" src={images[0]} alt={"vk post image"} />
          </div>
        )}

        <div className="mt-2">
          <span className="text-sm font-semibold">Краткое сообщение:</span>
          <span className="text-sm break-words"> {summary}</span>
        </div>

        <div className="mt-2">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline underline-offset-4">
            Перейти к посту
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialDonationCard;
