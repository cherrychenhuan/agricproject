<template>
  <div class="weather-hour">
    <div class="weather-hour-header">
      <div class="weather-hour-title">24小时预报</div>
      <ul class="weather-hour-type-list">
        <li class="weather-hour-type-item text-color">
          温度
        </li>
        <li class="weather-hour-type-item">
          降水量
        </li>
        <li class="weather-hour-type-item">
          风力风向
        </li>
        <li class="weather-hour-type-item">
          空气质量
        </li>
      </ul>
    </div>
    <div class="weather-hour-content">
      <div class="weather-hour-btn-box left-box"><span class="left"></span>
      </div>
      <div class="weather-hour-bight-box">
        <div class="y-coordinate"><span class="y-item">13°C</span><span class="y-item">9°C</span><span
            class="y-item">4°C</span></div>
        <div class="type-bight">
          <div class="slider-box" style="left: 0px; width: 2749px;">
            <div class="canvas-box" style="top: 4px;"><canvas id="hourCvs" width="4068" height="201"
                style="width: 2718px; height: 134px;"></canvas>
              <div class="point" style="left: -0.5px; top: 2.5px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 112.5px; top: 2.5px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 225.5px; top: 15.6111px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 338.5px; top: 28.7222px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 451.5px; top: 41.8333px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 564.5px; top: 54.9444px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 677.5px; top: 54.9444px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 790.5px; top: 54.9444px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 903.5px; top: 68.0556px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 1016.5px; top: 81.1667px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 1129.5px; top: 94.2778px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 1242.5px; top: 107.389px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 1355.5px; top: 107.389px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 1468.5px; top: 107.389px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 1581.5px; top: 120.5px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 1694.5px; top: 120.5px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 1807.5px; top: 120.5px; background-color: rgb(54, 131, 195);"><!---->
              </div>
              <div class="point" style="left: 1920.5px; top: 107.389px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 2033.5px; top: 94.2778px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 2146.5px; top: 81.1667px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 2259.5px; top: 68.0556px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 2372.5px; top: 54.9444px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 2485.5px; top: 28.7222px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
              <div class="point" style="left: 2598.5px; top: 28.7222px; background-color: rgb(54, 131, 195);">
                <!---->
              </div>
            </div>
            <div class="x-coordinate" style="width: 2599px; bottom: 33px;">
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">现在</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">14:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">15:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">16:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">17:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">18:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">19:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">20:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">21:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">22:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">23:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">00:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">01:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">02:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">03:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">04:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">05:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">06:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">07:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">08:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">09:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">10:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">11:00</span></div>
              <div class="coordinate-item" style="top: 0px;"><span class="time-node">12:00</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="weather-hour-btn-box right-box"><span class="right"></span>
      </div>
    </div>
  </div>
  <div class="weather-content" style="background-color: rgb(54, 131, 195);">
    <div class="weather-15day">
      <div class="weather-15day-header">
        <p>15天天气预报</p>
      </div>
      <div class="weather-15day-main">
        <div class="weather-hour-btn-box left-box"><span class="left"></span>
        </div>
        <div class="weather-15day-content-box">
          <div class="slider" style="left: 0px; width: 1728px;">
            <ul class="weather-15day-content">
              <li data-selectedindex="1" data-date="2024-03-06" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; border-right: none; color: rgba(255, 255, 255, 0.4);">
                <p class="week"><span class="week">昨天</span></p>
                <p class="date"><span class="date">03/06</span></p>
                <p class="icon-weather" style="opacity: 0.3;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#gainsborofengxiang"></use>
                      </svg></span> <span class="wind-power">
                      3-4级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-07" data-forecast="long_day_forecast" class="weather-day"
                style="background: rgba(255, 255, 255, 0.1); margin-top: 0px; padding-top: 20px; border-right: none; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">今天</span></p>
                <p class="date"><span class="date">03/07</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-08" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">明天</span></p>
                <p class="date"><span class="date">03/08</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      4-5级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-09" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周六</span></p>
                <p class="date"><span class="date">03/09</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      3-4级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-10" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周日</span></p>
                <p class="date"><span class="date">03/10</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      3-4级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-11" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周一</span></p>
                <p class="date"><span class="date">03/11</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayxiaoyu"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      3-4级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-12" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周二</span></p>
                <p class="date"><span class="date">03/12</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      3-4级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-13" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周三</span></p>
                <p class="date"><span class="date">03/13</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayyin"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      3-4级
                    </span></span></p>
                <p class="day-pm25"><span class="weather-15day-pm25 good">
                    良
                  </span></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-14" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周四</span></p>
                <p class="date"><span class="date">03/14</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-15" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周五</span></p>
                <p class="date"><span class="date">03/15</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayyin"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-16" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周六</span></p>
                <p class="date"><span class="date">03/16</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-17" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周日</span></p>
                <p class="date"><span class="date">03/17</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-18" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周一</span></p>
                <p class="date"><span class="date">03/18</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-19" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周二</span></p>
                <p class="date"><span class="date">03/19</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-20" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周三</span></p>
                <p class="date"><span class="date">03/20</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
              <li data-selectedindex="1" data-date="2024-03-21" data-forecast="long_day_forecast" class="weather-day"
                style="margin-top: 20px; padding-top: 0px; color: rgb(255, 255, 255);">
                <p class="week"><span class="week">周四</span></p>
                <p class="date"><span class="date">03/21</span></p>
                <p class="icon-weather" style="opacity: 1;"><span><svg class="weather-hour-icon">
                      <use xlink:href="#grayduoyun"></use>
                    </svg></span></p>
                <p class="weather-15day-wind"><span class="weather-15day-wind"><span class="wind-direction"
                      style="opacity: 1;"><svg
                        class="wind-direction-icon weifeng beifeng nanfeng dongfeng xifeng xibeifeng xinanfeng dongbeifeng dongnanfeng">
                        <use xlink:href="#whitefengxiang"></use>
                      </svg></span> <span class="wind-power">
                      &lt;3级
                    </span></span></p>
                <p class="day-pm25"><!----></p>
              </li>
            </ul>
            <div class="canvas-box" style="width: 1740px; height: 170px;"><span class="day-item-point"
                style="top: 93.5909px; left: 4.5px; background: transparent; border: 1px solid rgba(255, 255, 255, 0.2);"></span><span
                class="day-item-point"
                style="top: 84.5px; left: 112.5px; background: rgb(255, 255, 255); border: 1px solid rgb(255, 255, 255);"></span><span
                class="day-item-point"
                style="top: 89.0455px; left: 220.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 93.5909px; left: 328.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 75.4091px; left: 436.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 70.8636px; left: 544.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 48.1364px; left: 652.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 66.3182px; left: 760.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 57.2273px; left: 868.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 57.2273px; left: 976.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 57.2273px; left: 1084.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 70.8636px; left: 1192.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 66.3182px; left: 1300.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 48.1364px; left: 1408.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 34.5px; left: 1516.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 34.5px; left: 1624.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span>
              <span class="day-item-point"
                style="top: 129.5px; left: 4.5px; background: transparent; border: 1px solid rgba(255, 255, 255, 0.2);"></span><span
                class="day-item-point"
                style="top: 120.409px; left: 112.5px; background: rgb(255, 255, 255); border: 1px solid rgb(255, 255, 255);"></span><span
                class="day-item-point"
                style="top: 124.955px; left: 220.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 129.5px; left: 328.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 115.864px; left: 436.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 106.773px; left: 544.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 115.864px; left: 652.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 102.227px; left: 760.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 106.773px; left: 868.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 97.6818px; left: 976.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 93.1364px; left: 1084.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 93.1364px; left: 1192.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 111.318px; left: 1300.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 106.773px; left: 1408.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 93.1364px; left: 1516.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span><span
                class="day-item-point"
                style="top: 88.5909px; left: 1624.5px; border: 1px solid rgb(255, 255, 255); background: rgb(54, 131, 195);"></span>
              <canvas id="dayCvs" width="2610" height="255" style="width: 1740px; height: 170px; left: 0px;"></canvas>
            </div>
          </div>
        </div>
        <div class="weather-hour-btn-box right-box"><span class="right"></span></div>
      </div>
    </div>
    <div class="weather-15day-other"><!----></div>
    <div class="weather-zhishu">
      <div class="zhishu-title"><span class="zhishu-titleone">生活气象指数</span> <span
          class="zhishu-titletwo">下午好，今日天气晴好，心情也要保持晴朗哦</span></div>
      <div class="zhishu-box">
        <div class="zhishu-dec">
          <div class="zhishu-item"><img
              src="https://weathernew.pae.baidu.com/static/weathernew/static/image/0_2c174d7.png">
            <div class="item-right">
              <div class="zhishu-item-top">穿衣: 毛衣类</div>
              <div class="zhishu-item-bottom">4℃~13℃</div>
            </div>
          </div>
        </div>
        <div class="zhishu-dec">
          <div class="zhishu-item"><img
              src="https://weathernew.pae.baidu.com/static/weathernew/static/image/2_a2ec97a.png">
            <div class="item-right">
              <div class="zhishu-item-top">出游: 较适宜</div>
              <div class="zhishu-item-bottom">多云, 空气良</div>
            </div>
          </div>
        </div>
        <div class="zhishu-dec">
          <div class="zhishu-item"><img
              src="https://weathernew.pae.baidu.com/static/weathernew/static/image/3_64099a6.png">
            <div class="item-right">
              <div class="zhishu-item-top">洗车: 不适宜</div>
              <div class="zhishu-item-bottom">近期有大风</div>
            </div>
          </div>
        </div>
        <div class="zhishu-dec">
          <div class="zhishu-item"><img
              src="https://weathernew.pae.baidu.com/static/weathernew/static/image/7_b55cffb.png">
            <div class="item-right">
              <div class="zhishu-item-top">化妆: 保湿</div>
              <div class="zhishu-item-bottom">空气湿度68.0%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="weather-future">
      <div class="future-weather" id="weatherFuture">
        <div class="future-weather-header"><span>未来40天天气预报</span></div>
        <ul class="header-week">
          <li class="header-week-item">
            周日
          </li>
          <li class="header-week-item">
            周一
          </li>
          <li class="header-week-item">
            周二
          </li>
          <li class="header-week-item">
            周三
          </li>
          <li class="header-week-item">
            周四
          </li>
          <li class="header-week-item">
            周五
          </li>
          <li class="header-week-item">
            周六
          </li>
        </ul>
        <ul class="future-weather-box">
          <li class="future-weather-item" style="border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item"
            style="border-left: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item"
            style="border-left: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item"
            style="border-left: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item"
            style="border-left: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">今天</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>4</span> <span>~</span> <span>13°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              无持续风向&lt;3级
            </p>
            <p class="future-weather-pm" style="background: rgb(130, 201, 30);">
              良
            </p>
          </li>
          <li class="future-weather-item"
            style="border-left: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">08</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>3</span> <span>~</span> <span>12°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              东北风4-5级
            </p>
            <p class="future-weather-pm" style="background: rgb(130, 201, 30);">
              良
            </p>
          </li>
          <li class="future-weather-item"
            style="border-left: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">09</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>2</span> <span>~</span> <span>11°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              东风3-4级
            </p>
            <p class="future-weather-pm" style="background: rgb(130, 201, 30);">
              良
            </p>
          </li>
          <li class="future-weather-item">
            <div class="future-weather-date">10</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>5</span> <span>~</span> <span>15°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              东风3-4级
            </p>
            <p class="future-weather-pm" style="background: rgb(130, 201, 30);">
              良
            </p>
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">11</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayxiaoyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>7</span> <span>~</span> <span>16°C</span></p>
            <p>
              小雨
            </p>
            <p class="future-weather-wind">
              西南风3-4级
            </p>
            <p class="future-weather-pm" style="background: rgb(130, 201, 30);">
              良
            </p>
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">12</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>5</span> <span>~</span> <span>21°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              西北风3-4级
            </p>
            <p class="future-weather-pm" style="background: rgb(130, 201, 30);">
              良
            </p>
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">13</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayyin"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>8</span> <span>~</span> <span>17°C</span></p>
            <p>
              阴
            </p>
            <p class="future-weather-wind">
              东风3-4级
            </p>
            <p class="future-weather-pm" style="background: rgb(130, 201, 30);">
              良
            </p>
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">14</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>7</span> <span>~</span> <span>19°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              东北风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">15</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayyin"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>9</span> <span>~</span> <span>19°C</span></p>
            <p>
              阴
            </p>
            <p class="future-weather-wind">
              东南风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">16</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>10</span> <span>~</span> <span>19°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              西风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item">
            <div class="future-weather-date">17</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>10</span> <span>~</span> <span>16°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              东风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">18</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>6</span> <span>~</span> <span>17°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              西南风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">19</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>7</span> <span>~</span> <span>21°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              南风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">20</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>10</span> <span>~</span> <span>24°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              南风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">21</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>11</span> <span>~</span> <span>24°C</span></p>
            <p>
              多云
            </p>
            <p class="future-weather-wind">
              东南风&lt;3级
            </p> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">22</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayxiaoyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>15</span> <span>~</span> <span>24°C</span></p>
            <p>
              小雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">23</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayzhongyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>7</span> <span>~</span> <span>20°C</span></p>
            <p>
              中雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item">
            <div class="future-weather-date">24</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>5</span> <span>~</span> <span>14°C</span></p>
            <p>
              多云
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">25</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>8</span> <span>~</span> <span>17°C</span></p>
            <p>
              多云
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">26</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>8</span> <span>~</span> <span>17°C</span></p>
            <p>
              多云
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">27</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>10</span> <span>~</span> <span>17°C</span></p>
            <p>
              多云
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">28</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>11</span> <span>~</span> <span>21°C</span></p>
            <p>
              多云
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">29</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayqingtian"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>14</span> <span>~</span> <span>24°C</span></p>
            <p>
              晴
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">30</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>15</span> <span>~</span> <span>25°C</span></p>
            <p>
              多云
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item">
            <div class="future-weather-date">31</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayqingtian"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>16</span> <span>~</span> <span>28°C</span></p>
            <p>
              晴
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">04-01</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayduoyun"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>18</span> <span>~</span> <span>29°C</span></p>
            <p>
              多云
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">02</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayzhongyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>17</span> <span>~</span> <span>28°C</span></p>
            <p>
              小到中雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">03</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayqingtian"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>18</span> <span>~</span> <span>28°C</span></p>
            <p>
              晴
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">04</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayzhongyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>18</span> <span>~</span> <span>29°C</span></p>
            <p>
              小到中雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">05</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#graydayu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>18</span> <span>~</span> <span>27°C</span></p>
            <p>
              中到大雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">06</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#graydayu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>17</span> <span>~</span> <span>24°C</span></p>
            <p>
              中到大雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item">
            <div class="future-weather-date">07</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayyin"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>15</span> <span>~</span> <span>20°C</span></p>
            <p>
              阴
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">08</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayxiaoyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>15</span> <span>~</span> <span>18°C</span></p>
            <p>
              小雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">09</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayxiaoyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>16</span> <span>~</span> <span>20°C</span></p>
            <p>
              小雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">10</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayzhongyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>11</span> <span>~</span> <span>17°C</span></p>
            <p>
              大到暴雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">11</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#graydayu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>11</span> <span>~</span> <span>12°C</span></p>
            <p>
              中到大雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">12</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayxiaoyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>11</span> <span>~</span> <span>13°C</span></p>
            <p>
              小雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">13</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayxiaoyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>11</span> <span>~</span> <span>13°C</span></p>
            <p>
              小雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item">
            <div class="future-weather-date">14</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayxiaoyu"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>12</span> <span>~</span> <span>16°C</span></p>
            <p>
              小雨
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="future-weather-date">15</div>
            <p class="future-weather-day-icon-box"><svg class="future-weather-day-icon">
                <use xlink:href="#grayyin"></use>
              </svg></p>
            <p class="future-weather-temperature"><span>13</span> <span>~</span> <span>18°C</span></p>
            <p>
              阴
            </p> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
          <li class="future-weather-item" style="border-left: 1px solid rgba(255, 255, 255, 0.1);">
            <!---->
            <p class="future-weather-day-icon-box"><!----></p> <!----> <!----> <!----> <!---->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
