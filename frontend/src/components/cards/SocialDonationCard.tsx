import { SocialDonation } from "@/api/models";

const SocialDonationCard = ({ link, summary }: SocialDonation) => {
  return (
    <>
      <div className="flex flex-col p-4 rounded-md bg-white">
        <h2 className="text-xl font-semibold">Пост из VK</h2>

        <div className="mt-2">
          <span className="text-sm font-semibold">Краткое сообщение:</span>
          <span className="text-sm"> {summary}</span>
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
