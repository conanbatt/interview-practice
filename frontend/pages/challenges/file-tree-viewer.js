import { useState } from "react";
import styles from "./file-tree-viewer.module.css";

const directory = {
  name: "root",
  children: [
    {
      name: "Downloads",
      children: [
        {
          name: "image.png",
          icon: "https://upload.wikimedia.org/wikipedia/en/d/d6/Preview_icon.png",
        },
        {
          name: "unzipped",
          children: [
            {
              name: "README.md",
              icon: "https://lh6.googleusercontent.com/proxy/xZ7ztaLnPxv3PvDOsAHg_z8aOBAzm2GVGPtC6xGWkJlYmmP7wY42g3ERFveJ5y3-u4AdVa7g5zpHRbmxmGIlLU48Yv3j3OAxd90eE314doQN3weRKPIE8oOmtiPNm0ezzIbfweazpPTAA13sfgkciyxjONKfsWCi",
            },
          ],
        },
      ],
    },
    {
      name: "Documents",
      children: [
        {
          name: "code",
          children: [
            {
              name: "silver",
              children: [
                {
                  name: "coding-challenge",
                  children: [
                    {
                      name: "challenge1.ts",
                      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcmf8TZwmWDaQmgc7JW_XK_twnKEv95aHPsFmLCW8r9Q&s",
                    },
                    {
                      name: "challenge2.ts",
                      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcmf8TZwmWDaQmgc7JW_XK_twnKEv95aHPsFmLCW8r9Q&s",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function isDirectory(x) {
  return Array.isArray(x.children);
}

function FileInfo({ file }) {
  return (
    <div className={styles.FileInfo}>
      <img src={file.icon} width={40} height={40} />
      {file.name}
    </div>
  );
}

function Folder({ item }) {
  const [open, setOpen] = useState(false);

  if (!isDirectory(item)) return <FileInfo file={item} />;

  return (
    <div className={styles.Folder}>
      <div className={styles.info} onClick={() => setOpen((o) => !o)}>
        {open ? "⌄" : "›"}
        <img
          src="https://cdn.icon-icons.com/icons2/2963/PNG/512/macos_big_sur_folder_icon_186046.png"
          width={40}
          height={40}
        />
        {item.name}
      </div>
      {open && (
        <div className={styles.content}>
          {item.children.map((child) => (
            <Folder item={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <Folder item={directory} />;
}
