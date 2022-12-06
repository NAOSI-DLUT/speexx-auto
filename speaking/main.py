from xvfbwrapper import Xvfb
from seleniumwire import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.remote.webelement import WebElement
import time
import sys
import os
import re

# username
username = sys.argv[1]
# password
passwd = sys.argv[2]
# delay constant (seconds)
alpha = 4
# use screen
screenon = True


def get_by_css(driver: WebElement, cssstr: str, multi=False) -> WebElement | list[WebElement] | None:
    for _ in range(30):
        try:
            if multi:
                element = driver.find_elements("css selector", cssstr)
            else:
                element = driver.find_element("css selector", cssstr)
        except:
            time.sleep(0.3)
            continue
        else:
            return element
    return None


if __name__ == "__main__":
    # start system
    os.system('sh clean-mic.sh')
    os.system('sh create-mic.sh')
    if not screenon:
        vdis = Xvfb()
        vdis.start()
    options = Options()
    options.set_preference("permissions.default.microphone", 1)
    options.set_preference("media.volume_scale", "0.0")
    driver = webdriver.Firefox(options=options)

    # login speexx
    driver.get('https://portal.speexx.cn/login')
    get_by_css(driver, '#userName').click()
    get_by_css(driver, '#userName').send_keys(username)
    get_by_css(driver, "#button-next").click()
    get_by_css(driver, '#password').send_keys(passwd)
    get_by_css(driver, "#button-sign-in").click()
    time.sleep(alpha/2)

    # enter speach training
    driver.get('https://portal.speexx.cn/articles/list')
    get_by_css(driver, 'div.row:nth-child(1)').click()
    get_by_css(driver, '.box-pronunciation-course').click()
    get_by_css(driver, '.close').click()

    # start work
    try:
        while 1:
            # get audio
            get_by_css(driver, '.play-button').click()
            time.sleep(alpha * 2)
            request = [x for x in driver.requests if re.match(
                r'https://portal.speexx.cn/static/media/track/track-.*\.mp3', x.url)][-1]
            with open('./audio.mp3', 'wb') as f:
                f.write(request.response.body)

            # perform speaking
            time.sleep(alpha/4)
            get_by_css(driver, 'button.btn:nth-child(3)').click()
            os.system(
                "ffmpeg -re -i ./audio.mp3 -filter:a \"atempo=0.7\" -f s16le -ar 16000 -ac 1 - > /tmp/virtmic")
            time.sleep(alpha * 2)

            # go next
            get_by_css(driver, '.next').click()
            with open('./log.txt', 'a') as f:
                f.write('done: {}\n'.format(driver.current_url))
    except Exception as e:
        print(e)

    # stop system
    driver.quit()
    os.system('sh clean-mic.sh')
    if not screenon:
        vdis.stop()
