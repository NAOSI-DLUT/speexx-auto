# 使用方法

本项目在 Linux 下使用, 系统依赖包括:

- python3
- firefox
- geckodriver
- pulseaudio
- ffmpeg
- xvfb (可选)

安装依赖包:
```bash
pip install -r requirements.txt
```

在**本路径**下运行:
```bash
python main.py <username> <password>
```
其中 `<username>` 和 `<password>` 分别为你的账号和密码.

运行进度会输出在 `log.txt` 中.

若运行结束后有虚拟麦克风残留, 运行 `./clean-mic.sh` 清理.

# 说明

本项目使用 selenium 模拟浏览器操作, 通过 firefox 的 geckodriver 来驱动浏览器, 使用 pulseaudio 创建虚拟麦克风, 通过 ffmpeg 将音频输出到虚拟麦克风.

`main.py` 可更改配置, 如不希望显示浏览器界面, 可将 `screenon` 设置为 `False` (需安装 xvfb).
