// ==UserScript==
// @name         Watch On YT
// @version      0.1
// @description  YT >> ecas
// @author       Blitz
// @match        https://server1.onlineecas.com/CBT2037/eLearnVideos.aspx?RESTYPE=VIDEOS
// @icon         https://www.google.com/s2/favicons?sz=64&domain=onlineecas.com
// @grant        none
// ==/UserScript==

window.XMLHttpRequest = new Proxy(XMLHttpRequest, {
    construct(target, _) {
        let xhr = window.xhrHook = new target(),
            _open = xhr.open,
            _send = xhr.send;
        xhr.open = function (method, url, async) {
             if (url.includes('https://noembed.com/embed?url=https://www.youtube.com/watch?v=')) {
                 const YTurl = url.replace('https://noembed.com/embed?url=', '')
                 const btnContainer = document.querySelector("#pnl > div.maindiv > table:nth-child(1) > tbody > tr > td:nth-child(2)")
                 const YTBtn = document.createElement('a')
                 YTBtn.href = YTurl
                 YTBtn.innerHTML = '<abbr title="Watch on Youtube"><img src="https://cdn.cdnlogo.com/logos/y/57/youtube-icon.svg" style="height: 32px; cursor: pointer"></abbr>'
                 YTBtn.setAttribute('target', '_blank')
                 btnContainer.appendChild(YTBtn)

                 // Elongating the button container so that text doesnt wrap
                 btnContainer.setAttribute('width', '300')

            }

            _open.apply(this, arguments);
        }


        xhr.send = function (...args) {
            _send.apply(this, arguments);
        }

        return xhr;
    }
})
