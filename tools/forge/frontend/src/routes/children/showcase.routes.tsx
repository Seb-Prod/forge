import { HomeShowcasePage } from "@/pages";
import {
  BadgeDemo,
  ButtonDoc,
  CheckboxDemo,
  IconToggleDemo,
  InputDemo,
  LinkDemo,
  SelectDemo,
  TableDemo,
  TextDemo,
  type AppRoute,
} from "@workspace/ui";

export const showcaseRoutes: AppRoute[] = [
  { index: true, to: "", element: <HomeShowcasePage /> },
  { to: "badge", label: "<Badge>", element: <BadgeDemo /> },
  { to: "button", label: "<Button>", element: <ButtonDoc /> },
  { to: "checkbox", label: "<Checkbox>", element: <CheckboxDemo /> },
  { to: "inconToggle", label: "<IconToggle", element: <IconToggleDemo /> },
  { to: "input", label: "<Input>", element: <InputDemo /> },
  { to: "link", label: "<Link>", element: <LinkDemo /> },
  { to: "select", label: "<Select>", element: <SelectDemo /> },
  { to: "table", label: "<Table>", element: <TableDemo /> },
  { to: "text", label: "<Text>", element: <TextDemo /> },
];
