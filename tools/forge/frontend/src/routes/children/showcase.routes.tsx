import { HomeShowcasePage } from "@/pages";
import {
  BadgeDemo,
  ButtonDemo,
  CheckboxDemo,
  IconToggleDemo,
  InputDemo,
  LinkDemo,
  RadioDemo,
  SelectDemo,
  TableDemo,
  TextDemo,
  type AppRoute,
} from "@workspace/ui";

export const showcaseRoutes: AppRoute[] = [
  { index: true, to: "", element: <HomeShowcasePage /> },
  { to: "badge", label: "<Badge>", element: <BadgeDemo /> },
  { to: "button", label: "<Button>", element: <ButtonDemo /> },
  { to: "checkbox", label: "<Checkbox>", element: <CheckboxDemo /> },
  { to: "inconToggle", label: "<IconToggle", element: <IconToggleDemo /> },
  { to: "input", label: "<Input>", element: <InputDemo /> },
  { to: "link", label: "<Link>", element: <LinkDemo /> },
  { to: "radio", label: "<Radio", element: <RadioDemo/>},
  { to: "select", label: "<Select>", element: <SelectDemo /> },
  { to: "table", label: "<Table>", element: <TableDemo /> },
  { to: "text", label: "<Text>", element: <TextDemo /> },
];
