import {
  COMMIT_TYPE_LIST,
  COMMIT_TYPES,
  SCOPE_LIST,
  SCOPES,
  type CommitType,
  type Scope,
} from "@/features/GitManager/constants/commits";

const typePattern = COMMIT_TYPE_LIST.join("|");

const regex = new RegExp(`^(${typePattern})(?:\\(([^)]+)\\))?:\\s(.+)$`, "i");

export type ParsedCommit = {
  type: CommitType;
  scope?: Scope;
  message: string;

  typeLabel: string;
  typeDescription: string;

  scopeLabel?: string;
  scopeDescription?: string;
};

export const parseCommitMessage = (message: string): ParsedCommit => {
  const match = message.match(regex);

  if (!match) {
    const fallback = COMMIT_TYPES["chore"];

    return {
      type: "chore",
      message,

      typeLabel: fallback.label,
      typeDescription: fallback.description,
    };
  }

  const [, type, scope, msg] = match;

  const typedType = type as CommitType;
  const validScope =
    scope && SCOPE_LIST.includes(scope as Scope) ? (scope as Scope) : undefined;

  const typeConfig = COMMIT_TYPES[typedType];
  const scopeConfig = validScope ? SCOPES[validScope] : undefined;

  return {
    type: typedType,
    scope: validScope,
    message: msg,

    typeLabel: typeConfig.label,
    typeDescription: typeConfig.description,

    scopeLabel: scopeConfig?.label,
    scopeDescription: scopeConfig?.description,
  };
};