[{ 'provinceCode': '0', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [30709.74, 30765.12, 30784.09, 30745.89, 30747.19, 30189.45, 29693.52, 30075.53, 29921.15, 29450.11, 28949.1], 'yieldTotal': [20628.56, 20960.91, 21214.19, 21109.42, 21267.59, 21212.9, 20961.4, 21185.96, 21284.24, 20849.48, 20660.3] }, { 'provinceCode': '0', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [24439.65, 24442.7, 24566.9, 24665.78, 24478.15, 24266.19, 23727.68, 23379.99, 23567.06, 23518.46, 23627.2], 'yieldTotal': [12363.93, 12823.52, 13255.52, 13318.83, 13424.13, 13144.05, 13359.63, 13425.38, 13694.45, 13772.34, 13659] }, { 'provinceCode': '0', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [41299.21, 42996.81, 44968.39, 44177.61, 42399, 42129, 41284.06, 41264.26, 43324.24, 43070.15, 44218.9], 'yieldTotal': [24845.32, 24976.44, 26499.22, 26361.31, 25907.07, 25717.39, 26077.89, 26066.52, 27255.06, 27720.3, 28884.2] }, { 'provinceCode': '0', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [7050, 7098, 6827, 7598.5, 8244.8, 8412.8, 9331.73, 9882.5, 10240, 10470], 'yieldTotal': [1240.71, 1268.57, 1236.74, 1359.55, 1528.25, 1596.71, 1809.18, 1960.18, 1640, 2084] }, { 'provinceCode': '0', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [5025.76, 4910.41, 4785.58, 4802.4, 4859.9, 4758.1, 4673, 4656.1, 4632.5, 4534.8], 'yieldTotal': [1717.59, 1683.11, 1645.33, 1698.6, 1769.6, 1798.4, 1777.9, 1798.3, 1790.7, 1788.3] }, { 'provinceCode': '0', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [4162.15, 4176.47, 3774.98, 3198.33, 3194.73, 3354.41, 3339.29, 3168.91, 3028.17, 3000.31, 2788.1], 'yieldTotal': [628.16, 629.94, 590.74, 534.28, 565.25, 610.28, 588.9, 591.05, 573.09, 598.02, 561.8] }, { 'provinceCode': '0', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [4396.09, 4369.7, 4385.52, 4448.4, 4607.66, 4619.66, 4633.48, 4730.83, 4805.29, 4683.8], 'yieldTotal': [1610.89, 1590.08, 1596.13, 1636.06, 1709.19, 1733.2, 1751.96, 1799.27, 1830.78, 1832.95] }, { 'provinceCode': '0', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [7193.49, 7158.09, 7027.66, 6622.81, 6653.01, 6550.61, 6583.09, 6764.72, 6991.57, 7253.47], 'yieldTotal': [1363.63, 1391.43, 1385.92, 1312.8, 1327.41, 1328.12, 1348.47, 1404.91, 1471.35, 1553.14] }, { 'provinceCode': '0', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [1704.1, 1638.16, 1476.18, 1401.65, 1371.36, 1405.84, 1390.73, 1353.38, 1316.07, 1289.17], 'yieldTotal': [11926.35, 11578.82, 10706.43, 10321.54, 10440.43, 10809.71, 10938.81, 10812.1, 10666.38, 10338.13] }, { 'provinceCode': '110000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [0.19, 0.18, 0.2, 0.2, 0.12, 0.17, 0.15, 0.2, 0.31, 0.42], 'yieldTotal': [0.13, 0.13, 0.14, 0.14, 0.07, 0.11, 0.1, 0.14, 0.17, 0.21] }, { 'provinceCode': '110000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [36.22, 23.58, 20.78, 15.89, 11.27, 9.79, 8.04, 8.39, 13.07, 18.19], 'yieldTotal': [18.73, 12.21, 11.12, 8.54, 6.19, 5.26, 4.41, 4.62, 6.85, 9.56] }, { 'provinceCode': '110000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [114.49, 88.62, 76.29, 64.26, 49.74, 40.09, 33.66, 35.65, 42.77, 51.15], 'yieldTotal': [75.18, 50.04, 49.45, 42.55, 33.21, 27.14, 22.83, 24.19, 29.04, 33.54] }, { 'provinceCode': '110000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [4.11, 4.14, 3.48, 1.96, 2.2, 1.85, 1.4, 1.24, 1.4, 3.8], 'yieldTotal': [0.81, 0.6, 0.65, 0.37, 0.47, 0.37, 0.28, 0.26, 0.3, 0.9] }, { 'provinceCode': '110000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '110000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [0.14, 0.1, 0.1], 'yieldTotal': [0.02, 0.01, 0.01] }, { 'provinceCode': '110000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [3.02, 2.2, 1.78, 1.49, 1.44, 1.15, 0.87, 0.94, 1.25, 2.76], 'yieldTotal': [0.91, 0.61, 0.52, 0.44, 0.41, 0.32, 0.25, 0.28, 0.48, 0.83] },
{ 'provinceCode': '110000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '110000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '120000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [22.33, 22.25, 22.15, 26.51, 30.49, 39.9, 45.53, 53.45, 58.5, 55.26], 'yieldTotal': [17.16, 16.5, 16.35, 20.04, 26.33, 37.41, 42.91, 50.24, 54.73, 52.62] }, { 'provinceCode': '120000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [107.84, 108, 105.97, 107.29, 108.77, 110.84, 101.12, 103.96, 118.51, 118.77], 'yieldTotal': [55.96, 57.21, 58.06, 58.9, 62.41, 57.13, 60.47, 62.86, 72.16, 72.96] }, { 'provinceCode': '120000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [192.34, 203.61, 215.71, 219.53, 201.42, 186.77, 180.78, 178.86, 185.63, 187.24], 'yieldTotal': [102.5, 101.8, 107.82, 118.69, 119.29, 110.55, 115.18, 109.7, 118.28, 123.82] }, { 'provinceCode': '120000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [6.08, 6.39, 4.75, 3.54, 3.37, 6.21, 5.15, 4.11, 2.4, 4.6], 'yieldTotal': [0.75, 0.83, 0.95, 0.83, 0.78, 1.35, 1.04, 0.85, 0.5, 1.2] }, { 'provinceCode': '120000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [0.3, 0.3, 0.3, 0.3], 'yieldTotal': [0.2, 0.2, 0.2, 0.2] }, { 'provinceCode': '120000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [36.71, 27.99, 17.32, 12.93, 20.67, 17.1, 14.11, 7.8, 3.65, 2.48, 1.1], 'yieldTotal': [4.54, 3.54, 2.35, 2.1, 2.48, 1.83, 1.81, 1.02, 0.4, 0.32, 0.1] }, { 'provinceCode': '120000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [1.16, 0.93, 0.78, 1.27, 1.46, 1.43, 0.91, 0.7, 0.79, 0.53], 'yieldTotal': [0.41, 0.31, 0.27, 0.43, 0.53, 0.53, 0.36, 0.28, 0.29, 0.22] }, { 'provinceCode': '120000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [0.03, 0.14, 0.25, 0.03, 0.02, 0.08, 0.04, 0.06], 'yieldTotal': [0.01, 0.03, 0.04, 0.01, 0.01, 0.01, 0.01, 0.01] }, { 'provinceCode': '120000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '130000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [82.91, 80.49, 79.91, 76.32, 75.02, 78.43, 78.17, 78.72, 78.35, 76.59], 'yieldTotal': [56.11, 50.97, 51.18, 51.23, 50.43, 52.49, 48.65, 48.93, 49.6, 48.88] }, { 'provinceCode': '130000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [2432.04, 2403.98, 2394.18, 2389.75, 2373.36, 2357.19, 2322.5, 2216.92, 2246.58, 2247.29], 'yieldTotal': [1418.99, 1444.28, 1482.79, 1480.23, 1504.12, 1450.73, 1462.57, 1439.3, 1469.13, 1474.57] }, { 'provinceCode': '130000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [3428.53, 3542.09, 3654.43, 3696.14, 3544.06, 3437.74, 3408.2, 3417.1, 3454.11, 3455.87], 'yieldTotal': [1922.79, 1898.84, 1897.74, 2031.21, 2035.48, 1941.15, 1986.64, 2051.82, 2066.77, 2094.7] }, { 'provinceCode': '130000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [92.1, 86.65, 78.62, 68.73, 70.1, 87.57, 93.46, 89.48, 66.8, 98.3], 'yieldTotal': [18.07, 18.22, 15.33, 16.03, 17.06, 21.23, 23.02, 22.31, 16.3, 23] }, { 'provinceCode': '130000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [154.2, 156.9, 148.8, 155.2], 'yieldTotal': [101.2, 103.1, 93.6, 98.4] }, { 'provinceCode': '130000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [423.33, 398.33, 298.05, 230.86, 220.6, 210.39, 203.89, 189.2, 139.77, 116.14, 86], 'yieldTotal': [38.75, 36.99, 23.9, 23.9, 24.04, 23.93, 22.74, 20.86, 15.97, 13.9, 10.4] }, { 'provinceCode': '130000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [311.65, 287.62, 276.66, 270.64, 266.79, 258.08, 250.21, 246.05, 247.29, 232.38], 'yieldTotal': [113.99, 105.46, 102.81, 102.68, 103.41, 98.45, 96.46, 96.81, 96.3, 92.58] }, { 'provinceCode': '130000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [20.67, 20.59, 18.19, 19.48, 24.52, 19.42, 19.85, 31.81, 31.99, 31.24], 'yieldTotal': [3.33, 3.32, 3.06, 3.22, 4.17, 3.4, 3.51, 5.65, 6.01, 5.68] }, { 'provinceCode': '130000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '140000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [1.06, 0.99, 0.78, 0.79, 0.76, 0.8, 2.53, 2.45, 2.65, 2.16], 'yieldTotal': [0.73, 0.68, 0.52, 0.55, 0.52, 0.56, 1.76, 1.71, 1.75, 1.46] }, { 'provinceCode': '140000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [598.69, 585.08, 575.88, 564, 560.53, 560.27, 546.8, 535.88, 536.84, 535.05], 'yieldTotal': [203.89, 224.71, 231.54, 229.15, 232.4, 228.59, 226.21, 236.5, 243.37, 245.2] }, { 'provinceCode': '140000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [1836.3, 1868.6, 1894.48, 1860.67, 1806.85, 1747.67, 1715.04, 1742.22, 1772.57, 1813.88], 'yieldTotal': [1049.45, 1045.48, 974.71, 1017.96, 977.87, 981.62, 939.37, 979.95, 977.57, 1021.07] }, { 'provinceCode': '140000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [158.74, 149.51, 137.4, 134.13, 130.79, 150.53, 129.14, 119.61, 92.2, 112.4], 'yieldTotal': [16.08, 15.57, 14.63, 16.7, 17.09, 23.6, 21.47, 20.78, 14.4, 18.9] }, { 'provinceCode': '140000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [162.4, 160.7, 169.9, 153.65], 'yieldTotal': [52.7, 53.8, 57.04, 51.61] }, { 'provinceCode': '140000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [20.97, 15.47, 8.29, 3.53, 2.87, 2.58, 2.26, 1.13, 0.7, 0.32], 'yieldTotal': [2.14, 1.57, 0.83, 0.52, 0.4, 0.36, 0.3, 0.16, 0.09, 0.04] }, { 'provinceCode': '140000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [7.18, 6.47, 5.89, 6.23, 5.77, 5.39, 5.18, 4.76, 5.03, 4.97], 'yieldTotal': [1.58, 1.4, 1.01, 1.26, 1.3, 1.34, 1.35, 1.32, 1.33, 1.47] }, { 'provinceCode': '140000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [4.85, 4.26, 12.61, 12.77, 18.8, 25.27, 22.9, 17.67, 18.76, 19.04], 'yieldTotal': [0.72, 0.72, 1.28, 1.52, 1.78, 2.37, 2.22, 2.14, 2.79, 2.57] }, { 'provinceCode': '140000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '150000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [82.37, 85.96, 88.03, 108.84, 122.19, 150.45, 160.7, 160.86, 155.14, 117.23], 'yieldTotal': [53.5, 50.8, 50.57, 69.82, 85.23, 121.86, 136.15, 123.14, 115.3, 90.21] }, { 'provinceCode': '150000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [618.29, 619.27, 617.21, 658.79, 673.94, 596.73, 538, 478.96, 442.15, 386.16], 'yieldTotal': [184.33, 174.83, 179.15, 187.72, 189.05, 202.29, 182.67, 170.78, 157.24, 126.39] }, { 'provinceCode': '150000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [3534.06, 3828.54, 3938.32, 3843.56, 3716.34, 3742.14, 3776.3, 3823.9, 4204.6, 4194.58], 'yieldTotal': [2397.63, 2503.25, 2652.23, 2563.09, 2497.44, 2699.95, 2722.32, 2742.71, 2994.25, 3098.36] }, { 'provinceCode': '150000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [796.25, 744.56, 812.85, 923.4, 988.96, 1094.24, 1189.8, 1201.68, 893.2, 1222], 'yieldTotal': [128.6, 115.04, 126.75, 150.75, 162.62, 179.4, 225.97, 234.74, 168.5, 245.4] }, { 'provinceCode': '150000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [297.4, 277.4, 267.9, 224], 'yieldTotal': [137.8, 124.2, 122.9, 110] }, { 'provinceCode': '150000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [1.08, 1.03, 0.1, 0.22, 0.08, 0.07, 0.06], 'yieldTotal': [0.16, 0.15, 0.03, 0.03, 0.01, 0.01, 0.01] }, { 'provinceCode': '150000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [16.17, 17.55, 13.42, 21.71, 23.35, 28.57, 36.99, 53.45, 68.44, 35.18], 'yieldTotal': [3.27, 4.12, 3.37, 5.57, 5.93, 7.73, 10.82, 15.87, 25.68, 13.64] }, { 'provinceCode': '150000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [310.68, 340.07, 342.53, 302.25, 309.64, 246.24, 259.13, 246.07, 223.94, 253.7], 'yieldTotal': [34.53, 41.62, 42.8, 41.66, 35.6, 39.77, 38.98, 28.33, 32.24, 36.97] }, { 'provinceCode': '150000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '210000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [577.9, 492.12, 469.23, 476.39, 492.67, 488.36, 507.11, 520.41, 520.63, 516.39], 'yieldTotal': [451.22, 395.29, 402.73, 410.39, 422.05, 418.02, 434.82, 446.53, 424.62, 425.56] }, { 'provinceCode': '210000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [3.45, 3.33, 2.97, 2.9, 3.57, 2.39, 2.39, 3.08, 2.74, 2.01], 'yieldTotal': [1.67, 1.61, 1.38, 1.1, 1.26, 1.37, 1.38, 1.66, 1.09, 0.82] }, { 'provinceCode': '210000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [2603.12, 2758.68, 2922.41, 2789.78, 2691.98, 2712.98, 2675, 2699.31, 2724.19, 2757.99], 'yieldTotal': [1812.07, 1385.81, 1697.12, 1810.07, 1789.44, 1662.79, 1884.43, 1793.85, 2008.41, 1959.16] }, { 'provinceCode': '210000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [73.16, 63.49, 59.94, 69.45, 74.3, 73.46, 83.89, 103.16, 103.9, 115.3], 'yieldTotal': [18.08, 13.31, 13.43, 14.81, 19.31, 17.99, 21.27, 23.9, 25.1, 27] }, { 'provinceCode': '210000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [60.4, 44.5, 42, 38.2], 'yieldTotal': [21.4, 20.7, 18.3, 16.4] }, { 'provinceCode': '210000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [0.18, 0.06, 0.07], 'yieldTotal': [0.05, 0.01, 0.01] }, { 'provinceCode': '210000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [233.14, 240.33, 247.45, 269.77, 271.66, 286.08, 289.16, 306.22, 332.32, 308.59], 'yieldTotal': [65.09, 55.36, 55.43, 75.93, 80.02, 76.82, 96.44, 98.74, 115.49, 112.55] }, { 'provinceCode': '210000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [0.53, 0.99, 1.17, 0.73, 0.78, 0.82, 0.81, 0.69, 0.6, 0.52], 'yieldTotal': [0.1, 0.17, 0.2, 0.13, 0.13, 0.14, 0.14, 0.12, 0.11, 0.09] }, { 'provinceCode': '210000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '220000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [739.37, 757.01, 778.82, 800.19, 820.83, 839.71, 840.39, 837.14, 837.27, 833.18], 'yieldTotal': [573.09, 595.39, 644.26, 670.45, 684.43, 646.32, 657.17, 665.43, 684.67, 680.91] }, { 'provinceCode': '220000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [4, 0.37, 0.41, 2.42, 1.2, 2.94, 4.76, 4.46, 5.4], 'yieldTotal': [1.56, 0.14, 0.15, 0.15, 0.04, 1.11, 1.67, 1.62, 1.74] }, { 'provinceCode': '220000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [3808.19, 4062.64, 4251.06, 4241.97, 4164.01, 4231.47, 4219.61, 4287.24, 4401.23, 4469.4], 'yieldTotal': [2980.93, 3004.17, 3138.77, 3286.28, 3250.78, 2799.88, 3045.3, 2973.44, 3198.44, 3257.86] }, { 'provinceCode': '220000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [240.63, 242.78, 181.9, 187.54, 220.22, 279.24, 345, 321.13, 252.7, 309.9], 'yieldTotal': [49.52, 40.76, 31.52, 37.34, 50.16, 55.14, 70.12, 64.23, 54.7, 70] }, { 'provinceCode': '220000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [45.6, 41.5, 39.8, 26.89], 'yieldTotal': [30.7, 30.3, 23.4, 16.95] }, { 'provinceCode': '220000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '220000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [178.16, 185.56, 219.59, 268.67, 332.65, 244.89, 234.44, 239.18, 242.61, 213.81], 'yieldTotal': [67.08, 67.36, 70.78, 86.84, 109.27, 80.28, 76.94, 78.3, 83.29, 79.44] }, { 'provinceCode': '220000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '220000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '230000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [3860.81, 3968.48, 3918.35, 3925.33, 3948.89, 3783.1, 3812.55, 3872.03, 3867.39, 3601.37], 'yieldTotal': [2710.82, 2797.22, 2720.87, 2763.62, 2819.33, 2685.54, 2663.46, 2896.15, 2913.73, 2718] }, { 'provinceCode': '230000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [131.65, 143.99, 70.13, 78.58, 101.79, 109.41, 55.96, 48.74, 67.27, 21.43], 'yieldTotal': [38.49, 46.06, 21.5, 28.6, 38.09, 36.18, 20.39, 18.71, 26.27, 8.44] }, { 'provinceCode': '230000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [6571.19, 6707.81, 7361.15, 6528.42, 5862.81, 6317.82, 5874.63, 5480.67, 6524.24, 5970.18], 'yieldTotal': [3734.84, 3929.14, 4280.19, 3912.81, 3703.11, 3982.16, 3939.82, 3646.61, 4149.23, 4038.42] }, { 'provinceCode': '230000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [2637.09, 2792.89, 2661.49, 3223.1, 3735.49, 3567.74, 4279.47, 4832.09, 3887.8, 4931.6], 'yieldTotal': [454.23, 514.02, 498.76, 562.81, 689.43, 657.77, 780.78, 920.29, 718.8, 953.4] }, { 'provinceCode': '230000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [114.7, 69.3, 65.4, 45.7], 'yieldTotal': [52.6, 31.8, 31.2, 23] }, { 'provinceCode': '230000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '230000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [24.89, 17.74, 16.86, 23.07, 18.7, 17.41, 20.11, 19.77, 22.79, 24.59], 'yieldTotal': [7.16, 5.16, 5.21, 4.69, 4.97, 5.14, 6.69, 8.73, 10.48, 11.74] }, { 'provinceCode': '230000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [0.09, 0.02, 0.05, 0.27, 1.82, 1.96, 0.2, 0.21, 0.08], 'yieldTotal': [0.05, 0.06, 0.05, 0.07, 0.25, 0.25, 0.03, 0.03, 0.02] }, { 'provinceCode': '230000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '310000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [114.83, 111.25, 110.16, 106.29, 104.11, 103.58, 103.65, 104.06, 103.84, 103.7], 'yieldTotal': [97.85, 95.05, 94.71, 91.41, 85.6, 87.97, 88.04, 84.66, 85.15, 82.73] }, { 'provinceCode': '310000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [46.55, 46.73, 47.27, 35.64, 21.01, 21.34, 9.99, 7.51, 10.91, 15.36], 'yieldTotal': [18.51, 19.83, 20.71, 13.22, 10.18, 12.98, 5.8, 5.26, 7.35, 10.71] }, { 'provinceCode': '310000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [4.36, 4.87, 4.34, 3.97, 3.03, 1.81, 1.56, 1.24, 1.01, 0.96], 'yieldTotal': [3.05, 3.23, 2.66, 2.72, 2.1, 1.25, 1.06, 0.85, 0.68, 0.61] }, { 'provinceCode': '310000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [4.02, 3.24, 3.35, 1.82, 1.07, 0.64, 0.73, 0.54, 0.5, 0.6], 'yieldTotal': [1.07, 0.84, 0.87, 0.48, 0.21, 0.17, 0.2, 0.15, 0.1, 0.1] }, { 'provinceCode': '310000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '310000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [2.11, 0.84, 0.43, 0.34, 0.4, 0.09, 0.06], 'yieldTotal': [0.41, 0.13, 0.05, 0.1, 0.04, 0.01, 0.01] }, { 'provinceCode': '310000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [1, 1.07, 1.07, 1.05, 0.99, 0.59, 0.54, 0.23, 0.14, 0.17], 'yieldTotal': [0.27, 0.29, 0.29, 0.29, 0.28, 0.16, 0.16, 0.07, 0.05, 0.06] }, { 'provinceCode': '310000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [6.53, 5.31, 4.75, 3.85, 2.22, 2.09, 2.2, 2.1, 1.45, 0.68], 'yieldTotal': [1.4, 1.16, 1.08, 0.78, 0.48, 0.54, 0.63, 0.64, 0.44, 0.21] }, { 'provinceCode': '310000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [0.09, 0.07, 0.06, 0.05, 0.03, 0.07, 0.07, 0.05, 0.03, 0.02], 'yieldTotal': [0.42, 0.34, 0.31, 0.28, 0.19, 0.24, 0.39, 0.25, 0.09, 0.09] }, { 'provinceCode': '320000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [2229.87, 2236.7, 2250.32, 2256.26, 2237.72, 2214.72, 2184.29, 2202.84, 2219.2, 2221.42], 'yieldTotal': [1891.89, 1882.55, 1917.33, 1898.94, 1892.57, 1958.03, 1959.64, 1965.7, 1984.63, 1991.61] }, { 'provinceCode': '320000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [2344.3, 2374.13, 2410.66, 2436.81, 2412.75, 2403.96, 2346.93, 2338.89, 2357.87, 2377.27], 'yieldTotal': [1162.56, 1225.47, 1248.96, 1245.81, 1295.47, 1289.12, 1317.51, 1333.87, 1342.22, 1365.74] }, { 'provinceCode': '320000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [467.52, 519.7, 540.98, 540.17, 543.21, 515.77, 504.24, 509.76, 500.6, 495.04], 'yieldTotal': [237.31, 284.79, 302.04, 284.44, 318.07, 299.95, 311.07, 308.3, 300.06, 295.84] }, { 'provinceCode': '320000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [206.69, 201.7, 195.82, 196.89, 194.4, 193.75, 191.79, 196.39, 192.8, 210.4], 'yieldTotal': [45.7, 46.18, 46.94, 45.98, 44.95, 49.12, 51.29, 51.93, 50.7, 54.8] }, { 'provinceCode': '320000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '320000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [92.14, 75.34, 50.23, 31.7, 21, 16.6, 11.6, 8.35, 5.78, 4.15, 3.5], 'yieldTotal': [5.55, 4.87, 4.25, 3.69, 2.57, 2.06, 1.57, 1.06, 0.79, 0.58, 0.5] }, { 'provinceCode': '320000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [91.57, 88.72, 87.35, 90.14, 88.15, 98.38, 103.53, 99.7, 97.2, 94.22], 'yieldTotal': [34.29, 33.71, 33.81, 35.24, 34.78, 39.33, 42.71, 40.63, 40.26, 39.49] }, { 'provinceCode': '320000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [276.47, 251.03, 223.62, 188.84, 175.27, 159.08, 173.54, 172.91, 193.12, 188.59], 'yieldTotal': [75.66, 69.4, 63.3, 52.6, 49.77, 45.7, 50.45, 51.21, 56.38, 55.66] }, { 'provinceCode': '320000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [1.03, 1, 0.89, 0.8, 0.8, 0.85, 0.87, 0.81, 0.72, 0.64], 'yieldTotal': [6.23, 6.21, 5.47, 4.91, 4.85, 5.26, 5.42, 5.21, 4.72, 4.04] }, { 'provinceCode': '330000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [677.05, 654.2, 634.24, 613.09, 620.68, 651.07, 627.52, 636.02, 633.36, 629.19], 'yieldTotal': [474.02, 468.38, 445.8, 444.83, 444.91, 477.4, 462.06, 465.12, 469.12, 462.89] }, { 'provinceCode': '330000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [81.45, 89.53, 98.96, 85.32, 103.67, 85.36, 82.66, 93.36, 114.81, 130.64], 'yieldTotal': [30.01, 33.74, 38.68, 28.28, 41.92, 35.79, 32.38, 40.79, 48.34, 55.26] }, { 'provinceCode': '330000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [50.31, 51.07, 51.63, 49.94, 51.88, 49.34, 76.42, 63.28, 57.97, 55.4], 'yieldTotal': [21.23, 23.1, 23.1, 21.88, 23.04, 20.64, 32.32, 25.91, 25.56, 24.11] }, { 'provinceCode': '330000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [84.55, 85.1, 86.27, 83.82, 80.41, 85.21, 90.16, 82.75, 76, 77.8], 'yieldTotal': [21.68, 23.04, 22.14, 20.36, 20.38, 21.46, 23.36, 21.75, 21.3, 21.1] }, { 'provinceCode': '330000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [32.8, 23.5, 27.5, 27.17], 'yieldTotal': [12.6, 9, 10.6, 10.63] }, { 'provinceCode': '330000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [7.91, 6.02, 5.87, 5.62, 4.53, 5.71, 5.62, 4.81, 4, 3.43, 2.4], 'yieldTotal': [1.09, 0.87, 0.84, 0.83, 0.64, 0.81, 0.81, 0.69, 0.56, 0.48, 0.3] }, { 'provinceCode': '330000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [17.84, 13.73, 17.54, 17.33, 17.14, 15.84, 16.63, 17.01, 16.3, 16], 'yieldTotal': [5.02, 3.86, 5.08, 5.01, 5.1, 4.74, 5.03, 5.18, 4.95, 4.84] }, { 'provinceCode': '330000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [146.84, 114.93, 109.31, 99.33, 96.15, 104.87, 116.76, 113.73, 120.1, 124.14], 'yieldTotal': [28.86, 22.85, 22.38, 19.37, 20.2, 23.34, 25.66, 25.75, 25.77, 27.31] }, { 'provinceCode': '330000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [7.71, 7.24, 6.84, 6.27, 5.71, 6.15, 6.92, 7.17, 6.66, 6.31], 'yieldTotal': [47.77, 44.96, 42.77, 40.98, 37.5, 40.59, 44.68, 46.39, 42.37, 39.19] }, { 'provinceCode': '340000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [2320.94, 2422.01, 2476.37, 2537.36, 2605.15, 2544.76, 2509.04, 2512.08, 2512.15, 2496.48], 'yieldTotal': [1426.63, 1523.62, 1616.8, 1570.02, 1647.46, 1681.21, 1630.01, 1560.51, 1590.43, 1583.4] }, { 'provinceCode': '340000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [2801.22, 2802.5, 2857.97, 2887.59, 2822.79, 2875.86, 2835.6, 2825.2, 2846, 2849.37], 'yieldTotal': [1460.59, 1581.11, 1661.05, 1635.5, 1644.47, 1607.45, 1656.89, 1671.73, 1699.73, 1722.27] }, { 'provinceCode': '340000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [1045.25, 1098.68, 1206.27, 1203.33, 1160.07, 1138.56, 1196.45, 1234.76, 1252.74, 1228.94], 'yieldTotal': [526.89, 599.86, 679.04, 634.49, 610.66, 595.61, 642.79, 663.25, 677.46, 663.39] }, { 'provinceCode': '340000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [687.49, 679.71, 601.12, 599.49, 620.55, 649.89, 636.24, 605.06, 587.2, 610.7], 'yieldTotal': [85.2, 90.44, 92.04, 90.49, 94.03, 97.49, 95.72, 92.94, 90.9, 94.2] }, { 'provinceCode': '340000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [4.8, 4.6, 4.2, 4.4], 'yieldTotal': [1.4, 1.3, 1.3, 1.48] }, { 'provinceCode': '340000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [285.13, 265.2, 232.5, 110.06, 88.13, 86.3, 60.3, 51.2, 34.43, 30.29, 22.7], 'yieldTotal': [25.11, 26.33, 23.37, 11.08, 8.55, 8.85, 5.55, 4.1, 2.91, 2.56, 2] }, { 'provinceCode': '340000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [187.26, 190.43, 191.12, 138.67, 138.87, 144.15, 142.2, 145.82, 146.18, 146.15], 'yieldTotal': [88.66, 94.35, 94.43, 68.71, 68.76, 71.05, 70.56, 72.33, 71.82, 72.38] }, { 'provinceCode': '340000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [568.13, 550.99, 532.45, 375.33, 354.14, 357.02, 363.88, 350.43, 372.94, 393.16], 'yieldTotal': [130.05, 127.75, 126.29, 87.58, 83.16, 84.3, 87.28, 85.3, 91.06, 96.4] }, { 'provinceCode': '340000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [5.04, 4.98, 5.12, 2.89, 1.9, 1.74, 1.98, 1.86, 1.66, 1.48], 'yieldTotal': [20.21, 19.67, 20.32, 6.18, 6.21, 10.1, 7.94, 8.05, 7, 6.29] }, { 'provinceCode': '350000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [711.48, 686.4, 659.92, 630.9, 628.59, 619.61, 599.23, 601.72, 599.35, 599.45], 'yieldTotal': [436.91, 424.1, 405.69, 386.61, 393.19, 398.31, 388.79, 391.75, 393.18, 393.75] }, { 'provinceCode': '350000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [0.48, 0.38, 0.28, 0.21, 0.2, 0.19, 0.11, 0.08, 0.07, 0.06], 'yieldTotal': [0.14, 0.11, 0.08, 0.06, 0.06, 0.05, 0.03, 0.02, 0.02, 0.02] }, { 'provinceCode': '350000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [29.66, 28.62, 27.76, 26.2, 26.81, 28.79, 30.49, 33.05, 33.99, 34.73], 'yieldTotal': [11.91, 11.74, 11.57, 10.96, 11.4, 12.56, 13.44, 14.76, 15.34, 15.65] }, { 'provinceCode': '350000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [35.41, 32.9, 30.99, 28.7, 28.98, 31.06, 32.74, 34.36, 34.6, 35.2], 'yieldTotal': [8.9, 8.5, 8.11, 7.65, 7.82, 8.62, 9.07, 9.47, 9.6, 9.9] }, { 'provinceCode': '350000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [49.2, 50, 49.3, 49.24], 'yieldTotal': [20.9, 21.5, 21.3, 21.24] }, { 'provinceCode': '350000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [0.1, 0.11, 0.1, 0.11, 0.09], 'yieldTotal': [0.01, 0.01, 0.01, 0.01, 0.01] }, { 'provinceCode': '350000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [74.71, 72.6, 70.53, 68.06, 67.08, 69.64, 71.51, 73.18, 73.74, 74.24], 'yieldTotal': [19.75, 19.55, 19.24, 18.6, 18.73, 20.32, 21.04, 21.68, 22.21, 22.43] }, { 'provinceCode': '350000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [6.2, 5.73, 5.33, 4.91, 4.9, 5.29, 5.61, 5.72, 6.34, 6.77], 'yieldTotal': [0.9, 0.84, 0.79, 0.74, 0.76, 0.86, 0.92, 0.96, 1.02, 1.1] }, { 'provinceCode': '350000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [8.05, 7.03, 5.99, 5.29, 4.94, 4.9, 4.83, 4.9, 5.16, 5.17], 'yieldTotal': [49.21, 43.49, 34.79, 28.83, 26.37, 26.13, 26.25, 26.98, 28.79, 28.84] }, { 'provinceCode': '360000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [3501.86, 3522.56, 3541.3, 3527.07, 3504.69, 3436.2, 3346.2, 3441.83, 3419.2, 3403], 'yieldTotal': [2105.96, 2144.18, 2157.16, 2140.51, 2126.15, 2092.2, 2048.3, 2051.2, 2073.94, 2036.5] }, { 'provinceCode': '360000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [12.58, 12.73, 12.86, 14.39, 14.51, 14.62, 14.4, 14.4, 13.6, 12], 'yieldTotal': [2.58, 2.61, 2.57, 3.04, 3.1, 3.17, 3.04, 3.3, 3.23, 3.1] }, { 'provinceCode': '360000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [26.02, 28.2, 31.84, 35.62, 35.65, 35, 46.5, 47.6, 50.9, 55.6], 'yieldTotal': [10.6, 11.14, 12.44, 15.28, 15.4, 15.65, 19.8, 20.66, 21.8, 22.1] }, { 'provinceCode': '360000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [97.14, 100.5, 101.97, 101.91, 102.11, 106.23, 108.8, 113.5, 106, 109.2], 'yieldTotal': [21.9, 22.65, 23.26, 24.26, 25.2, 26.27, 26.42, 27.75, 27.4, 26.4] }, { 'provinceCode': '360000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [37.6, 30.3, 25.6, 26.9], 'yieldTotal': [20.8, 16.9, 14.2, 14.3] }, { 'provinceCode': '360000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [84.67, 84.92, 81.1, 67.04, 69, 46.69, 42.7, 35, 11.03, 19.72, 19.4], 'yieldTotal': [13.09, 13.37, 11.52, 9.96, 10.46, 7.21, 6.57, 5.29, 1.72, 2.17, 2.2] }, { 'provinceCode': '360000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [163.69, 162.56, 164.15, 160.45, 162.46, 167.27, 165.14, 171.45, 177.19, 180.97], 'yieldTotal': [45.2, 45.65, 46.41, 45.61, 46.77, 48.06, 48.22, 50.9, 53.56, 54.56] }, { 'provinceCode': '360000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [547.98, 547.91, 545.02, 510.64, 509.06, 483, 482.29, 475.43, 504.51, 524.6], 'yieldTotal': [70.43, 72.35, 73.94, 68.91, 70.4, 69.08, 68.87, 67.81, 73.36, 79.06] }, { 'provinceCode': '360000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [14.47, 14.3, 14.45, 14.72, 14.64, 14.34, 13.95, 13.57, 13.4, 13.66], 'yieldTotal': [64.6, 64.52, 65.82, 66.71, 67.28, 64.57, 62.44, 61.18, 60.68, 62.48] }, { 'provinceCode': '370000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [123.87, 123.24, 117.18, 106.67, 108.86, 113.83, 115.6, 112.48, 113.04, 106.43], 'yieldTotal': [104.25, 101.71, 95.83, 88.84, 90.14, 98.59, 100.68, 98.77, 97.47, 90.59] }, { 'provinceCode': '370000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [3831.41, 3924.81, 4034.78, 4068, 4083.87, 4058.59, 4001.75, 3934.43, 3994.03, 4003.55], 'yieldTotal': [2264.32, 2325.57, 2391.69, 2490.11, 2495.11, 2471.68, 2552.92, 2568.85, 2636.66, 2641.19] }, { 'provinceCode': '370000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [3663.09, 3828.59, 3943.81, 4059.33, 4000.12, 3934.68, 3846.47, 3871.09, 3897.01, 3880.26], 'yieldTotal': [2320.02, 2400.95, 2505.4, 2613.81, 2662.15, 2607.16, 2536.53, 2595.4, 2589.52, 2630.44] }, { 'provinceCode': '370000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [144.04, 147.53, 129.67, 124.67, 119.55, 153.52, 183.53, 188.67, 182.8, 215], 'yieldTotal': [34.53, 34.93, 32.93, 33.56, 32.13, 43.33, 52.35, 55.49, 53.5, 58.1] }, { 'provinceCode': '370000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [136.22], 'yieldTotal': [706.97] }, { 'provinceCode': '370000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [551.68, 495.96, 451.01, 279.13, 174.67, 183.27, 169.28, 142.88, 110.18, 113.35, 96.5], 'yieldTotal': [53.31, 59.18, 47.77, 32.9, 20.72, 21.7, 19.6, 18.3, 14.03, 14.48, 12.6] }, { 'provinceCode': '370000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [764.42, 739.47, 722.84, 718.96, 709.23, 695.28, 666.49, 650.86, 631.74, 609.76], 'yieldTotal': [336.44, 323.94, 313.38, 312.13, 313.53, 306.67, 284.76, 286.64, 281.82, 270.1] }, { 'provinceCode': '370000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [8.54, 8.6, 8.89, 8.48, 8.05, 8.6, 8.87, 8.58, 9.26, 8.98], 'yieldTotal': [2.18, 2.18, 2.26, 2.27, 2.12, 2.18, 2.25, 2.2, 2.39, 2.3] }, { 'provinceCode': '370000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '410000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [610.97, 614.65, 616.35, 614.09, 615.03, 620.41, 616.6, 617.07, 608.23, 601.7], 'yieldTotal': [463.16, 500.53, 499.88, 508.29, 485.25, 501.41, 512.5, 513.71, 476.11, 479.15] }, { 'provinceCode': '410000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [5517.98, 5581.24, 5623.14, 5704.91, 5714.64, 5739.85, 5706.65, 5673.67, 5690.69, 5682.45], 'yieldTotal': [3266.33, 3385.2, 3526.9, 3618.62, 3705.21, 3602.85, 3741.77, 3753.13, 3802.81, 3812.71] }, { 'provinceCode': '410000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [3823.6, 4009.42, 4189.91, 4210.46, 3998.94, 3918.96, 3801.33, 3818.01, 3853.33, 3857.52], 'yieldTotal': [2116.47, 2088.89, 2288.5, 2216.29, 2170.14, 2351.38, 2247.37, 2342.37, 2051.73, 2275.05] }, { 'provinceCode': '410000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [424.01, 381.9, 343.56, 341.06, 345.17, 385.55, 394.67, 375.17, 333.2, 363.6], 'yieldTotal': [69.34, 51.52, 46.75, 46.9, 50.36, 95.57, 98.21, 93.42, 74.8, 84.9] }, { 'provinceCode': '410000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '410000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [114.96, 88.11, 64.34, 50.03, 40, 36.68, 33.8, 16.2, 11.5, 10.85, 6.1], 'yieldTotal': [11.68, 8.44, 6.77, 4.88, 4.36, 3.79, 2.71, 1.8, 1.4, 1.36, 0.7] }, { 'provinceCode': '410000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [1016.7, 1023.57, 1023.96, 1051.03, 1151.93, 1203.18, 1223.11, 1261.84, 1292.93, 1287.12], 'yieldTotal': [469.19, 466.09, 477.12, 494.27, 529.81, 572.44, 576.72, 594.93, 588.21, 615.41] }, { 'provinceCode': '410000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [228.58, 207.7, 186.58, 162.19, 155.69, 145.02, 171.51, 176.99, 189.89, 187.45], 'yieldTotal': [55.35, 49.69, 46.21, 40.9, 42.08, 38.97, 44.25, 45.95, 49.44, 49.01] }, { 'provinceCode': '410000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [3.11, 2.94, 2.6, 2.42, 2.31, 2.03, 1.62, 1.51, 1.41, 1.21], 'yieldTotal': [22.28, 20.74, 17.88, 16.67, 16.24, 15.39, 11.93, 10.69, 9.83, 8.44] }, { 'provinceCode': '420000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [2202.55, 2201.79, 2383.35, 2358.67, 2368.07, 2391, 2286.76, 2280.73, 2272.59, 2263.96], 'yieldTotal': [1728.32, 1756.44, 1961.42, 1874.47, 1927.16, 1965.62, 1877.06, 1864.34, 1883.62, 1865.78] }, { 'provinceCode': '420000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [1117.11, 1099.38, 1122.15, 1140.67, 1153.22, 1104.96, 1017.74, 1031.38, 1052.06, 1031.26], 'yieldTotal': [425.29, 431.43, 431.99, 440.74, 426.9, 410.37, 390.68, 400.66, 399.34, 405.57] }, { 'provinceCode': '420000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [653.43, 745.72, 813.53, 797.33, 794.78, 781.2, 727.53, 751.99, 762.71, 775.82], 'yieldTotal': [308.5, 340.89, 393.71, 357.41, 356.75, 323.38, 307.22, 311.54, 323.54, 312.32] }, { 'provinceCode': '420000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [103.27, 136.79, 144.4, 202.25, 212.34, 219.77, 211.72, 219.72, 223.8, 229.9], 'yieldTotal': [23.33, 33.1, 30.52, 31.35, 34.31, 34.21, 34.6, 35.54, 37.2, 35.4] }, { 'provinceCode': '420000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [236.6, 242.7, 248.5, 251.7], 'yieldTotal': [73.5, 76.4, 78.6, 79.8] }, { 'provinceCode': '420000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [415.59, 344.8, 264.74, 204.96, 204.8, 159.26, 162.83, 129.73, 120.71, 115.8, 103.3], 'yieldTotal': [45.97, 35.95, 29.76, 18.85, 18.36, 14.93, 14.36, 10.79, 10.89, 10.33, 9.6] }, { 'provinceCode': '420000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [217.77, 218.37, 221.65, 232.14, 230.53, 232.6, 243.62, 248.72, 244.67, 242.93], 'yieldTotal': [72.21, 73.83, 73.21, 77.98, 78.37, 80.67, 85.71, 87.1, 86.27, 85.42] }, { 'provinceCode': '420000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [1098.94, 1101.62, 1070.11, 983.62, 971.17, 932.97, 938.31, 1034.36, 1094.02, 1152.44], 'yieldTotal': [227.9, 230.86, 226.02, 211.14, 213.17, 205.31, 211.35, 241.06, 251.78, 274.19] }, { 'provinceCode': '420000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [5.95, 5.83, 6.3, 6.42, 6.57, 6.45, 6.48, 6.63, 6.35, 6.27], 'yieldTotal': [22.81, 23.37, 23.81, 26.97, 26.98, 27.7, 27.9, 28.15, 27.17, 26.57] }, { 'provinceCode': '430000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [4218.53, 4274.96, 4287.76, 4277.58, 4238.71, 4009, 3855.2, 3993.85, 3971.1, 3967.67], 'yieldTotal': [2645.27, 2732.68, 2756.75, 2724.61, 2740.35, 2674.01, 2611.5, 2638.94, 2683.1, 2639.88] }, { 'provinceCode': '430000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [36.19, 34.88, 34.05, 22.79, 28.34, 23.35, 22.37, 23.25, 23.36, 22.38], 'yieldTotal': [12.29, 11.78, 10.84, 7, 9.61, 8.01, 7.54, 7.77, 7.78, 7.59] }, { 'provinceCode': '430000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [358.35, 361.91, 366.85, 370.47, 365.81, 359.2, 386.6, 384.38, 397.6, 393.58], 'yieldTotal': [192.59, 197.49, 198.87, 200.02, 199.17, 202.82, 220.3, 223.25, 234.11, 225.69] }, { 'provinceCode': '430000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [95.59, 101.07, 96.75, 98.53, 99.71, 106.5, 113.3, 114.66, 117.8, 132.1], 'yieldTotal': [21.32, 22.53, 21.96, 22.78, 23.21, 26.51, 28.82, 31.16, 31.8, 33.8] }, { 'provinceCode': '430000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [55.3, 57.5, 63.1, 62.5], 'yieldTotal': [27.1, 28.3, 29.8, 30.4] }, { 'provinceCode': '430000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [159.56, 130.1, 103.6, 106.5, 95.67, 63.9, 63, 59.47, 60.16, 64.62, 55.9], 'yieldTotal': [19.8, 12.9, 12.3, 12.62, 10.95, 8.57, 8.18, 7.45, 8.05, 8.23, 7.6] }, { 'provinceCode': '430000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [104.87, 106.9, 105.64, 104.33, 106.14, 109.23, 110.91, 112.7, 113.99, 115.36], 'yieldTotal': [25.79, 26.54, 27.07, 26.82, 27.59, 28.49, 29.28, 29.9, 30.69, 31.09] }, { 'provinceCode': '430000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [1205.91, 1208.32, 1188.61, 1176.16, 1188.91, 1222.22, 1240.98, 1326.45, 1351.55, 1388.56], 'yieldTotal': [182.2, 187.95, 193.69, 191.3, 195.7, 204.17, 208.01, 228.74, 230.25, 243.82] }, { 'provinceCode': '430000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [8.22, 7.62, 7.19, 6.71, 7.23, 7.39, 7.42, 7.59, 7.53, 7.56], 'yieldTotal': [40.15, 36.77, 34.23, 31.26, 33.23, 33.81, 34.17, 34.92, 34.98, 34.86] }, { 'provinceCode': '440000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [1849.98, 1826.77, 1804.76, 1806.03, 1805.42, 1787.39, 1793.67, 1834.43, 1827.42, 1835.9], 'yieldTotal': [1012.8, 1053.29, 1040.82, 1039.53, 1046.34, 1032.07, 1075.05, 1099.58, 1104.41, 1108.63] }, { 'provinceCode': '440000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [0.92, 0.92, 0.9, 0.9, 0.46, 0.42, 0.42, 0.38, 0.25, 0.42], 'yieldTotal': [0.32, 0.3, 0.3, 0.3, 0.15, 0.15, 0.15, 0.14, 0.09, 0.15] }, { 'provinceCode': '440000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [135.44, 130.79, 127.19, 123.8, 120.95, 120.08, 120.15, 123.14, 129.79, 131.91], 'yieldTotal': [62.58, 56.74, 55.33, 55.4, 54.64, 54.54, 55.59, 58.15, 60.8, 63.41] }, { 'provinceCode': '440000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [38.81, 36.35, 34.47, 32.31, 31.16, 31.79, 32.57, 32.61, 32.6, 34.7], 'yieldTotal': [9.88, 9.45, 9.03, 8.63, 8.48, 8.71, 9.04, 9.1, 8.6, 9.3] }, { 'provinceCode': '440000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [50.1, 48.2, 46.5, 44], 'yieldTotal': [24.5, 23.6, 21.9, 21.4] }, { 'provinceCode': '440000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '440000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [313.2, 313.94, 316.58, 314.51, 319.1, 332.48, 340.52, 347.57, 349.68, 346.79], 'yieldTotal': [89.17, 91.77, 94.48, 95.48, 98.42, 104.4, 108.69, 112.05, 115.87, 115.93] }, { 'provinceCode': '440000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [3.67, 3.57, 3.68, 10.01, 8.74, 4.69, 4.39, 4.36, 4.42, 5.08], 'yieldTotal': [0.52, 0.55, 0.66, 2.94, 2.14, 1.12, 0.89, 0.81, 0.76, 0.83] }, { 'provinceCode': '440000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [175.01, 171.46, 165.62, 165.55, 169.16, 172.56, 169.68, 158.92, 150.11, 147.2], 'yieldTotal': [1405.52, 1347.12, 1285.49, 1293.87, 1343.47, 1412.69, 1434.65, 1366.81, 1306.6, 1292.05] }, { 'provinceCode': '450000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [1955.75, 1923.75, 1871.37, 1836.7, 1801.71, 1752.55, 1712.91, 1760.11, 1756.74, 1758.03], 'yieldTotal': [1105, 1107.3, 1073.47, 1066, 1019.78, 1016.24, 991.95, 1013.74, 1017.9, 1028.07] }, { 'provinceCode': '450000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [1.1, 0.82, 2.73, 3.2, 3.08, 3, 3.03, 3.86, 3.81, 4.44], 'yieldTotal': [0.15, 0.11, 0.45, 0.53, 0.51, 0.5, 0.48, 0.63, 0.63, 0.79] }, { 'provinceCode': '450000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [583.48, 579.32, 616.99, 603.25, 591.23, 584.43, 580.14, 596.97, 615.05, 616.33], 'yieldTotal': [263.52, 263.68, 277.45, 275.78, 271.64, 273.4, 261.21, 273.33, 285.15, 280.4] }, { 'provinceCode': '450000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [92.77, 94.67, 90.67, 91.33, 94.25, 97.71, 93.89, 96.42, 101.5, 108.1], 'yieldTotal': [12.91, 12.96, 13.42, 14, 15.32, 16.17, 14.87, 15.44, 15.9, 16.8] }, { 'provinceCode': '450000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [51.2, 52.8, 53.6, 53.6], 'yieldTotal': [12, 12.6, 12.6, 12.6] }, { 'provinceCode': '450000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [2.27, 2.31, 2.29, 1.54, 1.27, 1.21, 1.11, 1.12, 1.08, 1.04], 'yieldTotal': [0.24, 0.25, 0.25, 0.17, 0.15, 0.13, 0.11, 0.11, 0.11, 0.11] }, { 'provinceCode': '450000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [181.42, 188.3, 195.5, 199.81, 206.03, 211.47, 218.51, 223.35, 226.25, 224.66], 'yieldTotal': [50.27, 52.94, 55.23, 58.4, 60.8, 62.67, 67.2, 69.23, 71.12, 71.68] }, { 'provinceCode': '450000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [15.69, 19.7, 19.68, 20.68, 20.77, 24.43, 28.45, 32.5, 35.13, 35.32], 'yieldTotal': [1.59, 2.04, 2.08, 2.16, 2.16, 2.34, 2.8, 3.14, 3.36, 3.58] }, { 'provinceCode': '450000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [1075.01, 1026.7, 918.37, 891.14, 876.12, 886.4, 890.23, 874.83, 857.81, 847.95], 'yieldTotal': [7743.53, 7549.33, 7078.19, 6991.45, 7132.35, 7292.76, 7490.65, 7412.47, 7365.11, 7116.54] }, { 'provinceCode': '500000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [652.37, 650.78, 647.09, 660.91, 658.94, 656.45, 655.14, 657.27, 658.91, 659.19], 'yieldTotal': [477.16, 475.46, 476.56, 487.58, 486.99, 486.92, 487, 489.19, 493.05, 485.24] }, { 'provinceCode': '500000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [64.73, 51.95, 41.11, 34.34, 30.13, 24.79, 21.03, 18.52, 18.68, 18.85], 'yieldTotal': [20.06, 15.96, 13.25, 11.28, 9.78, 8.15, 6.91, 6.09, 6.15, 6.28] }, { 'provinceCode': '500000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [451.66, 450.81, 451.88, 453.87, 447.34, 442.33, 438.33, 440.93, 443.77, 447.78], 'yieldTotal': [249.32, 246.02, 248.86, 252.78, 252.62, 251.33, 249.54, 251.13, 254.56, 256.37] }, { 'provinceCode': '500000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [94.16, 94.96, 94.93, 95.28, 96.68, 97.08, 96.92, 98.12, 99.4, 107.4], 'yieldTotal': [18.03, 18.58, 18.77, 19.09, 19.5, 19.87, 19.97, 20.22, 20.6, 21.6] }, { 'provinceCode': '500000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [329.4, 326.9, 328.4, 347.87], 'yieldTotal': [117.8, 118.3, 119.8, 126.6] }, { 'provinceCode': '500000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '500000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [58.99, 59.25, 59.92, 61.55, 62.12, 62.75, 62.35, 63.06, 63.55, 64.27], 'yieldTotal': [12.14, 12.19, 12.57, 13.03, 13.42, 13.58, 13.68, 14.09, 14.28, 14.42] }, { 'provinceCode': '500000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [219.8, 221.35, 229.33, 236.86, 244.28, 250.15, 254.99, 258.26, 261.5, 269.72], 'yieldTotal': [38.4, 41.84, 44.19, 46.24, 47.43, 48.6, 49.89, 51.37, 52.46, 54.73] }, { 'provinceCode': '500000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [2.78, 2.48, 2.21, 2.17, 2.12, 2.19, 1.87, 1.87, 1.86, 1.86], 'yieldTotal': [10.3, 9.62, 9.05, 8.91, 8.79, 9.09, 8.05, 8.17, 8.28, 8.32] }, { 'provinceCode': '510000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [1905.41, 1892.36, 1878.71, 1874, 1874.93, 1874, 1870, 1866.33, 1875, 1874], 'yieldTotal': [1483.39, 1450.49, 1465.19, 1467.34, 1473.7, 1478.6, 1469.82, 1475.33, 1493.4, 1462.28] }, { 'provinceCode': '510000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [878.68, 814.25, 746.91, 684, 652.67, 635, 611.14, 596.82, 582.92, 588.78], 'yieldTotal': [311.02, 298.01, 284.55, 259.58, 251.6, 247.3, 246.18, 246.74, 245.3, 249.71] }, { 'provinceCode': '510000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [1685.83, 1739.13, 1816.91, 1866, 1863.87, 1856, 1844, 1839.4, 1849.4, 1855], 'yieldTotal': [920.07, 946.75, 992.3, 1058.02, 1068, 1066.3, 1062.14, 1064.99, 1084.7, 1046.22] }, { 'provinceCode': '510000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [295.42, 312.41, 329.32, 350.67, 369.33, 377, 402, 432.67, 443.4, 520], 'yieldTotal': [69.09, 74.48, 76.97, 80.48, 85.87, 88.8, 94.67, 101.25, 104.4, 105.3] }, { 'provinceCode': '510000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [679.4, 683.6, 688.3, 734.13], 'yieldTotal': [284.4, 288.8, 292.4, 309] }, { 'provinceCode': '510000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [6.65, 6.39, 4.93, 4.53, 4.4, 4.03, 2.85, 2.28, 2.11, 0.33], 'yieldTotal': [0.62, 0.6, 0.48, 0.5, 0.43, 0.4, 0.28, 0.22, 0.2, 0.03] }, { 'provinceCode': '510000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [256.4, 256.81, 257.8, 260.21, 261.12, 263.49, 264.73, 283.42, 290.19, 295.36], 'yieldTotal': [62.19, 63.13, 64.09, 64.78, 65.99, 67.67, 68.37, 73.78, 76.25, 78.53] }, { 'provinceCode': '510000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [1119.59, 1144.05, 1159.62, 1166.82, 1206.18, 1218.49, 1222.61, 1292.17, 1354.06, 1386.57], 'yieldTotal': [253.73, 264.83, 271.73, 277, 288.03, 292.2, 296.45, 317.2, 338.66, 354.14] }, { 'provinceCode': '510000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [10.59, 10.2, 9.9, 9.15, 9.05, 9.34, 9.61, 9.66, 9.64, 9.63], 'yieldTotal': [44.69, 43.29, 41.79, 35.56, 34.74, 36.18, 37.18, 37.84, 38.61, 38.44] }, { 'provinceCode': '520000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [712.62, 714.13, 711.07, 714.25, 700.5, 671.78, 664.72, 665.12, 645.23, 613.77], 'yieldTotal': [383.08, 427.55, 442.71, 456.01, 448.83, 420.73, 423.83, 415.98, 417.35, 395] }, { 'provinceCode': '520000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [196.15, 189.07, 180.4, 169.19, 155.97, 141.62, 137.22, 138.05, 135.3, 114.25], 'yieldTotal': [54.62, 65.21, 65.39, 41.82, 41.2, 33.18, 32.98, 33.37, 33.25, 28.86] }, { 'provinceCode': '520000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [988.51, 1034.83, 1037.8, 1041.63, 1006.38, 602.12, 530.59, 501.46, 550.39, 622.2], 'yieldTotal': [316, 332.73, 343.62, 456.4, 441.18, 258.96, 232.3, 220.34, 256.57, 299.79] }, { 'provinceCode': '520000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [170.4, 180.87, 194.85, 209.66, 194.65, 198.9, 191.82, 211.77, 211.7, 231.8], 'yieldTotal': [16.52, 12.49, 13.36, 26.71, 19.27, 19.72, 18.46, 22.35, 23.1, 27.2] }, { 'provinceCode': '520000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [782.2, 826.9, 758.1, 742.89], 'yieldTotal': [254.9, 269.8, 244.2, 244.06] }, { 'provinceCode': '520000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [1.8, 1.82, 1.85, 1.84, 1.4, 0.65, 0.44, 0.37, 0.4, 0.39], 'yieldTotal': [0.14, 0.16, 0.18, 0.2, 0.11, 0.06, 0.04, 0.04, 0.04, 0.04] }, { 'provinceCode': '520000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [50.61, 53.27, 52.41, 51.28, 51.53, 51.93, 50.24, 47.27, 46.47, 39.41], 'yieldTotal': [9.59, 10.58, 10.72, 10.85, 11.27, 11.46, 11.62, 11.74, 11.9, 9.77] }, { 'provinceCode': '520000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [538.79, 539.97, 532.25, 520.01, 516.12, 497.68, 445.69, 430.88, 446.73, 506.46], 'yieldTotal': [86.95, 89.74, 89.73, 88.55, 88.02, 86.22, 77.25, 76.17, 80.87, 94.73] }, { 'provinceCode': '520000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [19.06, 18, 16.4, 12.13, 8.28, 10.58, 10.58, 10.23, 9.06, 7.35], 'yieldTotal': [108.75, 108.79, 95.56, 71.48, 50.31, 62.48, 62.8, 61.26, 53.65, 41.32] }, { 'provinceCode': '530000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [979.69, 942.23, 909.29, 881.4, 870.56, 849.55, 841.5, 818.93, 753.83, 709.46], 'yieldTotal': [567.76, 548.33, 528.62, 524.08, 529.23, 527.7, 534, 524.91, 491.9, 464.67] }, { 'provinceCode': '530000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [391.66, 369.36, 356.62, 344.24, 343.68, 339.2, 328.9, 320, 291.13, 266.76], 'yieldTotal': [72.13, 71.08, 74.67, 71.52, 73.68, 74.28, 71.9, 69.7, 61.92, 59.51] }, { 'provinceCode': '530000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [1703.48, 1745.83, 1762.59, 1784.81, 1763.81, 1785.2, 1782.4, 1802.46, 1879.37, 1917.51], 'yieldTotal': [788.15, 850.54, 868.11, 892.29, 912.93, 926, 920, 938, 992.6, 1026.17] }, { 'provinceCode': '530000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [155.32, 159.36, 161.24, 170.87, 173.05, 176.32, 185.2, 186.6, 149.6, 160.8], 'yieldTotal': [39.58, 43.53, 40.94, 43.06, 43.47, 43.51, 46, 46.4, 31.6, 32.2] }, { 'provinceCode': '530000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [474.4, 484, 529.8, 518.9], 'yieldTotal': [155.7, 171.9, 197.2, 212] }, { 'provinceCode': '530000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [0.19, 0.13, 0.1, 0.08], 'yieldTotal': [0.04, 0.03, 0.03, 0.01] }, { 'provinceCode': '530000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [43.22, 43.89, 38.88, 38, 37.52, 41.03, 42.21, 43.4, 44.04, 43.03], 'yieldTotal': [7.99, 8.15, 6.44, 6.3, 6.24, 6.96, 6.76, 7.61, 8.2, 8.51] }, { 'provinceCode': '530000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [254.47, 255.55, 242.53, 237.33, 232.14, 256.14, 260.87, 257.74, 253.17, 251.76], 'yieldTotal': [43.73, 54.93, 46.51, 47.51, 47.52, 52.52, 54.1, 54.23, 54.49, 53.88] }, { 'provinceCode': '530000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [311.16, 304.57, 275.46, 247.33, 239.9, 260.05, 246.12, 235.66, 227.84, 219.11], 'yieldTotal': [1950.67, 1892.08, 1706.93, 1523.77, 1516.15, 1640.08, 1569.69, 1597.17, 1583.89, 1553.7] }, { 'provinceCode': '540000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [0.95, 0.99, 0.94, 1.14, 0.89, 0.94, 0.77, 0.95, 0.77, 0.83], 'yieldTotal': [0.55, 0.47, 0.45, 0.6, 0.5, 0.53, 0.43, 0.53, 0.45, 0.48] }, { 'provinceCode': '540000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [37.81, 36.92, 36.33, 42.61, 39.35, 31.73, 32.35, 29.86, 32.49, 32.62], 'yieldTotal': [24.07, 23.73, 23.39, 26.88, 21.94, 19.46, 19.19, 17.65, 20.12, 18.85] }, { 'provinceCode': '540000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [4.32, 4.16, 4.53, 4.9, 4.88, 5.16, 4.74, 4.43, 4.77, 4.55], 'yieldTotal': [2.49, 2.39, 0.84, 2.86, 3, 3.36, 2.59, 2.75, 2.96, 2.83] }, { 'provinceCode': '540000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [0.12, 0.11, 0.08, 1.91, 0.04, 0.09, 0.05], 'yieldTotal': [0.04, 0.04, 0.03, 0.76, 2, 0.03, 0.01] }, { 'provinceCode': '540000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [1.3, 1.7, 1.5, 1.3], 'yieldTotal': [0.2, 0.3, 0.4, 0.4] }, { 'provinceCode': '540000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '540000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [0.21, 0.12, 0.12, 0.12, 0.08, 0.11, 0.06, 0.05, 0.06, 0.04], 'yieldTotal': [0.04, 0.03, 0.03, 0.04, 0.02, 0.03, 0.02, 0.02, 0.02, 0.01] }, { 'provinceCode': '540000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [24.33, 24.36, 23.69, 22.48, 19.51, 22.43, 21.45, 20.12, 18.96, 18.64], 'yieldTotal': [6.34, 6.35, 6.38, 6.17, 5.92, 5.82, 5.69, 5.07, 4.56, 4.67] }, { 'provinceCode': '540000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '610000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [114.3, 108.68, 107.45, 107.42, 105.64, 105.39, 105.32, 105.09, 106.05, 106.09], 'yieldTotal': [84.02, 80.02, 80.37, 80.47, 80.57, 80.69, 80.37, 80.52, 72.85, 73.33] }, { 'provinceCode': '610000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [1021.66, 1000.6, 1002.6, 980.78, 963.15, 967.31, 965.93, 964.19, 955.07, 958.01], 'yieldTotal': [363.76, 385.54, 423.07, 403.18, 406.41, 401.34, 382.04, 413.25, 424.6, 429.78] }, { 'provinceCode': '610000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [1225.98, 1212.84, 1203.89, 1341.75, 1196.88, 1179.47, 1177.05, 1179.44, 1182.48, 1188.43], 'yieldTotal': [616.79, 567.21, 567.7, 636.21, 551.15, 584.15, 609.58, 620.16, 601.69, 616.81] }, { 'provinceCode': '610000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [189.52, 143.47, 142.87, 151.18, 151.9, 151.61, 151.11, 151.34, 151.4, 174.3], 'yieldTotal': [30.88, 23.11, 15.79, 24.31, 23.91, 23.92, 23.39, 23.64, 25.1, 30.5] }, { 'provinceCode': '610000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [308.1, 308.8, 298, 282.8], 'yieldTotal': [82.9, 83.9, 90.1, 88.7] }, { 'provinceCode': '610000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [22.55, 17.79, 14.66, 12.04, 8.47, 6.92, 5.46, 0.72, 0.3, 0.14], 'yieldTotal': [3.55, 2.43, 2.07, 1.69, 1.16, 0.99, 0.76, 0.07, 0.03, 0.02] }, { 'provinceCode': '610000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [36.17, 38.86, 37.95, 39.02, 39.45, 39.86, 39.64, 37.99, 37.95, 38.21], 'yieldTotal': [10.63, 11.6, 11.33, 12.29, 12.46, 12.6, 12.3, 12.39, 11.29, 11.69] }, { 'provinceCode': '610000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [188.8, 184.19, 184.48, 179.81, 179.55, 175.89, 175.5, 175.72, 178.43, 167.08], 'yieldTotal': [36.53, 37.57, 39.02, 37.49, 38.24, 36.91, 37.26, 37.51, 38.97, 35.92] }, { 'provinceCode': '610000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [0.05, 0.04, 0.04, 1.59, 1.38, 0.04, 0.04, 0.17, 0.06, 0.06], 'yieldTotal': [0.16, 0.14, 0.14, 2.54, 2.68, 0.1, 0.1, 0.72, 0.23, 0.22] }, { 'provinceCode': '620000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [4.89, 4.72, 4.07, 4.19, 4.04, 3.82, 3.59, 3.39, 3.13, 2.49], 'yieldTotal': [3.53, 3.55, 2.84, 2.81, 2.92, 2.47, 2.13, 1.69, 1.81, 1.5] }, { 'provinceCode': '620000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [820.87, 802.76, 806.39, 774.69, 766.47, 775.56, 739.94, 708.72, 711.27, 739.49], 'yieldTotal': [239.57, 278.12, 285.1, 272.11, 269.72, 280.51, 281.1, 268.88, 279.75, 296.87] }, { 'provinceCode': '620000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [1013.99, 1045.4, 1065, 1056.73, 1040.97, 1012.74, 987.92, 1000.81, 1051.82, 1074.47], 'yieldTotal': [585.67, 589.57, 598.09, 591.88, 576.67, 589.99, 594.14, 616.83, 642.96, 664.22] }, { 'provinceCode': '620000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [71.76, 67.64, 61.04, 64.07, 64.42, 44.99, 41.4, 46.95, 47.5, 58.8], 'yieldTotal': [14.82, 12.97, 12.58, 9.76, 9.35, 7.23, 6.83, 8.16, 7.8, 11.1] }, { 'provinceCode': '620000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [558.7, 574.7, 586.1, 576], 'yieldTotal': [206.9, 222.8, 224.6, 222.6] }, { 'provinceCode': '620000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [44.86, 42.55, 29.11, 15.22, 19.4, 21.53, 19.33, 16.59, 16.23, 20.31, 20.4], 'yieldTotal': [7.77, 7.2, 4.82, 2.29, 3.16, 3.53, 3.27, 3.01, 3.06, 3.99, 4.2] }, { 'provinceCode': '620000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [0.67, 0.7, 0.68, 0.62, 0.59, 0.55, 0.54, 0.44, 0.37, 0.31], 'yieldTotal': [0.27, 0.25, 0.25, 0.22, 0.21, 0.22, 0.21, 0.19, 0.16, 0.14] }, { 'provinceCode': '620000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [193.27, 194.21, 190.56, 194.85, 198.53, 174.91, 164.18, 148.84, 144, 152.77], 'yieldTotal': [37.69, 39.98, 40.05, 41.1, 43.78, 35.53, 35.61, 33.93, 33.73, 36.53] }, { 'provinceCode': '620000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '630000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '630000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [84.69, 80.23, 82.8, 84.69, 82.58, 111.6, 102.41, 94.79, 98.82, 101.26, 101.04], 'yieldTotal': [36.3, 34.65, 35.05, 35.04, 33.06, 42.64, 40.29, 37.57, 38.73, 36.91, 39.66] }, { 'provinceCode': '630000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [19.11, 21.54, 21.33, 20.07, 18.9, 18.45, 20.97, 21.37, 22.54, 22.67, 22.77], 'yieldTotal': [13.48, 14.88, 14.45, 13.63, 12.24, 11.53, 14.18, 14.79, 15.26, 14.83, 15.24] }, { 'provinceCode': '630000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '630000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [77.1, 73.5, 70.5, 67.9], 'yieldTotal': [33, 31.8, 30.18, 27.6] }, { 'provinceCode': '630000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '630000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '630000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [159.98, 154.09, 148.54, 147.07, 153.64, 145.76, 140.43, 142.46, 142.43, 145.6], 'yieldTotal': [33.06, 32.25, 31.37, 31.06, 29.02, 28.13, 28.66, 30.06, 31.73, 30.76] }, { 'provinceCode': '630000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '640000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [60.81, 50.84, 29.37], 'yieldTotal': [49.39, 41, 23.66] }, { 'provinceCode': '640000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [92.93, 67.04, 81.36], 'yieldTotal': [27.79, 18.95, 27.27] }, { 'provinceCode': '640000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [322.73, 367.42, 365.59], 'yieldTotal': [249.07, 263.39, 276.63] }, { 'provinceCode': '640000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [11.72, 11.36, 11.25, 8.5, 8.04, 6.9, 4.89, 3.45, 2.4, 24], 'yieldTotal': [0.82, 0.77, 0.68, 1.11, 0.73, 0.88, 0.62, 0.39, 0.2, 3.4] }, { 'provinceCode': '640000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [92.7, 95.1, 100, 80.67], 'yieldTotal': [39.4, 41.5, 36.19, 32.59] }, { 'provinceCode': '640000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '640000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [0.04, 0.09, 0.05, 0.08, 0.03, 0.02, 0.04], 'yieldTotal': [0.01, 0.03, 0.02, 0.03, 0.01, 0.01, 0.01] }, { 'provinceCode': '640000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [0.45, 0.5, 0.42, 1.68, 1.94, 2.57, 3.25, 4.47, 4.17, 4.75], 'yieldTotal': [0.11, 0.13, 0.1, 0.38, 0.42, 0.63, 0.76, 0.94, 0.54, 0.44] }, { 'provinceCode': '640000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }, { 'provinceCode': '650000', 'varietyCode': 'AA01005', 'varietyName': '水稻', 'areaSeed': [88.42, 82.58, 74.84, 83.1, 74.24, 78.39, 56.92, 47.63, 44.32, 36.71], 'yieldTotal': [67.68, 73.7, 67.38, 71.68, 65.47, 72.65, 51.62, 41.87, 41.69, 34.6] }, { 'provinceCode': '650000', 'varietyCode': 'AA01001', 'varietyName': '小麦', 'areaSeed': [1075.09, 1110.81, 1158.05, 1215.87, 1126.83, 1031.47, 1061.59, 1069.02, 1135.25, 1153.6], 'yieldTotal': [630.94, 630.95, 691.52, 681.84, 612.58, 571.89, 576.03, 582.09, 639.75, 653.49] }, { 'provinceCode': '650000', 'varietyCode': 'AA01009', 'varietyName': '玉米', 'areaSeed': [987.86, 1006.04, 1067.73, 1026.4, 1019.93, 1033.29, 997.2, 1051.05, 1110.26, 1145.56], 'yieldTotal': [984.96, 1001.25, 1090.23, 765.64, 772.62, 827.57, 858.37, 928.43, 1012.65, 1080.51] }, { 'provinceCode': '650000', 'varietyCode': 'AA02001', 'varietyName': '大豆', 'areaSeed': [36.5, 32.46, 29.73, 29.24, 29.46, 35.41, 38.96, 16.35, 19, 40.1], 'yieldTotal': [8.37, 7.44, 6.97, 7.6, 10.18, 7.64, 10.69, 5.22, 5.6, 12.1] }, { 'provinceCode': '650000', 'varietyCode': 'AE02003', 'varietyName': '马铃薯', 'areaSeed': [17.2, 19.6, 19.5, 19], 'yieldTotal': [13.3, 15.1, 18.5, 16.5] }, { 'provinceCode': '650000', 'varietyCode': 'AC01001', 'varietyName': '棉花', 'areaSeed': [1884.42, 2170.62, 2144.26, 2059.6, 2217.47, 2491.3, 2540.5, 2501.92, 2506.07, 2496.89, 2369.3], 'yieldTotal': [393.56, 414.87, 419.1, 407.8, 456.66, 511.09, 500.2, 516.08, 512.85, 539.37, 511.2] }, { 'provinceCode': '650000', 'varietyCode': 'AB01001', 'varietyName': '花生', 'areaSeed': [4.67, 3.42, 2.9, 4.79, 3.64, 6.14, 2.54, 1.82, 2.36, 13.13], 'yieldTotal': [2.65, 1.56, 1.72, 2.66, 1.87, 2.73, 1.03, 0.9, 1.16, 6.61] }, { 'provinceCode': '650000', 'varietyCode': 'AB01002', 'varietyName': '油菜', 'areaSeed': [43.71, 48.52, 43.68, 36.15, 51.29, 63.45, 52.43, 33.73, 29.85, 29.46], 'yieldTotal': [11.29, 10.31, 10.79, 10, 15.04, 17.72, 14.31, 8.6, 8.13, 8.48] }, { 'provinceCode': '650000', 'varietyCode': 'AD01001', 'varietyName': '甘蔗', 'areaSeed': [], 'yieldTotal': [] }]

</script>
