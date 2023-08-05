import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onPlay(data) {
  const CurrentTime = data.seconds;
  localStorage.setItem(VIDEO_KEY, CurrentTime);
}

const VIDEO_KEY = 'videoplayer-current-time';
const videoplayerCurrentTime = localStorage.getItem(VIDEO_KEY);

player.on('timeupdate', throttle(onPlay, 1000));

player
  .setCurrentTime(videoplayerCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });