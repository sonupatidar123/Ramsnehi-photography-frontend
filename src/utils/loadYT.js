// utils/loadYT.js
export const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT) return resolve(window.YT);

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT);
    };

    document.body.appendChild(tag);
  });
};