import { PageLayout } from "@workspace/ui";
import { Outlet } from "react-router-dom";

export const ShowcasePage = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
