import { apiURL } from '@/constants';

const MediaDisplay = ({ url }: { url: string }) => {
  const videoExtensions = /\.(mp4|mov|avi)$/i;
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;

  const isVideo = videoExtensions.test(url);
  const isImage = imageExtensions.test(url);

  return (
    <div>
      {isVideo ? (
        <video width="600" controls>
          <source src={`${apiURL}/uploads/${url}`} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      ) : isImage ? (
        <img src={`${apiURL}/uploads/${url}`} alt="media" width="600" />
      ) : (
        <p>Неверный формат медиа.</p>
      )}
    </div>
  );
};

export default MediaDisplay;
