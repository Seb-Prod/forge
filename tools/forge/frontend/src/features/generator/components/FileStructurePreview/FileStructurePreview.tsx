import { FaFolderOpen } from "react-icons/fa";
import { PiFileTs, PiFileTsx, PiFileCss, PiFileMd, PiFile } from "react-icons/pi";
import styles from "./FileStructurePreview.module.css";

type FileType = "ts" | "tsx" | "css" | "md" | "custom";

export interface FileItem {
  name: string;
  type?: FileType;
}

interface FileStructurePreviewProps {
  folderName?: string; // optionnel
  files: FileItem[];
}

const getIcon = (type?: FileType) => {
  const iconProps = { className: styles.iconFile };
  switch (type) {
    case "tsx":
      return <PiFileTsx {...iconProps} />;
    case "ts":
      return <PiFileTs {...iconProps} />;
    case "css":
      return <PiFileCss {...iconProps} />;
    case "md":
      return <PiFileMd {...iconProps} />;
    default:
      return <PiFile {...iconProps} />;
  }
};

export const FileStructurePreview = ({ folderName, files }: FileStructurePreviewProps) => {
  return (
    <div className={styles.tree}>
      {folderName && (
        <div className={styles.folder}>
          <FaFolderOpen className={styles.iconFolder} />
          <span className={styles.folderName}>{folderName}</span>
        </div>
      )}

      <div className={folderName ? styles.fileContainer : ""}>
        {files.map((file) => (
          <div key={file.name} className={styles.file}>
            <span className={styles.line} />
            {getIcon(file.type)}
            <span className={styles.fileName}>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};