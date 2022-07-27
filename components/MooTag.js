import mooFren from "../public/img/roles/moofren.png";
import mooProtector from "../public/img/roles/mooprotector.png";
import mooSanctuary from "../public/img/roles/moosanctuary.png";
import mooKingdom from "../public/img/roles/mookingdom.png";
import Image from "next/image";

const MooTag = ({ mooQuantity }) => {
  const roleFilter = () => {
    if (mooQuantity === 1 && mooQuantity <= 2) {
      return "mooFren";
    }
    if (mooQuantity === 3 && mooQuantity <= 4) {
      return "mooProtector";
    }
    if (mooQuantity === 5 && mooQuantity <= 6) {
      return "mooSanctuary";
    }
    if (mooQuantity >= 7) {
      return "mooKingdom";
    }
  };

  const role = roleFilter();

  const mooRoles = {
    mooFren: {
      image: mooFren,
      name: "Moo Fren",
    },
    mooProtector: {
      image: mooProtector,
      name: "Moo Protector",
    },
    mooSanctuary: {
      image: mooSanctuary,
      name: "Moo Sanctuary",
    },
    mooKingdom: {
      image: mooKingdom,
      name: "Moo Kingdom",
    },
  };

  if (mooQuantity > 0) {
    return (
      <div className="flex">
        <div className="border-solid border-[1px] border-white flex items-center justify-center p-[5px] rounded-[50px]">
          <div className="flex items-center justify-center border-solid border-[1px] w-[40px] h-[40px] border-white rounded-full p-1 bg-white">
            <Image
              src={mooRoles[role].image}
              alt={mooRoles[role].name}
              width={24}
              height={24}
            />
          </div>
          <span className="ml-[10px] text-white text-[18px]">
            {mooRoles[role].name}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default MooTag;
