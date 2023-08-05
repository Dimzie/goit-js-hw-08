import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

console.log(Player);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.on('pause', function () {
  console.log('stoped the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function onPlay(data) {
  const CurrentTime = data.seconds;
  console.log(CurrentTime);
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