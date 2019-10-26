# rpi-clock

This is a very simple clock and weather page for Raspberry Pi.

Under the hood, it's Vue.js app that generates a website that can be hosted on S3 and accessed by the RPi.

It shows the current time, weather conditions (via Erik Flower's beautiful [weather icons](https://erikflowers.github.io/weather-icons/)),
current temperature (using the [OpenWeatherMap API](http://openweathermap.org/api)), sunrise, and sunset.


## Setup

I'm using Raspbian -- you can use any distro, but YMMV.


1. Clone this repo or download the tarball and expand into your home directory on the Pi.

2. Local Setup
  * On your machine, copy the `.env.example` to `.env` and enter in your info.
  * run
    ```
    yarn install
    ```
  * Run the app locally with
    ```
    yarn serve
    ```
  * Onve you've verified that everything is working as expected, you can compile and minify the code for production.

    ```
    yarn build
    ```
  * Store the code where you like. This project has a development dependency on [vue-cli-service](https://github.com/multiplegeorges/vue-cli-plugin-s3-deploy).  Feel free to follow their instructions for deploying to S3.  This repo contains settings from the 'invoke' function and you can overwrite them via the `.env` file.

  Note: I had to manually set up the static webhosting from inside the AWS console, but outside of that, the plugin worked great.  I'm confident they'll fix the issue I came up against soon.

3. On the Raspberry Pi, Write a script in your home directory to start the app called "run_clock". This is mine:

    ```bash
    #!/bin/bash
    chromium-browser --kiosk --app=<YOUR URL>
    ```


4. Make the script executable:

    ```bash
    chmod +x run_clock
    ```

5. Run the script to make sure it works:

    ```bash
    ./run_clock
    ```

6. Now create a desktop item that will automatically start the script:

    ```bash
    sudo vim /etc/xdg/autostart/clock.desktop
    ```

    Put this in the file:

    ```
    [Desktop Entry]
    Name=Clock App
    Exec=/home/pi/run_clock
    Type=Application
    Terminal=true
    ```

7. Last, set the Pi to start with no desktop:

    ```bash
    sudo vim /etc/xdg/lxsession/LXDE/autostart
    ```

    **Comment out the stuff in that file** and then put this in the file:

    ```
    @xset s off
    @xset -dpms
    @xset s noblank
    ```

8. (Optional) Disable overscan and force HDMI output:

    ```bash
    sudo vim /boot/config.txt
    ```

    Set the following options:

    ```
    disable_overscan=1
    hdmi_force_hotplug=1
    hdmi_drive=2
    ```

9. Install Unclutter. Uncltter will hide the mouse curser.

  ```bash
  sudo apt-get install unclutter
  ```

  Add the following line to /etc/xdg/lxsession/LXDE/autostart.

  ```
  @unclutter -idle 0.1 -root
  ```

10. Boot the Pi and see if it works!

## Copyright and License

The weather icons are licensed SIL Open Font License 1.1.

All other code was written by me and is public domain. Use it as you wish.
