import React, { useState } from "react";
import { ButtonProps } from "@/utils/data_interface";
import { FaPlus } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { RiCalendar2Line } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { RiSave3Line } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white hover:bg-white/90 text-primary_dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {text}
    </button>
  );
};



// Icon component with tooltip
const IconWithTooltip = ({
  Icon,
  onClick,
  tooltip,
  size,
}: {
  Icon: React.ElementType;
  onClick: () => void;
  tooltip: string;
  size: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="text-white cursor-pointer" size={size} onClick={onClick} />
      {isHovered && (
        <div className="absolute top-full mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          {tooltip}
        </div>
      )}
    </div>
  );
};

// Define the JSX constants with tooltips as a prop
const PlusIcon = ({ onClick, tooltip }: { onClick: () => void; tooltip: string }) => (
  <IconWithTooltip Icon={FaPlus} onClick={onClick} tooltip={tooltip} size={24} />
);

const UserAddIcon = ({ onClick, tooltip }: { onClick: () => void; tooltip: string }) => (
  <IconWithTooltip Icon={TiUserAdd} onClick={onClick} tooltip={tooltip} size={28} />
);

const CalendarIcon = ({ onClick, tooltip }: { onClick: () => void; tooltip: string }) => (
  <IconWithTooltip Icon={RiCalendar2Line} onClick={onClick} tooltip={tooltip} size={28} />
);

const StartIcon = ({ onClick, tooltip }: { onClick: () => void; tooltip: string }) => (
  <IconWithTooltip Icon={VscDebugStart} onClick={onClick} tooltip={tooltip} size={28} />
);
const SaveIcon = ({ onClick, tooltip }: { onClick: () => void; tooltip: string }) => (
  <IconWithTooltip Icon={RiSave3Line} onClick={onClick} tooltip={tooltip} size={28} />
);

const GenerateIcon = ({ onClick, tooltip }: { onClick: () => void; tooltip: string }) => (
  <IconWithTooltip Icon={AiOutlineProduct} onClick={onClick} tooltip={tooltip} size={28} />
);



export { PlusIcon, UserAddIcon, CalendarIcon, StartIcon, SaveIcon, GenerateIcon };
