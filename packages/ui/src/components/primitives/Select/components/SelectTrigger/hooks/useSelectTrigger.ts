import { useSelectContext } from "../../../Select.context";

export function useSelectTrigger() {
  const { setOpen } = useSelectContext();

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const openSelect = () => {
    setOpen(true);
  };

  const closeSelect = () => {
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        openSelect();
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        toggleOpen();
        break;

      case "Escape":
        closeSelect();
        break;
    }
  };

  return { handleKeyDown, toggleOpen };
}
