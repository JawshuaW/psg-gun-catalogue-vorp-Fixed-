# 🛠️ psg-gun-catalogue-vorp-Fixed

A custom weapon catalogue UI for **VORP Core** (RedM).  
This script allows players to browse, preview, and purchase weapons using an immersive, interactive gun catalogue interface.

---

## 🎬 Video Preview

[![Watch the Showcase](https://img.youtube.com/vi/Lac_VgkMXSk/0.jpg)](https://youtu.be/Lac_VgkMXSk?si=SbsdxmYHkLg0F4YO&t=20)

Click the image above or [watch on YouTube](https://youtu.be/Lac_VgkMXSk?si=SbsdxmYHkLg0F4YO&t=20)  
(starting at 00:20)

---

## 📝 Special Note

This is a **fixed and enhanced version** of the PSG Gun Catalogue originally forked from:

- 🔗 [robwhitewick/gun_catalogue](https://github.com/robwhitewick/gun_catalogue) – original creator: **robwhitewick**
- 🔗 [Press-Start-Gaming/psg-gun-catalogue-vorp](https://github.com/Press-Start-Gaming/psg-gun-catalogue-vorp) – VORP version by: **EdWordy**

I did **not** create the core functionality. This version focuses on:

- Fixing broken UI and NUI event behavior
- Cleaning and reorganizing code
- Enhancing compatibility with modern VORP builds
- Improving user experience and visual layout

> 💡 **All credit for the original script goes to robwhitewick and EdWordy.**  
> This fork simply aims to deliver a more stable and polished version for server owners.

📦 **Free to use, improve, and share.**

---

## 📸 Screenshot Previews

| Catalogue UI | Buy Menu | Weapon Preview | Category List |
|--------------|----------|----------------|----------------|
| ![Preview 1](https://files.catbox.moe/92qh04.png) | ![Preview 2](https://files.catbox.moe/hwkg84.png) | ![Preview 3](https://files.catbox.moe/n8mm6a.png) | ![Preview 4](https://files.catbox.moe/4091j2.png) |

---

## 📦 Installation

1. Download or clone the repository into your server’s `resources` folder.
2. Rename the folder to psg-gun-catalogue-vorp
3. Add the following line to your `server.cfg` or `resources.cfg`:

    ```cfg
    ensure psg-gun-catalogue-vorp
    ```

4. Make sure you have **VORP Core** properly installed and configured.

---

## 🔧 Features

- 📖 Interactive in-game gun catalogue
- 💸 Purchase weapons directly through the UI
- 🎨 Clean and improved HTML/CSS layout
- 🧼 Reorganized Lua code for readability and performance
- 🔊 Support for custom sounds and categories
- 🗂️ Editable icons and category names
- 🧠 Improved NUI prompt handling and closing logic

---

## ✅ Fixes & Improvements

- Fixed issue with prompts not closing or stacking
- Removed unsafe net events and added proper checks
- Smoothed NUI interaction and focus handling
- Better overall compatibility with newer VORP Core versions
- Codebase cleanup for easier modification

---

## 🗒️ Notes

- UI elements (icons, logos, category titles) are customizable in `/html`
- Sounds and visual assets can be replaced with your own for personalization
- Always test purchases based on your inventory/economy system

---

## 🤝 Credits

- 👨‍💻 Original creator: [robwhitewick](https://github.com/robwhitewick)
- 🛠️ VORP adaptation: [EdWordy / Press Start Gaming](https://github.com/Press-Start-Gaming/psg-gun-catalogue-vorp)
- 🔧 Fixes and cleanup: **This repository**

---

## 📬 Contribute

Feel free to fork, contribute, or submit pull requests.  
Let’s keep making RedM development better together.

---

## 🪪 License

This script is provided freely for the community.  
Proper credit is appreciated but not required.
