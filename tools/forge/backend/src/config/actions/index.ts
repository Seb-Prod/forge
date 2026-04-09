import { DEV_ACTIONS } from "./dev.actions";
import { TOOLS_ACTIONS } from "./tools.actions";
import { GENERATOR_ACTIONS } from "./generator.actions";
import { Action } from "../../types/action.types";
import { GENERATOR_GIT } from "./git.actions";

export const AVAILABLE_ACTIONS: Action[] = [
  ...DEV_ACTIONS,
  ...TOOLS_ACTIONS,
  ...GENERATOR_ACTIONS,
  ...GENERATOR_GIT,
];