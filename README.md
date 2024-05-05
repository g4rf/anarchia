# Anarchia
A short animation film to the song **Anarchia** inspired by [Yok aka Quetschenpaua](https://pocketpunk.so36.net/).

- **Director**: [Jan Kosyk](https://klavierpunk.de)

The whole animation is done in the browser with [Babylon.js](https://www.babylonjs.com/). The IDE used is [Apache NetBeans 18.0](https://netbeans.apache.org/). Images are done by me or grabbed at [Pixabay](https://pixabay.com/) and [Pexels](https://www.pexels.com). The city and houses are made by the wonderful [Alina Milkina](https://alinamilkina.carbonmade.com).

The music is based on the song [Ufo](https://www.youtube.com/watch?v=amAJ6HU9Jac) by the outstanding [Yok Quetschenpaua](https://pocketpunk.so36.net/). The text is translated into English by me with the help of the great [Brad Hock](https://www.instagram.com/bardo.bread/). There is also a Japanese version made by [Hirai Masaya](https://instagram.com/hiraimasaya).

## Contributors

See [CREDITS.md](CREDITS.md).

## Funding

The music and video is free under Creative Commons (see [LICENSE.md](LICENSE.md)). Nevertheless I'm happy to receive some fundings via [PayPal](https://paypal.me/g4rf). You may also buy some of my stuff in the [Etsy shop of the Neustadt Art Kollektiv](https://www.etsy.com/shop/NeustadtArtKollektiv).

## License

As the short film will be submitted to various film festivals, the release is planned for 2024. Until the official release, publication, distribution and performance – even in parts or modified – is only permitted after consultation with the director. Irrespective of this, the source code and the audio track may be used anytime and anywhere and is licensed under the [CC BY-SA 4.0 license](LICENSE.md).

## Sidenotes

### Rendering the canvas

It was surprisingly difficult to generate a video from the canvas.

- The [VideoRecorder](https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToVideo) from BabylonJS:
  - The generated webm files are extremely miserable in quality.
  - In addition, on my laptop without a dedicated encoding chip (e.g. NVENC) the 25 frames at FullHD were no longer guaranteed.
- The attempt to film the screen using [OBS Studio](https://obsproject.com/) also failed because the frame rate was too low due to the lack of an encoding chip.

The solution was to use [CCapture.js](https://github.com/spite/ccapture.js/). This tool hooks into the animation-relevant functions and can therefore save every single frame. This no longer happens in real time, but that's not the goal.

I used **CCapture** to output the frames as PNGs and created a lossless mov file using [ffmpeg](https://trac.ffmpeg.org/wiki/Slideshow):

```
ffmpeg -framerate 25 -i %07d.png -crf 0 anarchia.mov
```

I then recorded the sound effects in real time using BabylonJS VideoRecorder and processed them together with the music and the mov file in [kdenlive](https://kdenlive.org).
