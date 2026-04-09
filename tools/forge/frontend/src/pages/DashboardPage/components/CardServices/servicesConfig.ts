import reactImg from "@/assets/logos/react.png";
import viteImg from "@/assets/logos/vite.svg";
import routerImg from "@/assets/logos/react_router.svg";
import tsImg from "@/assets/logos/typeScript.png";
import nodeImg from "@/assets/logos/node.js.svg";
import expressImg from "@/assets/logos/Expressjs.png";
import mysqlImg from "@/assets/logos/mysql.png";
import sequelizeImg from "@/assets/logos/sequelize.png";
import dockerImg from "@/assets/logos/docker.png";

export type ServiceName = "Frontend App" | "Backend API" | "MySQL";

export type ServiceConfig = {
  image: string;
  stack: { name: string; image: string }[];
};

export const servicesConfig: Record<ServiceName, ServiceConfig> = {
  "Frontend App": {
    image: reactImg,
    stack: [
      { name: "Vite", image: viteImg },
      { name: "React Router", image: routerImg },
      { name: "TypeScript", image: tsImg },
    ],
  },
  "Backend API": {
    image: nodeImg,
    stack: [
      { name: "Express", image: expressImg },
      { name: "Sequelize", image: sequelizeImg },
      { name: "TypeScript", image: tsImg },
    ],
  },
  "MySQL": {
    image: mysqlImg,
    stack: [
      { name: "Docker", image: dockerImg },
    ],
  },
};