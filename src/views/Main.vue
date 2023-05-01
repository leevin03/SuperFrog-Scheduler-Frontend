<template>
  <div class="container">
    <video class="background-video" autoplay muted loop>
      <source :src="videoSrc" type="video/mp4">
    </video>
    <div class="intro paragraph" style="text-align: left;">
      Add TCU Spirit to your Event!
      <br>
      Request SuperFrog, TCU Cheerleaders, and Showgirls to your wedding, grad party, and more!
    </div>
    <div class="button-row">
      <router-link class="button" to="/pricing">Pricing</router-link>
      <router-link class="button" to="/range">Range</router-link>
      <router-link class="button" to="/request">Request</router-link>
      <router-link class="button" to="/modify-request">Cancel/Modify a Request</router-link>
    </div>
  </div>
</template>

<script>
import SuperFrogVideo from '@/assets/SuperFrogVideo.mp4';

export default {
  name: "MainView",
  data() {
    return {
      videoSrc: SuperFrogVideo
    };
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 20px); /* Subtract any extra space left for scrolling */
  overflow: hidden; /* Hide any content overflow */
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  height: 50vh;
  width: 100%;
  object-fit: cover;
}

.intro {
  position: relative;
  z-index: 1;
  margin-top: 30vh;
  text-align: center;
  font-size: 2rem;
  color: #fff;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
  z-index: 1;
}

.button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: white;
  color: black;
  font-size: 16px;
  cursor: pointer;
}
</style>
