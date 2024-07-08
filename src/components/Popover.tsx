import { ReactNode, useEffect, useRef, useState } from "react";

interface PopoverI {
  children: ReactNode;
  content?: ReactNode;
  trigger: string;
}

function Popover({ children, content, trigger = "click" }: PopoverI) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        wrapperRef.current &&
        target instanceof Node &&
        !wrapperRef.current.contains(target)
      ) {
        setShow(false);
      }
    };

    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className="min-w-fit w-[200px] h-fit absolute bottom-[100%] z-50 transition-all"
      >
        <div className="mb-[5px]">{content}</div>
      </div>
    </div>
  );
}

export default Popover;
