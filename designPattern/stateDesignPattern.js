// ============================================
// State Design Pattern: Media Player Example
// ============================================

// ============================================
// State Interface
// ============================================
class State {
    player = null;  // declare before use
  
    /**
     * @param {AudioPlayer} player
     */
    constructor(player) {
      this.player = player;
    }
  
    clickLock() {
      throw new Error('clickLock() must be implemented by subclass.');
    }
  
    clickPlay() {
      throw new Error('clickPlay() must be implemented by subclass.');
    }
  
    clickNext() {
      throw new Error('clickNext() must be implemented by subclass.');
    }
  
    clickPrevious() {
      throw new Error('clickPrevious() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete States
  // ============================================
  class LockedState extends State {
    clickLock() {
      // Unlock: go back to Playing or Ready depending on whether playback was ongoing
      if (this.player.playing) {
        this.player.changeState(new PlayingState(this.player));
      } else {
        this.player.changeState(new ReadyState(this.player));
      }
      console.log('Player unlocked');
    }
  
    clickPlay() {
      console.log('Player is locked. Play button ignored.');
    }
  
    clickNext() {
      console.log('Player is locked. Next button ignored.');
    }
  
    clickPrevious() {
      console.log('Player is locked. Previous button ignored.');
    }
  }
  
  class ReadyState extends State {
    clickLock() {
      this.player.changeState(new LockedState(this.player));
      console.log('Player locked');
    }
  
    clickPlay() {
      this.player.startPlayback();
      this.player.changeState(new PlayingState(this.player));
    }
  
    clickNext() {
      this.player.nextSong();
    }
  
    clickPrevious() {
      this.player.previousSong();
    }
  }
  
  class PlayingState extends State {
    clickLock() {
      this.player.changeState(new LockedState(this.player));
      console.log('Player locked');
    }
  
    clickPlay() {
      this.player.stopPlayback();
      this.player.changeState(new ReadyState(this.player));
    }
  
    clickNext(event) {
      if (event && event.doubleClick) {
        this.player.nextSong();
      } else {
        this.player.fastForward(5);
      }
    }
  
    clickPrevious(event) {
      if (event && event.doubleClick) {
        this.player.previousSong();
      } else {
        this.player.rewind(5);
      }
    }
  }
  
  // ============================================
  // Context: AudioPlayer
  // ============================================
  class AudioPlayer {
    state = null;         // current State
    playing = false;      // is music playing?
    playlist = [];        // list of songs
    currentIndex = 0;     // index of the current song
  
    /**
     * @param {string[]} playlist
     */
    constructor(playlist) {
      this.playlist = playlist;
      this.currentIndex = 0;
      this.state = new ReadyState(this);
    }
  
    changeState(state) {
      this.state = state;
    }
  
    clickLock() {
      this.state.clickLock();
    }
  
    clickPlay() {
      this.state.clickPlay();
    }
  
    clickNext(event) {
      this.state.clickNext(event);
    }
  
    clickPrevious(event) {
      this.state.clickPrevious(event);
    }
  
    // Service methods called by states
    startPlayback() {
      this.playing = true;
      console.log(`▶️ Playing: ${this.playlist[this.currentIndex]}`);
    }
  
    stopPlayback() {
      console.log('⏸️ Playback paused');
      this.playing = false;
    }
  
    nextSong() {
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
      console.log(`⏭️ Next song: ${this.playlist[this.currentIndex]}`);
    }
  
    previousSong() {
      this.currentIndex =
        (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
      console.log(`⏮️ Previous song: ${this.playlist[this.currentIndex]}`);
    }
  
    fastForward(seconds) {
      console.log(`⏩ Fast-forward ${seconds} seconds`);
    }
  
    rewind(seconds) {
      console.log(`⏪ Rewind ${seconds} seconds`);
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  const myPlaylist = ['Song A', 'Song B', 'Song C'];
  const player = new AudioPlayer(myPlaylist);
  
  player.clickPlay();          // ▶️ Playing: Song A
  player.clickNext();          // ⏭️ Next song: Song B
  player.clickLock();          // Player locked
  player.clickPlay();          // Player is locked. Play button ignored.
  player.clickLock();          // Player unlocked
  player.clickPlay();          // ⏸️ Playback paused
  player.clickPrevious();      // ⏮️ Previous song: Song A
  player.clickPlay();          // ▶️ Playing: Song A
  player.clickNext({ doubleClick: true }); // ⏭️ Next song: Song B
  player.clickNext();          // ⏩ Fast-forward 5 seconds
  